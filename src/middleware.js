const { users } = require("./models/user");
const { orders } = require("./models/orders");
const { jwt} = require("jsonwebtoken");
require('dotenv').config();

exports.authenticated = function authenticated(req,res,next){
    try {
        if (!req.headers.authorization) {
          (
            req,
            res,
            "Acceso denegado por falta de información de autorización"
          );
        } else {
          const token = req.headers.authorization.split(" ")[1];
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if (err) {
              res.json({mensaje:"token inválido"})
            } else {
              req.authData = authData;
              //TODO: Recuperar data del usuario
              console.log(req.authData);
    
              next();
            }
          });
        }
      } catch (err) {
        console.log(err)
      }
    };






function isOrderPendiente(req,res,next){
 
let orderId= req.params.orderId;

let order=orders[orderId];

 if(order.status != "pendiente"){
 res.status(404).send({resultado: false, mensaje:`no se puede modificar pedido en preparación`});
 } 
 else{
 next();
 }

};
