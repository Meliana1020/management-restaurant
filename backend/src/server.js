const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const laporanRoutes = require('./routes/laporanRoutes');
const detailTransaksiRoutes = require('./routes/detailTransaksiRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/menu', menuRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/laporan', laporanRoutes);
app.use('/detailtransaksi', detailTransaksiRoutes); 

// Tes koneksi database
sequelize.authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil!');
  })
  .catch(err => {
    console.error('Gagal koneksi ke database:', err);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Backend siap!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});