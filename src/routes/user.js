const express = require('express');
const router = express.Router();
const userModule = require('../models/user'); 
const orderModule = require ('../models/orders'); 
const {isAdmin, authenticated} = require('../middleware'); 
const controller = require('../controllers/user');
router.use(express.json());


/**
 * @swagger
 * /users/signup:
 *  post:
 *    tags: [users]
 *    summary: Crear usuario.
 *    description: Crear usuario.
 *    requestBody:
 *      description: Objeto conteniendo los datos del usuario nuevo.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 description: nombre del usuario a registrar.
 *                 type: string
 *                 example: Pedro
 *               surname:
 *                 description: Apellido del usuario a registrar.
 *                 type: string
 *                 example: Lopez
 *               email:
 *                 description: Email del usuario a registrar.
 *                 type: email
 *                 example: pedro@gmail.com
 *               userName:
 *                 description: Nickname del usuario a registrar.
 *                 type: string
 *                 example: Pedrito
 *               password:
 *                 description: Contrasenia del usuario a registrar.
 *                 type: string
 *                 example: 123456
 *               phone:
 *                 description: Telefono del usuario a registrar (opcional).
 *                 type: string
 *                 example: 4774209         
 *               adress:
 *                 description: Dirección del usuario a registrar.
 *                 type: string
 *                 example: Santo tome 4749
 *               admin:
 *                 description: condicion de administrador
 *                 type: boolean
 *                 example: false        
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - userName
 *               - password
 *               - phone
 *               - adress
 *               - admin
 *    responses:
 *      '201':
 *       description: Usuario creado
 *      '400':
 *       description: Usuario no registrado
 *
 */
 router.post('/signup',controller.signup )

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags: [users]
 *    summary: Login de usuario.
 *    description: Login de usuario.
 *    requestBody:
 *      description: Nombre de usuario y contraseña de usuario a loguearse
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 description: userName de usuario a loguearse.
 *                 type: string
 *                 example: Agus
 *               password:
 *                 description: Contraseña de usuario a loguearse
 *                 type: string
 *                 example: Flynn
 *             required:
 *               - userName
 *               - password
 *    responses:
 *      '200':
 *       description: Login de usuario satisfactorio.
 *      '403':
 *       description: Datos de usuario incorrectos.
 */
    router.post("/login",controller.signin);
  
  //listado de usuarios
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener listado de usuarios (solo Admins).
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Listado de usuarios
 */
   router.get('/',authenticated,isAdmin,controller.List);
 
  
module.exports = router;  