'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }},
      table_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'tables', key: 'id' }},
      total: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM('unpaid', 'paid'), defaultValue: 'unpaid' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};