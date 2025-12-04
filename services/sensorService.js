const Sensor = require('../models/Sensor');
const Reading = require('../models/Reading');

class SensorService {

  async create(data) {
    const sensor = new Sensor(data);
    return await sensor.save();
  }

  async getAll() {
    return await Sensor.find();
  }

  async getById(id) {
    const sensor = await Sensor.findById(id);
    if (!sensor) throw new Error("Sensor no encontrado");
    return sensor;
  }

  async update(id, changes) {
    const updated = await Sensor.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true
    });

    if (!updated) throw new Error("Sensor no encontrado");
    return updated;
  }

  async delete(id) {
    const readingsCount = await Reading.countDocuments({ sensorId: id });
    if (readingsCount > 0) {
      throw new Error("No se puede eliminar el sensor porque tiene lecturas asociadas. Elimine las lecturas primero.");
    }

    const deleted = await Sensor.findByIdAndDelete(id);
    if (!deleted) throw new Error("Sensor no encontrado");

    return { id };
  }
}

module.exports = SensorService;
