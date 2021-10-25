const orders = require("../models/orders");
const orderProduct = require("../models/ordersProduct");
const product = require("../models/product");
const user = require("../models/user");
const payments = require("../models/payment");
const sequelize = require('../database/db');

exports.post = async function (req, res, next) {
  try {
      cadena = `INSERT INTO orders (adress,payment)
            VALUES('${req.body.name}',${req.body.payment})`;
      console.log(req.body, cadena);
      /*const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.INSERT });
      res.json(resultado);
      const codeFormaDePago = req.body.payment;
      const dataPayment = await payments.findOne({ where: { codigo: codeFormaDePago}});
    console.log(dataFormaDePago);*/
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error interno' });
  }
};

   