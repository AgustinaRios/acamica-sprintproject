const { users } = require("./info/user");
const { orders } = require("./info/orders");


function isLogged(req, res, next) {
    index= parseInt(req.params.index);
    console.log(req.params);
    user = users[index];
    //console.log(index);
    if (!user) {
        res.status(404).send({ resultado: `Usuario no logueado o inexistente` });
    } else {
        req.userIndex = index;
        req.user = user;
        next();
    }
   

}

function isAdmin(req, res, next) {
    admin = req.user.admin;
    if (!admin) {
        res.status(404).send({ resultado: false, mensaje: `Acceso denegado` });
    } else {
        next();
    }
}

function isOrderPendiente(req,res,next){
 
let orderId= req.params.orderId;

let order=orders[orderId];

 if(order.status != "pendiente"){
 res.status(404).send({resultado: false, mensaje:`no se puede modificar pedido en preparación`});
 } 
 else{
 next();
 }


}

module.exports={isLogged,isAdmin,isOrderPendiente};