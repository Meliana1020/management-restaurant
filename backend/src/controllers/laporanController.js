const { Op } = require('sequelize');
const { Transaksi, DetailTransaksi, Menu } = require('../models');
const { Parser } = require('json2csv'); // Untuk CSV/Excel

function buildLaporan(transaksi) {
  // Breakdown metode pembayaran dan top menu
  const metodeMap = {};
  const menuMap = {};

  transaksi.forEach(trx => {
    // Metode pembayaran
    if (!metodeMap[trx.metodePembayaran]) {
      metodeMap[trx.metodePembayaran] = {
        jumlahTransaksi: 0,
        totalDibayar: 0
      };
    }
    metodeMap[trx.metodePembayaran].jumlahTransaksi += 1;
    metodeMap[trx.metodePembayaran].totalDibayar += trx.dibayar;

    // Top menu
    trx.DetailTransaksis.forEach(detail => {
      const menuId = detail.menuId;
      const namaMenu = detail.menu ? detail.menu.nama : 'Unknown';
      if (!menuMap[menuId]) {
        menuMap[menuId] = {
          nama: namaMenu,
          qty: 0,
          subtotal: 0
        };
      }
      menuMap[menuId].qty += detail.qty;
      menuMap[menuId].subtotal += detail.subtotal;
    });
  });

  const topMenu = Object.values(menuMap).sort((a, b) => b.qty - a.qty).slice(0, 10);

  return {
    jumlahTransaksi: transaksi.length,
    totalPemasukan: transaksi.reduce((sum, trx) => sum + trx.dibayar, 0),
    breakdownMetode: metodeMap,
    topMenu,
    data: transaksi
  };
}

exports.laporanHarian = async (req, res) => {
  try {
    const { tanggal, exportExcel } = req.query;
    if (!tanggal) return res.status(400).json({ message: 'Tanggal wajib diisi (YYYY-MM-DD)' });

    const transaksi = await Transaksi.findAll({
      where: {
        tanggal: {
          [Op.gte]: `${tanggal} 00:00:00`,
          [Op.lte]: `${tanggal} 23:59:59`
        }
      },
      include: [
        { model: DetailTransaksi, as: 'DetailTransaksis', include: [{ model: Menu, as: 'menu' }] }
      ],
      order: [['tanggal', 'ASC']]
    });

    const laporan = buildLaporan(transaksi);

    if (exportExcel) {
      // Export ke CSV/Excel
      const plainData = laporan.data.map(trx => ({
        tanggal: trx.tanggal,
        kode: trx.kode,
        metodePembayaran: trx.metodePembayaran,
        status: trx.status,
        dibayar: trx.dibayar,
        total: trx.total
      }));
      const parser = new Parser();
      const csv = parser.parse(plainData);
      res.header('Content-Type', 'text/csv');
      res.attachment(`laporan-harian-${tanggal}.csv`);
      return res.send(csv);
    }

    res.json({ periode: tanggal, ...laporan });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil laporan harian', error: err.message });
  }
};

exports.laporanMingguan = async (req, res) => {
  try {
    const { mulai, akhir, exportExcel } = req.query;
    if (!mulai || !akhir) return res.status(400).json({ message: 'Tanggal mulai dan akhir wajib diisi (YYYY-MM-DD)' });

    const transaksi = await Transaksi.findAll({
      where: {
        tanggal: {
          [Op.gte]: mulai,
          [Op.lte]: akhir,
        }
      },
      include: [
        { model: DetailTransaksi, as: 'DetailTransaksis', include: [{ model: Menu, as: 'menu' }] }
      ],
      order: [['tanggal', 'ASC']]
    });

    const laporan = buildLaporan(transaksi);

    if (exportExcel) {
      const plainData = laporan.data.map(trx => ({
        tanggal: trx.tanggal,
        kode: trx.kode,
        metodePembayaran: trx.metodePembayaran,
        status: trx.status,
        dibayar: trx.dibayar,
        total: trx.total
      }));
      const parser = new Parser();
      const csv = parser.parse(plainData);
      res.header('Content-Type', 'text/csv');
      res.attachment(`laporan-mingguan-${mulai}-sd-${akhir}.csv`);
      return res.send(csv);
    }

    res.json({ periode: `${mulai} s/d ${akhir}`, ...laporan });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil laporan mingguan', error: err.message });
  }
};

exports.laporanBulanan = async (req, res) => {
  try {
    const { tahun, bulan, exportExcel } = req.query;
    if (!tahun || !bulan) return res.status(400).json({ message: 'Tahun dan bulan wajib diisi' });

    const start = `${tahun}-${bulan.padStart(2, '0')}-01`;
    const endDate = new Date(tahun, bulan, 0).getDate();
    const end = `${tahun}-${bulan.padStart(2, '0')}-${endDate}`;

    const transaksi = await Transaksi.findAll({
      where: {
        tanggal: {
          [Op.gte]: start,
          [Op.lte]: end
        }
      },
      include: [
        { model: DetailTransaksi, as: 'DetailTransaksis', include: [{ model: Menu, as: 'menu' }] }
      ],
      order: [['tanggal', 'ASC']]
    });

    const laporan = buildLaporan(transaksi);

    if (exportExcel) {
      const plainData = laporan.data.map(trx => ({
        tanggal: trx.tanggal,
        kode: trx.kode,
        metodePembayaran: trx.metodePembayaran,
        status: trx.status,
        dibayar: trx.dibayar,
        total: trx.total
      }));
      const parser = new Parser();
      const csv = parser.parse(plainData);
      res.header('Content-Type', 'text/csv');
      res.attachment(`laporan-bulanan-${tahun}-${bulan}.csv`);
      return res.send(csv);
    }

    res.json({ periode: `${tahun}-${bulan}`, ...laporan });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil laporan bulanan', error: err.message });
  }
};

exports.laporanTahunan = async (req, res) => {
  try {
    const { tahun, exportExcel } = req.query;
    if (!tahun) return res.status(400).json({ message: 'Tahun wajib diisi' });

    const start = `${tahun}-01-01`;
    const end = `${tahun}-12-31`;

    const transaksi = await Transaksi.findAll({
      where: {
        tanggal: {
          [Op.gte]: start,
          [Op.lte]: end
        }
      },
      include: [
        { model: DetailTransaksi, as: 'DetailTransaksis', include: [{ model: Menu, as: 'menu' }] }
      ],
      order: [['tanggal', 'ASC']]
    });

    const laporan = buildLaporan(transaksi);

    if (exportExcel) {
      const plainData = laporan.data.map(trx => ({
        tanggal: trx.tanggal,
        kode: trx.kode,
        metodePembayaran: trx.metodePembayaran,
        status: trx.status,
        dibayar: trx.dibayar,
        total: trx.total
      }));
      const parser = new Parser();
      const csv = parser.parse(plainData);
      res.header('Content-Type', 'text/csv');
      res.attachment(`laporan-tahunan-${tahun}.csv`);
      return res.send(csv);
    }

    res.json({ periode: tahun, ...laporan });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil laporan tahunan', error: err.message });
  }
};