'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    kode: { type: DataTypes.STRING, allowNull: false, unique: true },
    tanggal: { type: DataTypes.DATE, allowNull: false },
    total: { type: DataTypes.INTEGER, allowNull: false },
    dibayar: { type: DataTypes.INTEGER, allowNull: false },
    metodePembayaran: { type: DataTypes.STRING, allowNull: false },
    buktiPembayaran: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('DP', 'LUNAS'), allowNull: false },
    keterangan: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'transaksi',
    timestamps: true,
  });

  Transaksi.associate = function(models) {
    Transaksi.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Transaksi;
};