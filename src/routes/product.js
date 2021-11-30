const express = require('express');
const router = express.Router(); 
const {authenticated,isAdmin} = require('../middleware');
const controller = require('../controllers/product');
router.use(express.json());


 //listado de productos
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener listado de productos.
 *     tags: [products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Listado de productos
 */ 
 router.get("/",authenticated,isAdmin,controller.List)

//obtener producto con id
/**
* @swagger
* /products/{id}:
*  get:
*    tags: [products]
*    security:
*      - bearerAuth: []
*    summary: Obtener producto por id.
*    description : Obtener producto por id.
*    consumes:
*      - application/json
*    parameters:
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
router.get("/:id",authenticated,controller.GetProduct)



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
 router.post("/",authenticated,controller.Add)
  
  
       
    
   
    
    
    
//borrado lógico de producto
/**
 * @swagger
 * /products/{id}:
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
 router.delete("/:id",authenticated,controller.Delete)
 

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
 router.put("/:id",authenticated,controller.Update)


module.exports = router;