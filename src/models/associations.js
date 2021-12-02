const sequelize = require('../database/db');


const User = require('./user');
const Product = require('./product');
const Payment = require('./payment');
const Order = require('./orders');
const ordersProduct= require('./ordersProduct')
const userAgenda= require('./userAgenda')

Order.belongsTo(User);
Order.belongsTo(Product);
Order.belongsTo(Payment);
ordersProduct.belongsTo(Order);
ordersProduct.belongsTo(Product);
userAgenda.belongsTo(User)
//User.hasMany(Order);

                      