'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        nama: 'Admin Demo',
        email: 'admin@demo.com',
        password: '$2b$10$123456789012345678901uHEgN1Uqv7Ptq1B6w0PZbFz6xV2k3Q5m', // hash password
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Pegawai Demo',
        email: 'pegawai@demo.com',
        password: '$2b$10$123456789012345678901uHEgN1Uqv7Ptq1B6w0PZbFz6xV2k3Q5m', // hash password
        role: 'PEGAWAI',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};