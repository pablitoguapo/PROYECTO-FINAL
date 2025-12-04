const User = require("../models/User");
const Device = require("../models/Device");

class UserService {

  async getAll() {
    return await User.find();
  }

  async getById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error("entrada invalida");
    return user;
  }

  async create(data) {
    const { name, email, password, role } = data;

    if (!name || !email || !password) {
      throw new Error("entrada invalida");
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    return newUser;
  }

  async update(id, changes) {
    const user = await User.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true
    });

    if (!user) throw new Error("entrada invalida");
    return user;
  }

  async delete(id) {
    const devicesInUse = await Device.countDocuments({ ownerId: id });
    if (devicesInUse > 0) {
      throw new Error(
        "No se puede eliminar el usuario porque está asignado a uno o más dispositivos. "
      );
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) throw new Error("entrada invalida");

    return { id };
  }
}

module.exports = UserService;
