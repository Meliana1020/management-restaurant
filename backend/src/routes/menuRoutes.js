const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const uploadMenu = require('../middlewares/uploadMenu');

// ==== CRUD MENU ====
router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuById);
router.post('/', menuController.createMenu);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

// ==== UPLOAD GAMBAR MENU ====
router.post('/upload', uploadMenu.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // URL ini harus bisa diakses dari browser, pastikan /uploads di app.js sudah di-serve statically
  res.json({ url: `/uploads/menu/${req.file.filename}` });
});

module.exports = router;