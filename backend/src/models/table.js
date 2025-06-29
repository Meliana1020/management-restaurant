module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
      no_meja: { type: DataTypes.STRING, allowNull: false, unique: true },
      keterangan: { type: DataTypes.STRING }
    }, {
      tableName: 'tables',
      timestamps: true
    });
    return Table;
  };