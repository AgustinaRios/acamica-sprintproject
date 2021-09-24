const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db')

class Product extends Model {}

Product.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Product' // We need to choose the model name
});

module.exports = Product;
// the defined model is the class itself
console.log(Product === sequelize.models.Product); // true
























/*class Product{
    constructor(name,price,id){
        this.name=name;
        this.price=price;
        this.id=id;
        this.enabled=true;

    }

}
    


const create = (product) => { products.push(product)};
    
const remove = (product) => {product.enabled=false}



  



const getProduct=(name)=>{
    for (let i=0; i<products.length;i++){
        if(name==products[i].name){
            return { found: true , product: products[i], id: i }; 
        }
    }
    return { found: false , user: null };
}



let products=[];

let product1= new Product('Classic Burger',650,0,20,true);
products.push(product1);

let product2= new Product('Veggie Sandwich',550,1,20,true);
products.push(product2);

let product3= new Product('Hot Dog',400,2,20,true);
products.push(product3);

let product4= new Product('Coca Cola', 150,3,20,true);
products.push(product4);

let product5= new Product('Beer',250,4,20,true);
products.push(product5);


module.exports={Product,products,create,remove,getProduct};*/