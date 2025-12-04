const mongoose = require('mongoose');
const zoneSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  isActive: { 
    type: Boolean, 
    default: true 
  }
});


module.exports = mongoose.model("Zone", zoneSchema);
