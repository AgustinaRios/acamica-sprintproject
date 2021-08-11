const { products } = require("./product");

class Order {
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



const edit = () => {}
const getProductById=(id)=>{}

module.exports={Order,orders,addProduct,removeProduct,orderStatus,edit};
