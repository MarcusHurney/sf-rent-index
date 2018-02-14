const mongoose = require('mongoose');
const Property = mongoose.model('property');
const moment = require('moment');
const PlacesAutocomplete = require('react-places-autocomplete');
const axios = require('axios');

const add_lat_lng = () => {
  Property.find({}).then(properties => {
    properties.forEach(property => {
      axios({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${
          property.street_address
        }&key=AIzaSyDUrx_YPvU2zc5NocO5zTEUcULjDwOrO8c`,

        headers: {
          'content-type': 'application/json',
          'response-type': 'application/json'
        }
      }).then(res => {
        console.log(
          `Street Address: ${property.street_address} -- ${
            res.data.results[0].geometry.location
          }`
        );
        // console.log(res.data.results[0].geometry.location);
      });
    });
  });
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
