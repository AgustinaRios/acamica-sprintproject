const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db')

class ordersProduct extends Model {}

ordersProduct.init({
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  
},{ 
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'ordersProduct' // We need to choose the model name
});

module.exports = ordersProduct;
// the defined model is the class itself
console.log(ordersProduct === sequelize.models.ordersProduct); // true

