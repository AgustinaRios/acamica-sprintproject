const express = require('express');
const router = express.Router();
const paymentModule = require('../models/payment'); 
const orderModule = require ('../models/orders');
const userModule = require ('../models/user'); 
const {isAdmin, authenticated} = require('../middleware'); 
const controller = require('../controllers/order') 
router.use(express.json())

//crear pedido
/**
 * @swagger
 * /orders:
 *  post:
 *    tags: [orders]
 *    summary: Creación de pedido.
 *    description : Se genera un pedido vacío.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: order
 *        description: orden generada por el usuario
 *        schema:
 *          type: object
 *          required:
 *            - adress
 *            - userId
 *            - paymentId      
 *          properties:
 *            adress:
 *              description: direccion del usuario que realiza el pedido
 *              type: string
 *              example: Santo Tome 4749
 *            userId:
 *              description: id del usuario que realiza el pedido
 *              type: string
 *              example: 1
 *            paymentId:
 *              description: id del método de pago elegido
 *              type: string
 *              example: 1
 *    responses:
 *      200:
 *       description: Pedido creado con éxito
 *      400:
 *       description: No se pudo generar pedido 
 *      
 */
 router.post("/",authenticated,controller.Add);
      
   
//Listado de ordenes
/**
 * @swagger
 * /orders:
 *  get:
 *    tags: [orders]    
 *    summary: Listado de pedidos
 *    description: Listado de pedidos realizados por usuarios
 *    parameters:
 *    responses:
 *       200:
 *         description: Listado de pedidos
 */
 router.get("/",authenticated,isAdmin,controller.List)
    
      


//agregado de producto
/**
 * @swagger
 * /orders/{orderId}/{productId}:
 *  put:
 *    tags: [orders]
 *    summary: Agregado de productos al pedido.
 *    description : Se agregan al pedido los productos seleccionados por el usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: orderId
 *        required: true
 *        description: Id del pedido.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: productId
 *        required: true
 *        description: ID del producto a agregar
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *       description: Pedido modificado
 *      400:
 *       description: Pedido no modificado
 *      
 */

 router.put("/:orderId/:productId",authenticated,isAdmin,controller.AddProduct)

//eliminar producto de pedido
/**
 * @swagger
 * /orders/{orderId}/{productId}:
 *  delete:
 *    tags: [orders]
 *    summary: Eliminar de productos al pedido.
 *    description : Se anulan del pedido los productos seleccionados por el usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: orderId
 *        required: true
 *        description: Id del pedido.
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: path
 *        name: productId
 *        required: true
 *        description: ID del producto a anular
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *       description: Pedido modificado
 *      400:
 *       description: Pedido no modificado
 *      
 */
 router.delete("/:orderId/:productId",authenticated,controller.DeleteProduct);
  
 
//confirmación de orden por parte del usuario
/**
 * @swagger
 * /orders/{orderId}:
 *  put:
 *    tags: [orders]
 *    summary: Confirmación de pedido.
 *    description : Confirmación del pedido por parte del cliente.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: orderId
 *        required: true
 *        description: Id del pedido a confirmar.
 *        schema:
 *          type: integer
 *          example: 1 
 *      - in: body
 *        name: orderStatus
 *        required: true
 *        description: Id del pedido a confirmar.
 *        schema:
 *          type: string
 *          example: confirmado 
 *    responses:
 *      200:
 *       description: Pedido confirmado
 *      400:
 *       description: Pedido no confirmado
 *      
 */
 router.put("/:orderId",authenticated,controller.confirmOrder)
  
//historial de pedidos de usuario
/**
 * @swagger
 * /orders/{userId}:
 *  get:
 *    tags: [users]    
 *    summary: Historial de pedidos de usuario
 *    description: Historial de pedidos realizados por un usuario determinado
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: userId
 *         description: Id del usuario que requiere el historial de pedidos.
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *           properties:
 *             userId:
 *               description: Id del usuario que requiere el historial de pedidos.
 *               type: string
 *               example: 1
 *    responses:
 *       200:
 *         description: Historial de pedidos
 *       400:
 *         description: No existen pedidos del usuario indicado
 */
 router.get("/:userId",authenticated,controller.ListById)
   
 
//editar estado de pedido
/**
 * @swagger
 * /orders/{orderId}/status:
 *  put:
 *    tags: [orders]
 *    summary: Cambiar estado del pedido.
 *    description : Cambio de estado del pedido por parte de usuario admin.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: orderId
 *        required: true
 *        description: Id del pedido a confirmar.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: orderId
 *        required: true
 *        description: Id del pedido a modificar
 *        schema:
 *          type: integer
 *          example: 1 
 *      - in: body
 *        name: order
 *        description: pedido a modificar
 *        schema:
 *          type: object
 *          required:
 *            - status
 *          properties:
 *            status:
 *              description: estado que adoptará el pedido modificado
 *              type: string
 *              example: entregado
 *    responses:
 *      200:
 *       description: Estado del pedido modificado
 *      400:
 *       description: Estado del pedido no modificado
 *      
 */
 router.put("/:orderId",authenticated,isAdmin,controller.UpdateStatus);

   

  module.exports = router;
   