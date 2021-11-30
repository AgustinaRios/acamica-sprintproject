const orders = require("../models/orders");
const orderProduct = require("../models/ordersProduct");
const products = require("../models/product");
const user = require("../models/user");
const payments = require("../models/payment");
const sequelize = require('../database/db');

exports.Add = async function (req, res) {
  try {
      cadena = `INSERT INTO orders (adress,UserId,PaymentId)
            VALUES('${req.body.adress}',${req.body.UserId},${req.body.PaymentId})`;
      console.log(req.body, cadena);
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.INSERT });
      res.json(resultado);
      
      console.log(req.body, cadena);
      
      
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error interno' });
  }
};

exports.AddProduct = async function (req, res) {
  try {
      cadena = `INSERT INTO ordersproducts (orderId,productId)
            VALUES(${req.params.orderId},${req.params.productId})`;
      console.log(req.body, cadena);
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.INSERT });
      res.json(resultado);
      
      console.log(req.body, cadena);

    const dataOrder = await orders.findOne({ where :{ id:req.params.orderId }});
    console.log(dataOrder);
    if (!dataOrder) {
      console.log("Order not found")
    return
    }//else if(dataOrder.status !=="pendiente"){
      //console.log("Pedido inhabilitado para su modificación");
      //return
    //}

    const dataProduct = await products.findOne({ where: {id:req.params.productId} });
    console.log(dataProduct);
    if (!dataProduct) {
      console.log("Product not found");
    return    
   }
   
    // Actualización de cabecera de pedidos
    dataOrder.amount = parseFloat(dataOrder.amount) + parseFloat(dataProduct.price);
    dataOrder.save();

   
  }
      
      
  
  catch (err) {
      console.log(err.message);
      /*res.status(500).json({ status: 'Error interno' });*/
  }
};

//TODO arreglar endpoint para poder eliminar un producto del pedido
exports.DeleteProduct = async function (req, res, next) {
  try {
      cadena = `DELETE FROM ordersproducts WHERE productId = ${req.params.productId}`;
      console.log(cadena);
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.DELETE });
      console.log(cadena);
      res.json(req.cadena);
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error interno' });
  }
};

exports.List = async function (req, res, next) {
  try {
      const orders = await sequelize.query(`SELECT * FROM orders WHERE userId = ${req.params.userId}`, { type: sequelize.QueryTypes.SELECT });
      console.log(orders);
      res.json(orders);
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error interno', texto: err.message });
  }
};


exports.UpdateStatus = async function (req,res,next){
   
try{
  const orderId = req.params.orderId
  const order = await orders.findOne({ where: { id:orderId }});
    console.log(order);
  
  if (!order){
    res.status(404).send
    console.log("orden no existente")
  } else{

    cadena = `UPDATE orders set status = '${req.body.status}' WHERE id = ${req.params.orderId} `

    console.log(cadena);
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.UPDATE });
      console.log(resultado)
      res.json(resultado);
    
  }  
  
  }

  catch(err){
    console.log(err.message);
    res.status(500).json({ status: 'Error interno', texto: err.message });

  };
  };


  exports.confirmOrder = async function (req,res,next){
   
    try{
      const orderId = req.params.orderId
      const order = await orders.findOne({ where: { id:orderId }});
        console.log(order);
      
      if (!order){
        res.status(404).send
        console.log("orden no existente")
      } else{
    
        cadena = `UPDATE orders set status = '${"confirmado"}' WHERE id = ${req.params.orderId} `
    
        console.log(cadena);
          const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.UPDATE });
          console.log(resultado)
          res.json(resultado);
        
      }  
      
      }
    
      catch(err){
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    
      };
      };