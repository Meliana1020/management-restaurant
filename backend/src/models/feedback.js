module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
      nama: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING },
      pesan: { type: DataTypes.TEXT, allowNull: false }
    }, {
      tableName: 'feedbacks',
      timestamps: true
    });
    return Feedback;
  };