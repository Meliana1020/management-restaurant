const { Order, OrderItem, Menu, Table, User } = require('../models');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, include: [Menu] },
        { model: Table },
        { model: User, attributes: ['id', 'nama', 'email', 'role'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data order', error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  // Data: { user_id, table_id, items: [{menu_id, jumlah}], total }
  try {
    const { user_id, table_id, items, total } = req.body;
    const order = await Order.create({ user_id, table_id, total, status: 'unpaid' });
    for (const item of items) {
      await OrderItem.create({
        order_id: order.id,
        menu_id: item.menu_id,
        jumlah: item.jumlah,
        subtotal: item.subtotal
      });
    }
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat order', error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: OrderItem, include: [Menu] },
        { model: Table },
        { model: User, attributes: ['id', 'nama', 'email', 'role'] }
      ]
    });
    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil order', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });
    order.status = req.body.status;
    await order.save();
    res.json({ message: 'Status order berhasil diupdate', order });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update status order', error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });
    await OrderItem.destroy({ where: { order_id: order.id } });
    await order.destroy();
    res.json({ message: 'Order berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus order', error: err.message });
  }
};