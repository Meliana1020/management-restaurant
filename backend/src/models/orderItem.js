module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      menu_id: { type: DataTypes.INTEGER, allowNull: false },
      jumlah: { type: DataTypes.INTEGER, allowNull: false },
      subtotal: { type: DataTypes.INTEGER, allowNull: false }
    }, {
      tableName: 'order_items',
      timestamps: true
    });
    return OrderItem;
  };