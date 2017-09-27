const mongoose = require('mongoose');
const Property = mongoose.model('property');

function createProperty({ property_data, user_id }) {

  const {
    street_address,
    lat_lng,
    bedrooms,
    square_feet,
    total_rent,
    utilities,
    roommates,
    lease_start,
    lease_end,
    perks
  } = property_data;



  const property = new Property({
    user: user_id,
    lat_lng,
    street_address,
    bedrooms,
    square_feet,
    total_rent,
    utilities,
    roommates,
    lease_start: new Date(parseInt(lease_start)),
    lease_end: new Date(parseInt(lease_end)),
    perks
  });
  //
  // // if (!email || !street_address || !bedrooms || !square_feet || !roommates || !lease_start || !lease_end) { throw new Error('There is mising required data'); }
  return property.save();
}

module.exports = { createProperty };
