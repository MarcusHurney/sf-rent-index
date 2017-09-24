const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  street_address: String,
  bedrooms: Number,
  square_feet: Number,
  total_rent: Number,
  room_rent: Number,
  roommates: Number,
  lease_start: Date,
  lease_end: Date,
  perks: String
});

mongoose.model('property', PropertySchema);
