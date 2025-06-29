const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');
const upload = require('../middlewares/uploadBukti');
const uploadBukti = require('../middlewares/uploadBukti');

router.post('/upload', uploadBukti.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: `/uploads/bukti/${req.file.filename}` });
});

router.get('/', transaksiController.getAllTransaksi);

router.get('/:id', transaksiController.getTransaksiById);

router.post('/', upload.single('buktiPembayaran'), transaksiController.createTransaksi);

router.put('/:id', upload.single('buktiPembayaran'), transaksiController.updateTransaksi);

router.delete('/:id', transaksiController.deleteTransaksi);

module.exports = router;