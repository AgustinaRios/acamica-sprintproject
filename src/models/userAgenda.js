const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db')

class userAgenda extends Model {}

userAgenda.init({
  
  adress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'userAgenda' // We need to choose the model name
});

module.exports = userAgenda;
// the defined model is the class itself
console.log(userAgenda === sequelize.models.userAgenda); // true




