const sequelize = require('../database/db');
const payment = require('../models/payment')

exports.Add = async function (req, res, next) {
    try {
        cadena = `INSERT INTO payments (name,enabled)
              VALUES('${req.body.name}',${req.body.enabled})`;
        console.log(req.body, cadena);
        const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.INSERT });
        res.json(resultado);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};



exports.Delete = async function (req, res, next) {
    try {
        cadena = `DELETE FROM payments WHERE id = ${req.params.id}`;
        console.log(cadena);
        const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.DELETE });
        console.log(req.payment)
        res.json(req.payment);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};


exports.List = async function (req, res, next) {
    try {
        const paymentMethods = await sequelize.query(`SELECT * FROM payments`, { type: sequelize.QueryTypes.SELECT });
        console.log(paymentMethods);
        res.json(paymentMethods);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};
