const express = require('express');
const router = express.Router();
const userModule = require('../models/user') //Cargo todo lo que tengo en /models/users en la variable userModule para poder utilizar todo aqui.
const orderModule = require ('../models/orders'); //Idem al punto de arriba pero con orders
const {isLogged,isAdmin, authenticated} = require('../middleware') //importo las funciones que estan en middlesares/users
const controller = require('../controllers/user')
router.use(express.json())


/**
 * @swagger
 * /users/signup:
 *  post:
 *    tags: [users]
 *    summary: Creacion de usuario.
 *    description :  creacion de cuenta de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - surname
 *            - email
 *            - userName
 *            - password
 *            - phone
 *            - adress
 *            - admin
 *          properties:
 *            name:
 *              description: Nombre del usuario
 *              type: string
 *              example: juan
 *            surname:
 *              description: Apellido del usuario
 *              type: string
 *              example: perez
 *            email:
 *              description: Email del usuario 
 *              type: string
 *              example: hola@gmail.com
 *            userName:
 *              description: Nombre de usuario 
 *              type: string
 *              example: juani
 *            password:
 *              description: Contraseña de usuario 
 *              type: string
 *              example: 1234
 *            phone:
 *              description: telefono de usuario
 *              type: string
 *              example: 4774209
 *            adress:
 *              description: direccion de usuario
 *              type: string
 *              example: santo tome 4749
 *            admin:
 *              description: administrador
 *              type: boolean
 *              example: false
 *    responses:
 *      201:
 *       description: Usuario registrado
 *      401:
 *       description: Usuario no registrado
 *      
 */
 router.post('/signup',controller.signup )

  /**
   * @swagger
   * /login:
   *  post: 
   *    tags: [users]   
   *    summary: Login de usuario.
   *    description : Login de usuario.
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: datos
   *        description: nombre de usuario y contraseña de usuario a loguearse
   *        schema:
   *          type: object
   *          required:
   *            - userName
   *          properties:
   *            userName:
   *              description: nickName de usuario a loguearse.
   *              type: string
   *              example: admin
   *            password:
   *              description: Contraseña de usuario a loguearse 
   *              type: string
   *              example: admin
   *    responses:
   *      200:
   *       description: Login de usuario satisfactorio. 
   *      404:
   *       description: Usuario no encontrado (userName y/o password incorrecta)
   */
    router.post("/login",controller.signin);
  
  //listado de usuarios
  /**
   * @swagger
   * /users/{index}:
   *  get:
   *    tags: [users]
   *    summary: Lista de usuarios
   *    parameters:
   *       - in: path
   *         name: index
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID que comprueba que el usuario este logueado
   *  responses:
   *       200:
   *         description: Listado de usuarios
   */
   router.get('/',authenticated,controller.List);
 
  
module.exports = router;  