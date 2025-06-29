module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nama: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('ADMIN', 'PEGAWAI'), defaultValue: 'PEGAWAI' }
  }, {
    tableName: 'users',
    timestamps: true
  });
  return User;
};