module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    nama: { type: DataTypes.STRING, allowNull: false },
    kategori: { type: DataTypes.ENUM('MAKANAN', 'MINUMAN'), allowNull: false },
    harga: { type: DataTypes.INTEGER, allowNull: false },
    stok: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    deskripsi: { type: DataTypes.STRING },
    gambar: { type: DataTypes.STRING }
  }, {
    tableName: 'menus',
    timestamps: true
  });
  return Menu;
};