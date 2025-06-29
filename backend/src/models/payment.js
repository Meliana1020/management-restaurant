module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      metode: { type: DataTypes.STRING, allowNull: false },
      jumlah: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.ENUM('paid', 'unpaid'), defaultValue: 'paid' },
      waktu_bayar: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
      tableName: 'payments',
      timestamps: true
    });
    return Payment;
  };