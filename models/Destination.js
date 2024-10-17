const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  destinationImage: { type: String }
  
});

module.exports = mongoose.model('Destination', DestinationSchema);
