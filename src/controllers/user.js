const sequelize = require ('../database/db')
const jwt = require("jsonwebtoken");
const users = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signin = async function signin(req, res, next) {
    try {
      
      const { userName, password,admin} = req.body
      if(!admin||admin==undefined){
        admin==false
      }                                                                                                                                                                                                                                                     ;
      console.log("signin", userName, password);
      const user = await users.findOne({
        where: { userName:userName },
      });
  
      if (!user) {
        console.log("Usuario no registrado");
        res.status(400).send({status:"Usuario no registrado"});
      }
  
    else{
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
      );};
    } catch (err) {
      console.error("Error interno: " + err.message);
      res.status(500).send({ status: "Error interno" });
    }
  };




  exports.signup = async function signup(req, res, next) {
    try {
      cadena = `INSERT INTO users (name,surname,email,userName,password,phone,adress,admin)
            VALUES('${req.body.name}','${req.body.surname}','${req.body.email}','${req.body.userName}',
            '${req.body.password= bcrypt.hashSync(req.body.password, 10)}','${req.body.phone}',
            '${req.body.adress}',${req.body.admin})`;
      console.log(req.body, cadena);
     const email = req.body.email
      
     const usuario = await users.findOne({where:{email:email}})
     if(usuario){
       res.status(400).send({status:'email  duplicado'})
     } 
     else{
     
       
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.INSERT });
      console.log(resultado)
      console.log(req.body.password)
      
     ;}
     jwt.sign(
      req.body,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          console.error("Error interno: " + err.message);
          res.status(500).send({ status: "Error interno" });
        } 
          req.token = token;
          res.status(201).send({ status: "signup", token });
        
      }
    );
      
  }
  catch (err) {
      console.log(err.message,"datos faltantes");
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
  
   
