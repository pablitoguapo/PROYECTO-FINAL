const Zone = require("../models/Zone");
const Device = require("../models/Device");

class ZoneService {

  async getAll() {
    return await Zone.find();
  }

  async getById(id) {
    const zone = await Zone.findById(id);
    if (!zone) throw new Error("entrada invalida");
    return zone;
  }

  async create(data) {
    const { name, description, isActive } = data;

    if (!name) {
      throw new Error("entrada invalida");
    }

    const newZone = new Zone({ name, description, isActive });
    await newZone.save();
    return newZone;
  }

  async update(id, changes) {
    const zone = await Zone.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true
    });

    if (!zone) throw new Error("entrada invalida");
    return zone;
  }

  async delete(id) {

    // Validar si hay dispositivos que usan esta zona
    const devicesInUse = await Device.countDocuments({ zoneId: id });
    if (devicesInUse > 0) {
      throw new Error("No se puede eliminar la zona porque está asignado a uno o más dispositivos.");
    }

    const deleted = await Zone.findByIdAndDelete(id);
    if (!deleted) throw new Error("entrada invalida");

    return { id };
  }

}

module.exports = ZoneService;
