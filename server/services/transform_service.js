const mongoose = require('mongoose');
const Property = mongoose.model('property');
const moment = require('moment');
const PlacesAutocomplete = require('react-places-autocomplete');
const axios = require('axios');

const add_lat_lng = () => {
  axios({
    method: 'get',
    url:
      'https://maps.googleapis.com/maps/api/js?Search=1520+Gough+Street?key=AIzaSyA45xCeil4r_ANDyr60Q44-fXfFp7CU74c&libraries=geometry,places',

    headers: {
      'content-type': 'application/json',
      'response-type': 'application/json'
    }
  }).then(res => {
    // console.log(JSON.stringify(res));
    // console.log(Object.keys(res.data['0']));
    console.log(Object.keys(res));
    console.log(res.data['0']);
  });

  // Property.find({}).then(properties => {
  //   properties.forEach(property => {
  //     PlacesAutocomplete.geocodeByAddress(property.street_address)
  //       .then(results => {
  //         return PlacesAutocomplete.getLatLng(results[0]);
  //       })
  //       .then(geolocation => {
  //         console.log(geolocation);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   });
  // });
};

const addLeaseEnd = () => {
  Property.find({}).then(properties => {
    properties.forEach(property => {
      if (property.lease_type === 'annual') {
        let start = property.lease_start;
        let end = moment(start)
          .add(1, 'years')
          .calendar();
        let dateEnd = moment(end);
        let jsEnd = new Date(dateEnd);
        property.lease_end = jsEnd;
        property.save();
      } else {
        let start = property.lease_start;
        let end = moment(start)
          .add(1, 'months')
          .calendar();
        let dateEnd = moment(end);
        let jsEnd = new Date(dateEnd);
        property.lease_end = jsEnd;
        property.save();
      }
    });
  });
};

module.exports = { addLeaseEnd, add_lat_lng };
