const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: { type: String, required: true }
});

module.exports = mongoose.model('Map', MapSchema);    
