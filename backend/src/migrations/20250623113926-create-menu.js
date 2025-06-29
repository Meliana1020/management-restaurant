'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('menus', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nama: { type: Sequelize.STRING, allowNull: false },
      kategori: { type: Sequelize.ENUM('MAKANAN', 'MINUMAN'), allowNull: false },
      harga: { type: Sequelize.INTEGER, allowNull: false },
      stok: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      deskripsi: { type: Sequelize.STRING },
      gambar: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('menus');
  }
};