const express = require('express');
const router = express.Router();
const paymentModule = require('../models/payment'); 
const orderModule = require ('../models/orders'); 
const {isLogged,isAdmin} = require('../middleware');
const controller = require('../controllers/payment') 
router.use(express.json())

//Obtener lista de medios de pago
/**
 * @swagger
 * /paymentMethods/{index}:
 *  get:
 *    tags: [payment]    
 *    summary: Listado de medios de pago
 *    description: Listado de medios disponibles para abonar la orden 
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
 *         description: Listado de medios de pago
 */
 router.get("/:index",controller.List);


//Agregar métodos de pago
/**
 * @swagger
 * /paymentMethods/{index}:
 *  post:
 *    tags: [payment]
 *    summary: Creacion de método de pago.
 *    description : Agregado de método de pago.
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
 *        name: paymentMethod
 *        description: método de pago a crear
 *        schema:
 *          type: object
 *          required:
 *            - name      
 *          properties:
 *            name:
 *              description: nombre del método de pago
 *              type: string
 *              example: mercado pago
 *    responses:
 *      200:
 *       description: Método de pago creado
 *      400:
 *       description: Método de pago no creado
 *      
 */
 router.post("/",controller.Add);
   
   

//borrado lógico de método de pago
/**
 * @swagger
 * /paymentMethods/{id}:
 *  delete:
 *    tags: [payment]
 *    summary: Eliminación de método de pago.
 *    description : Borrado lógico de método de pago.
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
 *        name: método de pago
 *        description: nombre del método de pago a eliminar
 *        schema:
 *          type: object
 *          required:
 *            - name         
 *          properties:
 *            name:
 *              description: nombre del método de pago a eliminar
 *              type: string
 *              example: QR
 *    responses:
 *      200:
 *       description: Método de pago eliminado
 *      400:
 *       description: No se ha podido eliminar el método de pago
 *      
 */
 router.delete("/:id",controller.Delete)



router.put("/:id",controller.Update)

module.exports = router;  
