const sequelize = require ('../database/db')
const jwt = require("jsonwebtoken");
const users = require('../models/user')
require('dotenv').config();

exports.signin = function signin(req, res, next) {
    try {
      
      const { userName, password } = req.body;
      console.log("signin", userName, password);
  
  
      jwt.sign(
        req.body,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
          if (err) {
            console.error("Error interno: " + err.message);
            res.status(500).send({ status: "Error interno" });
          } else {
            req.token = token;
            res.json({ status: "signin", token });
          }
        }
      );
    } catch (err) {
      console.error("Error interno: " + err.message);
      res.status(500).send({ status: "Error interno" });
    }
  };


  exports.signup = async function signup(req, res, next) {
    try {
      cadena = `INSERT INTO users (name,surname,email,userName,password,phone,adress)
            VALUES('${req.body.name}','${req.body.surname}','${req.body.email}','${req.body.userName}','${req.body.password}','${req.body.phone}',
            '${req.body.adress}')`;
      console.log(req.body, cadena);
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.INSERT });
      res.json(resultado);
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error' });
  }
};

exports.List = async function (req, res, next) {
  try {
      const all = await users.findAll();
      console.log(all);
      res.json(all);
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error' });
  }
};
  
   
