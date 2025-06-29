'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksi', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      kode: { type: Sequelize.STRING, allowNull: false, unique: true },
      tanggal: { type: Sequelize.DATE, allowNull: false },
      total: { type: Sequelize.INTEGER, allowNull: false },
      dibayar: { type: Sequelize.INTEGER, allowNull: false },
      metodePembayaran: { type: Sequelize.STRING, allowNull: false },
      buktiPembayaran: { type: Sequelize.STRING }, // simpan nama file/gambar
      status: { type: Sequelize.ENUM('DP', 'LUNAS'), allowNull: false },
      keterangan: { type: Sequelize.STRING },
      userId: { // opsional, relasi ke customer/user
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksi');
  }
};