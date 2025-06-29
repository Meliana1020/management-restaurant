const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email }});
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user.id, nama: user.nama, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login gagal', error: err.message });
  }
};

// Optional: register pegawai/admin
exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nama, email, password: hash, role });
    res.status(201).json({ id: user.id, nama: user.nama, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Registrasi gagal', error: err.message });
  }
};