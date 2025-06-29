'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      order_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'orders', key: 'id' }},
      metode: { type: Sequelize.STRING, allowNull: false },
      jumlah: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM('paid', 'unpaid'), defaultValue: 'paid' },
      waktu_bayar: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payments');
  }
};