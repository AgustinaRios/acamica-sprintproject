const sequelize = require('../database/db');
const redisClient= require('../database/redis');
const Product = require('../models/product')



exports.Add = async function (req, res, next) {
    try {
        cadena = `INSERT INTO products (name,price,enabled)
              VALUES('${req.body.name}',${req.body.price},${req.body.enabled})`;
              if (typeof req.body.name != "string"|| req.body.name==undefined){
                return res.status(400).send({ resultado: `Nombre inválido`
              })};
          
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
      cadena = `DELETE FROM products WHERE id = ${req.params.id}`;
      console.log(cadena);
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.DELETE });
      console.log(req.products)
      res.json(req.products);
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error interno' });
  }
};

exports.List = async function  (req, res) {
  try {
      //Con findAll busco todos los registros de la tabla, seria la sentencia SELECT
    const products = await Product.findAll();
    console.log(products);
    res.send(products);
    //Guardo los autos en cache
    redisClient.set('products', JSON.stringify(products), 'EX', '60');
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error interno" });
  }
}


exports.Update = async function (req,res,next){
  try {
      cadena = `UPDATE products set name = '${req.body.name}', price = ${req.body.price}  WHERE id = ${req.params.id} `
     
      console.log(cadena);
      const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.UPDATE });
      console.log(resultado)
      res.json(resultado);
      redisClient.del('products');
  }
  catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'Error interno', texto: err.message });
  };


};

exports.GetProduct = async function (req,res,next){
try{
  const product = await Product.findOne({ where :{ id:req.params.id }});
  console.log(product);
  res.send(product)
}
catch(err){
  console.log(err.message);
      res.status(500).json({ status: 'Error interno', texto: err.message});

};
};