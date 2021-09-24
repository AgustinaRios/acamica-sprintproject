const express = require('express');
const router = express.Router();
const userModule = require('../models/user') //Cargo todo lo que tengo en /models/users en la variable userModule para poder utilizar todo aqui.
const orderModule = require ('../models/orders'); //Idem al punto de arriba pero con orders
const {isLogged,isAdmin} = require('../middleware') //importo las funciones que estan en middlesares/users
router.use(express.json())


/**
 * @swagger
 * /signup:
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
 *    responses:
 *      201:
 *       description: Usuario registrado
 *      401:
 *       description: Usuario no registrado
 *      
 */
 router.post('/signup', function (req, res) {

    let name=req.body.name;
    let surname=req.body.surname; 
    let email=req.body.email;
    let userName= req.body.userName;
    let password= req.body.password;
    let phone=req.body.phone;
    let adress=req.body.adress;
  
    if (typeof name != "string" || name == ""){
  
      return res.status(400).send({ resultado: `Nombre inválido` });
    }
     
    if (typeof surname != "string" || surname == ""){
      return res.status(400).send({ resultado: `Apellido inválido` });
    }
  
    if (typeof email !="string"||email==""){
      return res.status(400).send({resultado:`Email inválido`});
    }
  
    if (typeof userName !="string"||userName==""){
      return res.status(400).send({resultado:`Nombre de usuario inválido`});
    }
  
    if (typeof password !="string"||password==""){
      return res.status(400).send({resultado:`Contraseña inválida`});
    }
  
    if (typeof phone !="string" ||phone==""){
      return res.status(400).send({resultado:`telefono inválido`});
    }
  
  
    if (typeof adress !="string"||adress==""){
      return res.status(400).send({resultado:`dirección inválida`});
    }
  
  
    let users = userModule.users;
  
    for (let i=0;i<users.length;i++){
      if( userName==users[i].userName||password==users[i].password){
        return res.status(400).send({resultado:`usuario o contraseña ya existen`})
      }
      if(email==users[i].email){
        return res.status(400).send({resultado:`email ya existente`});
      }
    }
    
  
    let user = new userModule.User(name,surname,userName,email,password,phone,adress,false);
  
    userModule.create(user);
  
    res.status(200).send({resultado:`Usuario registrado correctamente`});
  
    });
    
  
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
    router.post("/login", (req, res) => {
  
      let userName=req.body.userName;
      let password=req.body.password;
      let result= userModule.getUser(userName,password);
      if (result.found) {
      return  res.json(result.index).status(200)
      }  
  
    return res.json({resultado:`usuario o contraseña invalidos`}).status(400);
  
      });
  
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
   router.get("/:index",isLogged,isAdmin,(req,res)=>{
  
      res.json(userModule.users);  
  
  });
 
  
module.exports = router;  