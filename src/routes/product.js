const express = require('express');
const router = express.Router();
const productModule = require('../models/product') //Cargo todo lo que tengo en /models/users en la variable userModule para poder utilizar todo aqui.
const orderModule = require ('../models/orders'); //Idem al punto de arriba pero con orders
const {isLogged,isAdmin} = require('../middleware') //importo las funciones que estan en middlesares/users
router.use(express.json())

 //listado de productos
/**
 * @swagger
 * /products/{index}:
 *  get:
 *    tags: [products]    
 *    summary: Lista de productos
 *    description: Listado de productos 
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
 router.get("/:index",isLogged,(req,res)=>{

    res.json(productModule.products).status(200).send({resultado:`listado de productos`});
});

//obtener producto con id
/**
* @swagger
* /products/{index}/{id}:
*  get:
*    tags: [products]
*    summary: Obtener producto por índice.
*    description : Obtener producto por índice.
*    consumes:
*      - application/json
*    parameters:
*      - in: path
*        name: index
*        required: true
*        description: Index del usuario logueado.
*        schema:
*          type: integer
*          example: 1
*      - in: path
*        name: id
*        description: id del producto a obtener
*        schema:
*          type: object
*          required:
*            - id         
*          properties:
*            id:
*              description: id del producto
*              type: string
*              example: 1
*    responses:
*      200:
*       description: Producto seleccionado
*      400:
*       description: Producto no existe
*      
*/
router.get("/:index/:id",isLogged,(req,res)=>{

let id=req.params.id;
for (let i=0;i<productModule.products.length;i++){
  if (id==productModule.products[i].id){
    let product=productModule.products[i]
    res.json(product)
  }
}
return res.json({resultado:`producto inválido`}).status(400);

});

//Agregado de productos 
/**
 * @swagger
 * /products/{index}:
 *  post:
 *    tags: [products]
 *    summary: Creacion de productos.
 *    description : Agregado de producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: body
 *        name: product
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - price
 *            - id         
 *          properties:
 *            name:
 *              description: nombre del producto
 *              type: string
 *              example: hamburguesa
 *            price:
 *              description: precio del producto
 *              type: float
 *              example: 400.50
 *            id:
 *              description: id del producto
 *              type: string
 *              example: 6
 *    responses:
 *      201:
 *       description: Producto creado
 *      401:
 *       description: Producto no creado
 *      
 */
 router.post("/:index",isLogged,isAdmin,(req,res)=>{
  
    let name=req.body.name;
    let price=req.body.price;
    let id=req.body.id;
   
       
    
    if (typeof name != "string"|| name==undefined){
      return res.status(400).send({ resultado: `Nombre inválido`
    })};

    if (typeof price != "number"|| name==undefined){
      return res.status(400).send({ resultado: `precio inválido`
    })};
    
    
    
    let product = new productModule.Product(name,price,id);
      productModule.create(product);


      res.json(product);
});


//borrado lógico de producto
/**
 * @swagger
 * /products/{index}/{id}:
 *  delete:
 *    tags: [products]
 *    summary: Eliminación producto.
 *    description : Borrado lógico de producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: path
 *        name: id
 *        description: id del producto a eliminar
 *        schema:
 *          type: object
 *          required:
 *            - id         
 *          properties:
 *            id:
 *              description: id del producto
 *              type: string
 *              example: 1
 *    responses:
 *      201:
 *       description: Producto eliminado
 *      401:
 *       description: No se ha podido eliminar el producto
 *      
 */
 router.delete("/:index/:id",isLogged,isAdmin,(req,res)=>{
    let id=req.params.id;
    for (let i=0;i<productModule.products.length;i++){
        if(id==productModule.products[i].id){
          let product=productModule.products[i]
          productModule.remove(product);
          res.json(product).status(200).send({resultado:`producto inhabilitado para la venta correctamente`});
        }
      
    }   
    
    });

//editar productos con código
/**
 * @swagger
 * /productos/{index}/{id}:
 *  put:
 *    tags: [products]
 *    summary: Editar producto.
 *    description : Actualización de datos de producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1 
 *      - in: path
 *        name: id de producto
 *        required: true
 *        description: Código de producto a actualizar.
 *        schema:
 *          type: string
 *          example: 2
 *      - in: body
 *        name: producto
 *        description: producto a editar
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - price
 *          properties:
 *            name:
 *              description: nombre del producto
 *              type: string
 *              example: Cheese Cake
 *            price:
 *              description: Precio del producto 
 *              type: float
 *              example: 250.50
 *    responses:
 *      200:
 *       description: Producto actualizado
 *      400:
 *       description: Producto no actualizado
 *      
 */
 router.put("/:index/:id",isLogged,isAdmin,(req,res)=>{
  
    let id=req.params.id;
    for (let i=0;i<productModule.products.length;i++){
      if(id==productModule.products[i].id){
        let product=productModule.products[i]
         product.price=req.body.price
         product.name=req.body.name
        
        res.json(product);
      }};
  
  });


module.exports = router;