const { Table } = require('../models');

exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil daftar meja', error: err.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah meja', error: err.message });
  }
};

exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) return res.status(404).json({ message: 'Meja tidak ditemukan' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil meja', error: err.message });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) return res.status(404).json({ message: 'Meja tidak ditemukan' });
    await table.update(req.body);
    res.json({ message: 'Meja berhasil diupdate', table });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update meja', error: err.message });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) return res.status(404).json({ message: 'Meja tidak ditemukan' });
    await table.destroy();
    res.json({ message: 'Meja berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus meja', error: err.message });
  }
};