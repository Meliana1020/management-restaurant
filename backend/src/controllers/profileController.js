const { Profile } = require('../models');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data profile', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ message: 'Profile tidak ditemukan' });

    await profile.update(data);
    res.json({ message: 'Profile berhasil diupdate', profile });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update profile', error: err.message });
  }
};