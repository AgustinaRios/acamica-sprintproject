const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db')

class Order extends Model {}

Order.init({
  
  adress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pendiente"
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  UserId: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  
  PaymentId: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Order' // We need to choose the model name
});

module.exports = Order;
// the defined model is the class itself
console.log(Order === sequelize.models.Order); // true










/*class Order {
    constructor(userId,payment,adress){
        this.userId=userId;
        this.products=[];
        this.payment=payment;
        this.adress=adress;
        this.status="pendiente";
        this.created= new Date();
        this.enabled = true;
        this.amount = 0;
    }   
    

    

    setAdress(adress) {
        this.adress=adress;
    };
}



let orders = []




let orderStatus=["pendiente","confirmado","enPreparación","enviado","entregado"];


const remove = (orderId) => { orders[orderId].enabled = false }

const addProduct = (orderId,product,price) => {

  orders[orderId].amount += parseFloat(price);
    orders[orderId].products.push(product);


}


const removeProduct = (orderId,product,price) => {

   
    orders[orderId].amount -= parseFloat(price); 

    orders[orderId].products[product.id]--;
    products.splice[product.id];
}






module.exports={Order,orders,addProduct,removeProduct,orderStatus};*/
