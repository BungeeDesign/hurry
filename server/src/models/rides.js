const mongoose = require('mongoose');

const { Schema } = mongoose;

const ridesSchema = new Schema({
  service: {
    type: String,
    required: true
  },
  rideEta: {
    type: Number,
    required: true
  },
  driverRaiting: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  car: {
    model: {
      type: String,
      required: true
    },
    passengers: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('rides', ridesSchema);