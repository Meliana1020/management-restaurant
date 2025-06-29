'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

// Inisialisasi sequelize instance
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamic import semua model di folder ini
fs
  .readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Definisikan relasi antar model
const {
  User,
  Profile,
  Menu,
  Table,
  Order,
  OrderItem,
  Payment,
  Feedback
} = db;

// Relasi User - Order
if (User && Order) {
  User.hasMany(Order, { foreignKey: 'user_id' });
  Order.belongsTo(User, { foreignKey: 'user_id' });
}

// Relasi Table - Order
if (Table && Order) {
  Table.hasMany(Order, { foreignKey: 'table_id' });
  Order.belongsTo(Table, { foreignKey: 'table_id' });
}

// Relasi Order - OrderItem
if (Order && OrderItem) {
  Order.hasMany(OrderItem, { foreignKey: 'order_id' });
  OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
}

// Relasi Menu - OrderItem
if (Menu && OrderItem) {
  Menu.hasMany(OrderItem, { foreignKey: 'menu_id' });
  OrderItem.belongsTo(Menu, { foreignKey: 'menu_id' });
}

// Relasi Order - Payment
if (Order && Payment) {
  Order.hasOne(Payment, { foreignKey: 'order_id' });
  Payment.belongsTo(Order, { foreignKey: 'order_id' });
}

// Export db dan sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;