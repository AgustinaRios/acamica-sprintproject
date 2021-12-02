const express = require('express');
const router = express.Router();
const {isAdmin, authenticated} = require('../middleware');
const controller = require('../controllers/payment'); 
router.use(express.json())

//Obtener lista de medios de pago
/**
 * @swagger
 * /paymentMethods:
 *  get:
 *    tags: [payment]    
 *    summary: Listado de medios de pago
 *    description: Listado de medios disponibles para abonar la orden 
 *    responses:
 *       200:
 *         description: Listado de medios de pago
 */
 router.get("/",authenticated,controller.List);


//Agregar métodos de pago
/**
 * @swagger
 * /paymentMethods:
 *  post:
 *    tags: [payment]
 *    summary: Creacion de método de pago.
 *    description : Agregado de método de pago.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: paymentMethod
 *        description: método de pago a crear
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - enabled      
 *          properties:
 *            name:
 *              description: nombre del método de pago
 *              type: string
 *              example: mercado pago
 *            enabled:
 *              description: condición de habilitado para la venta
 *              type: boolean
 *              example: true
 *    responses:
 *      200:
 *       description: Método de pago creado
 *      400:
 *       description: Método de pago no creado
 *      
 */
 router.post("/",authenticated,isAdmin,controller.Add);
   
   

//borrado de método de pago
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
 *        name: método de pago
 *        description: id del método de pago a eliminar
 *        schema:
 *          type: object
 *          required:
 *            - id         
 *          properties:
 *            id:
 *              description: id del método de pago a eliminar
 *              type: integer
 *              example: 1
 *    responses:
 *      200:
 *       description: Método de pago eliminado
 *      400:
 *       description: No se ha podido eliminar el método de pago
 *      
 */
 router.delete("/:id",authenticated,isAdmin,controller.Delete)


/**
 * @swagger
 * /paymentMethods/:
 *  put:
 *    tags: [payment]
 *    summary: Edicion de método de pago.
 *    description : Edición de método de pago.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id de metodo de pago
 *        required: true
 *        description: Código de metodo de pago a editar.
 *        schema:
 *          type: string
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
 *              example: Transferencia Bancaria
 *    responses:
 *      200:
 *       description: Método de pago creado
 *      400:
 *       description: Método de pago no creado
 *      
 */ 
router.put("/:id",authenticated,isAdmin,controller.Update)

module.exports = router;  
