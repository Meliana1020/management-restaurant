module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
      nama_resto: { type: DataTypes.STRING, allowNull: false },
      alamat: { type: DataTypes.STRING },
      deskripsi: { type: DataTypes.TEXT },
      jam_buka: { type: DataTypes.STRING },
      kontak: { type: DataTypes.STRING }
    }, {
      tableName: 'profiles',
      timestamps: true
    });
    return Profile;
  };