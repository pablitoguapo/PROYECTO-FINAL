const Device = require("../models/Device");
const User = require("../models/User");
const Zone = require("../models/Zone");
const Sensor = require("../models/Sensor");

class DeviceService {

  async getAll() {
    return await Device.find()
      .populate("ownerId")
      .populate("zoneId")
      .populate("sensors");
  }

  async getById(id) {
    const device = await Device.findById(id)
      .populate("ownerId")
      .populate("zoneId")
      .populate("sensors");

    if (!device) throw new Error("ID inválido");
    return device;
  }

  async create(data) {
    const { serialNumber, model, ownerId, zoneId, installedAt, status, sensors } = data;

    if (!serialNumber || !model || !ownerId || !zoneId) {
      throw new Error("Datos incompletos");
    }

    // Validar existencia de usuario
    const userExists = await User.findById(ownerId);
    if (!userExists) throw new Error("El usuario especificado no existe.");

    // Validar existencia de zona
    const zoneExists = await Zone.findById(zoneId);
    if (!zoneExists) throw new Error("La zona especificada no existe.");

    // Validar sensores si vienen
    if (sensors && sensors.length > 0) {
      const count = await Sensor.countDocuments({ _id: { $in: sensors } });
      if (count !== sensors.length) {
        throw new Error("Uno o más sensores no existen.");
      }
    }

    const newDevice = new Device({
      serialNumber,
      model,
      ownerId,
      zoneId,
      installedAt,
      status,
      sensors
    });

    await newDevice.save();
    return newDevice;
  }

  async update(id, changes) {

    // Validar ownerId si viene en el update
    if (changes.ownerId) {
      const exists = await User.findById(changes.ownerId);
      if (!exists) throw new Error("El usuario especificado no existe.");
    }

    // Validar zoneId si viene en el update
    if (changes.zoneId) {
      const exists = await Zone.findById(changes.zoneId);
      if (!exists) throw new Error("La zona especificada no existe.");
    }

    // Validar sensores si vienen en el update
    if (changes.sensors) {
      const count = await Sensor.countDocuments({ _id: { $in: changes.sensors } });
      if (count !== changes.sensors.length) {
        throw new Error("Uno o más sensores especificados no existen.");
      }
    }

    const device = await Device.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true
    });

    if (!device) throw new Error("ID inválido");

    return device;
  }

  async delete(id) {
    const deleted = await Device.findByIdAndDelete(id);
    if (!deleted) throw new Error("ID inválido");

    return { id };
  }
}

module.exports = DeviceService;
