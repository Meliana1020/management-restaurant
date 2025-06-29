const { Payment, Order } = require('../models');

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Order }],
      order: [['createdAt', 'DESC']]
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data pembayaran', error: err.message });
  }
};

exports.createPayment = async (req, res) => {
  // Data: { order_id, metode, jumlah }
  try {
    const { order_id, metode, jumlah } = req.body;
    const payment = await Payment.create({
      order_id,
      metode,
      jumlah,
      status: 'paid',
      waktu_bayar: new Date()
    });
    // Optionally, update order status
    const order = await Order.findByPk(order_id);
    if (order) {
      order.status = 'paid';
      await order.save();
    }
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat pembayaran', error: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, { include: [Order] });
    if (!payment) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil pembayaran', error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    await payment.destroy();
    res.json({ message: 'Pembayaran berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus pembayaran', error: err.message });
  }
};