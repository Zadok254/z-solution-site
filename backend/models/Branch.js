const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: String,
  country: String,
  city: String,
  address: String,
  phone: String,
  email: String,
  mapCoordinates: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('Branch', branchSchema);
