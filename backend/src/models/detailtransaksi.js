'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetailTransaksi = sequelize.define('DetailTransaksi', {
    transaksiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  DetailTransaksi.associate = function(models) {
    DetailTransaksi.belongsTo(models.Transaksi, { foreignKey: 'transaksiId', as: 'transaksi' });
    DetailTransaksi.belongsTo(models.Menus, { foreignKey: 'menuId', as: 'menu' });
  };

  return DetailTransaksi;
};