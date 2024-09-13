const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  packagePrice: { type: Number, required: true },
  days: { type: Number, required: true },
  cityName: {type: String, required: true},
  destinationImage: { type: String },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true }
});

module.exports = mongoose.model('Tour', TourSchema);
