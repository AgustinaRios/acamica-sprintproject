const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db')

class Payment extends Model {}

Payment.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  enabled: {
    type: DataTypes.BOOLEAN
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Payment' // We need to choose the model name
});

module.exports = Payment;
// the defined model is the class itself
console.log(Payment === sequelize.models.Payment); // true




/*class Payment{
    constructor( name,_enabled){
       
        this.name=name;
        this.enabled=true;
    }
}

const create = (payment) => {payments.push(payment)};


const remove = (payment) => {
    if (payment._enabled=true){

        payment._enabled=false}
    
};



const edit = () => {}




let payments=[];

let payment1= new Payment('cash',true);
let payment2= new Payment('credit card',true);
let payment3= new Payment('QR',true);                        

payments.push(payment1);
payments.push(payment2);
payments.push(payment3);

module.exports={Payment,payments,create,remove};*/