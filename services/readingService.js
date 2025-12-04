const Reading = require('../models/Reading');
const Sensor = require('../models/Sensor');

class ReadingService {

  async create(data) {
    const sensorExists = await Sensor.findById(data.sensorId);
    if (!sensorExists) {
      throw new Error("El sensor especificado no existe.");
    }

    const reading = new Reading(data);
    return await reading.save();
  }

  async getAll() {
    return await Reading.find().populate('sensorId');
  }

  async getById(id) {
    const reading = await Reading.findById(id).populate('sensorId');
    if (!reading) throw new Error("Lectura no encontrada");
    return reading;
  }

  async update(id, changes) {

   
    if (changes.sensorId) {
      const sensorExists = await Sensor.findById(changes.sensorId);
      if (!sensorExists) {
        throw new Error("El sensor especificado no existe.");
      }
    }

    const updated = await Reading.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true
    });

    if (!updated) throw new Error("Lectura no encontrada");

    return updated;
  }

  async delete(id) {
    const deleted = await Reading.findByIdAndDelete(id);
    if (!deleted) throw new Error("Lectura no encontrada");
    return { id };
  }
}

module.exports = ReadingService;
