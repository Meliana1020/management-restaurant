const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');

router.get('/harian', laporanController.laporanHarian);
router.get('/mingguan', laporanController.laporanMingguan);
router.get('/bulanan', laporanController.laporanBulanan);
router.get('/tahunan', laporanController.laporanTahunan);

module.exports = router;