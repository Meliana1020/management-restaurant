const { Transaksi } = require('../models');

exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    res.json(transaksi);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data transaksi', error: err.message });
  }
};

exports.getTransaksiById = async (req, res) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id);
    if (!transaksi) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    res.json(transaksi);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil transaksi', error: err.message });
  }
};

exports.createTransaksi = async (req, res) => {
  try {
    const { kode, tanggal, total, dibayar, metodePembayaran, status, userId, keterangan } = req.body;
    let buktiPembayaran = null;
    if (req.file) buktiPembayaran = req.file.filename;
    const transaksi = await Transaksi.create({
      kode, tanggal, total, dibayar, metodePembayaran, status, userId, keterangan, buktiPembayaran
    });
    res.status(201).json(transaksi);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah transaksi', error: err.message });
  }
};

exports.updateTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id);
    if (!transaksi) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    const { kode, tanggal, total, dibayar, metodePembayaran, status, userId, keterangan } = req.body;
    let buktiPembayaran = transaksi.buktiPembayaran;
    if (req.file) buktiPembayaran = req.file.filename;
    await transaksi.update({
      kode, tanggal, total, dibayar, metodePembayaran, status, userId, keterangan, buktiPembayaran
    });
    res.json({ message: 'Transaksi berhasil diupdate', transaksi });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update transaksi', error: err.message });
  }
};

exports.deleteTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id);
    if (!transaksi) return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    await transaksi.destroy();
    res.json({ message: 'Transaksi berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus transaksi', error: err.message });
  }
};