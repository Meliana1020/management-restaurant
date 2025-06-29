const { Menu } = require('../models');

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data menu', error: err.message });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu tidak ditemukan' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil menu', error: err.message });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { nama, kategori, harga, stok, deskripsi, gambar } = req.body;
    const menu = await Menu.create({ nama, kategori, harga, stok, deskripsi, gambar });
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah menu', error: err.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu tidak ditemukan' });
    const { nama, kategori, harga, stok, deskripsi, gambar } = req.body;
    await menu.update({ nama, kategori, harga, stok, deskripsi, gambar });
    res.json({ message: 'Menu berhasil diupdate', menu });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update menu', error: err.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu tidak ditemukan' });
    await menu.destroy();
    res.json({ message: 'Menu berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus menu', error: err.message });
  }
};