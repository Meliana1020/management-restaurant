const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data user', error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nama, email, password: hash, role });
    res.status(201).json({ ...user.toJSON(), password: undefined });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah user', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    const { nama, email, password, role } = req.body;
    let updateData = { nama, email, role };
    if (password) updateData.password = await bcrypt.hash(password, 10);
    await user.update(updateData);
    res.json({ message: 'User berhasil diupdate', user: { ...user.toJSON(), password: undefined } });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update user', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    await user.destroy();
    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus user', error: err.message });
  }
};