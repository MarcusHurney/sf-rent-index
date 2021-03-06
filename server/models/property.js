const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lat_lng: [Number],
  street_address: String,
  bedrooms: Number,
  bathrooms: Number,
  square_feet: Number,
  total_rent: Number,
  // room_rent: Number,
  // utilities: Number,
  roommates: Number,
  lease_start: Date,
  lease_end: Date,
  lease_type: String,
  perks: [String],
  rent_includes: [String]
});

mongoose.model('property', PropertySchema);
