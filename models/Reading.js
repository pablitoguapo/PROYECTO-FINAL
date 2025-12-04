const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  sensorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true 
  },
  time: {
    type: Date,
    default: Date.now, 
    required: true
  },
  value: {
    type: Number,
    required: true 
  }
});

module.exports = mongoose.model('Reading', readingSchema);