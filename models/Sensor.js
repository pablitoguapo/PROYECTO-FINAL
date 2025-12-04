const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['temperature', 'humidity', 'co2', 'noise'],
    required: true
  },
  unit: {
    type: String,
    enum: ['°C', '%', 'ppm', 'dB'], 
    required: true
  },
  model: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true 
  }

});

module.exports = mongoose.model('Sensor', sensorSchema);