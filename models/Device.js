const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },

  model: {
    type: String,
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          
    required: true
  },

  zoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",          
    required: true
  },

  installedAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["active", "maintenance", "offline"],
    default: "active"
  },

  sensors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor"        
    }
  ]
});

module.exports = mongoose.model("Device", deviceSchema);
