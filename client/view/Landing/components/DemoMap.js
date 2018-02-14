import React, { Component } from 'react';

import PropertyDetails from '../../Map/components/PropertyDetails';

class DemoMap extends Component {
  state = { searchTerm: '', searchResults: [] };

  componentDidMount() {
    const { lat, lng } = this.props.initialPosition;
    lat && lng && this.renderInitialMap(lat, lng);
  }

  componentDidUpdate(prevProps, prevState) {
    // // listening to see if new search for city is set
    // if (
    //   prevProps.initialPosition.lat !== this.props.initialPosition.lat ||
    //   prevProps.initialPosition.lng !== this.props.initialPosition.lng
    // ) {
    //   const { lat, lng } = this.props.initialPosition;
    //   this.clearSearchResults();
    //   this.renderMap(lat, lng);
    // }

    if (
      prevProps.data.loading &&
      !this.props.data.loading &&
      this.props.data.properties.length
    ) {
      const { properties } = this.props.data;

      this.renderPropertiesMap(properties);
    } else {
      console.log('No properties to render maintain the initial map');
    }
  }

  clearSearchResults = () => {
    this.setState({ searchResults: [] });
  };

  // send query and renders map for query results (up to 20)
  sendQuery = term => {
    let searchTerm = term;

    if (!searchTerm.length) {
      return;
    }

    const { lat, lng } = this.props.initialPosition;

    let location = new google.maps.LatLng(lat, lng);

    let map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 15
    });

    let request = {
      location: location,
      rankBy: 'DISTANCE',
      query: searchTerm
    };

    let service = new google.maps.places.PlacesService(map);

    let bounds = map.getBounds();

    let nearbyResults = [];

    service.textSearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];

          nearbyResults.push(place);
          let lat = place.geometry.location.lat();
          let lng = place.geometry.location.lng();

          let marker = new google.maps.Marker({
            position: { lat, lng },
            map: map
          });

          this.addInfoWindow(place, map, marker, 'click');

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        }
      }

      map.fitBounds(bounds);

      this.setState({ searchResults: nearbyResults.slice() });
    });
  };

  // //add little info window above map marker
  // addInfoWindow = (place, map, marker, event) => {
  //   let photoUrl = place.photos
  //     ? place.photos[0].getUrl({ maxHeight: 150, maxWidth: 150 })
  //     : null;
  //   let photoTag = photoUrl
  //     ? `<img class="place-photo" src=${photoUrl} />`
  //     : `<img class="place-holder" />`;
  //
  //   let ratingTag = place.rating
  //     ? `<div class="rating"><span><i class="fa fa-star"></i></span>${
  //         place.rating
  //       }</div>`
  //     : '';
  //
  //   let hourTag =
  //     place.opening_hours && place.opening_hours.open_now
  //       ? `<span class="open-now">Open Now</span>`
  //       : `<span>Closed</span>`;
  //   let contentString = `
  //       <div class="card-grid">
  //         <div>${photoTag}</div>
  //
  //         <div>
  //           <div class="card-grid">
  //             <div class="place-name">${place.name}</div>
  //           </div>
  //
  //           <div class="card-grid">
  //             <div>${ratingTag}</div>
  //
  //             <div>${hourTag}</div>
  //           </div>
  //
  //           <div class="card-grid">
  //             <div>${place.formatted_address}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //
  //   `;
  //   let infoWindow = new google.maps.InfoWindow({ content: contentString });
  //
  //   if (event) {
  //     marker.addListener(event, () => {
  //       infoWindow.open(map, marker);
  //     });
  //
  //     marker.addListener('mouseout', () => {
  //       infoWindow.close();
  //     });
  //   } else {
  //     infoWindow.open(map, marker);
  //   }
  //
  //   marker.addListener('click', () => {
  //     infoWindow.open(map, marker);
  //   });
  // };

  //add little info window above map marker
  addInfoWindow = (property, map, marker) => {
    const contentString = `
      <div class="card-grid">
        <div>
          <div class="card-grid">
            <div class="place-name">
              Address: ${property.street_address}
            </div>
          </div>

          <div class="card-grid">
            <div>Total Rent: $${property.total_rent}</div>
          </div>

          <div class="card-grid">
            <div>Roommates: ${property.roommates}</div>
          </div>

          <div class="card-grid">
            <div>Bedrooms: $${property.bedrooms}</div>
          </div>
          
          <div class="card-grid">
            <div>Total Rent: $${property.total_rent}</div>
          </div>
        </div>
      </div>
    `;

    let infoWindow = new google.maps.InfoWindow({ content: contentString });

    marker.addListener('mouseover', () => {
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      infoWindow.close();
    });

    marker.addListener('click', () => {
      console.log('You clicked this property! ', property);
    });
  };

  //get individual query result and render map to show result
  getPropertyDetails = placeId => {
    const { lat, lng } = this.props.initialPosition;

    let location = new google.maps.LatLng(lat, lng);
    let map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 15
    });

    let request = { placeId };

    let service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        let marker = new google.maps.Marker({
          position: { lat, lng },
          map: map
        });
        this.addInfoWindow(place, map, marker);
        map.setCenter({ lat, lng });
      }
    });
  };

  //render intial blank map with no marker
  renderInitialMap = (lat, lng) => {
    let initialLocation = new google.maps.LatLng(lat, lng);

    let map = new google.maps.Map(this.refs.map, {
      center: initialLocation,
      zoom: 13
    });
  };

  renderPropertiesMap = properties => {
    const { lat, lng } = this.props.initialPosition;

    let initialLocation = new google.maps.LatLng(lat, lng);

    let map = new google.maps.Map(this.refs.map, {
      center: initialLocation,
      zoom: 13
    });

    // loop over properties and render property.lat_lng
    return properties.forEach(property => {
      const lat = property.lat_lng[0];
      const lng = property.lat_lng[1];

      let marker = new google.maps.Marker({
        position: { lat, lng },
        map: map
      });

      this.addInfoWindow(property, map, marker);
    });
  };

  render() {
    return (
      <div className="demo_map_container">
        <div className="content_gutter">
          <div className="demo_header">
            <h2>What We're Building</h2>

            <p>
              Preview a small set of data from people that have already signed
              up.
            </p>
          </div>

          <div className="map_container">
            <div className="map" ref="map" />

            {/* <div className="query-results">
              {this.state.searchResults.map(place => {
                let boundGetPlaceDetails = this.getPlaceDetails.bind(
                  null,
                  place.place_id
                );

                return (
                  <div key={place.id} onClick={boundGetPlaceDetails}>
                    <a href="#resultmap">
                      <PropertyDetails place={place} />
                    </a>
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DemoMap;
