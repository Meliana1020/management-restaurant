module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      table_id: { type: DataTypes.INTEGER, allowNull: false },
      total: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.ENUM('unpaid', 'paid'), defaultValue: 'unpaid' }
    }, {
      tableName: 'orders',
      timestamps: true
    });
    return Order;
  };