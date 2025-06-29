const { DetailTransaksi, Menus, Transaksi } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const details = await DetailTransaksi.findAll({
      include: [
        { model: Menus, as: 'menu' },
        { model: Transaksi, as: 'transaksi' }
      ]
    });
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil detail transaksi', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const detail = await DetailTransaksi.findByPk(req.params.id, {
      include: [
        { model: Menus, as: 'menu' },
        { model: Transaksi, as: 'transaksi' }
      ]
    });
    if (!detail) return res.status(404).json({ message: 'Detail tidak ditemukan' });
    res.json(detail);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil detail transaksi', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { transaksiId, menuId, qty, subtotal } = req.body;
    const detail = await DetailTransaksi.create({ transaksiId, menuId, qty, subtotal });
    res.status(201).json(detail);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah detail transaksi', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { transaksiId, menuId, qty, subtotal } = req.body;
    const detail = await DetailTransaksi.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ message: 'Detail tidak ditemukan' });
    await detail.update({ transaksiId, menuId, qty, subtotal });
    res.json(detail);
  } catch (err) {
    res.status(500).json({ message: 'Gagal update detail transaksi', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const detail = await DetailTransaksi.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ message: 'Detail tidak ditemukan' });
    await detail.destroy();
    res.json({ message: 'Detail transaksi berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus detail transaksi', error: err.message });
  }
};