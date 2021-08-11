const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Sprint Project 1- Mi primera API',
        version: '1.0.0'
      }
    },
    apis: ['./src/app.js'],
    tags: [
      {
          name: 'users',
          description: 'Operaciones sobre usuarios'
      },
      {
          name: 'orders',
          description: 'Operaciones sobre pedidos'
      },
      {
          name: 'products',
          description: 'Operaciones sobre productos'
      },
      {
          name: 'payment',
          description: 'Operaciones sobre formas de pago'
      },
  ]


  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);


const userModule = require('./info/user');
const productModule=require('./info/product');
const paymentModule=require('./info/payment');
const orderModule=require('./info/orders');
const{isLogged,isAdmin, isOrderPendiente}=require('./middleware');

  app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));

   
  app.use( express.json() );

  app.listen(5000, () => console.log("listening on 5000"));




//sign in de usuarios
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
  app.post('/signup', function (req, res) {

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
  app.post("/login", (req, res) => {

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
 app.get("/users/:index",isLogged,isAdmin,(req,res)=>{

    res.json(userModule.users);  

});
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
  app.get("/products/:index",isLogged,(req,res)=>{

      res.json(productModule.products).status(200).send({resultado:`listado de productos`});
});

//obtener producto con id
/**
 * @swagger
 * /product/{index}/{id}:
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
app.get("/product/:index/:id",isLogged,(req,res)=>{
  
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
  app.post("/products/:index",isLogged,isAdmin,(req,res)=>{
  
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
app.delete("/products/:index/:id",isLogged,isAdmin,(req,res)=>{
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
app.put("/products/:index/:id",isLogged,isAdmin,(req,res)=>{
  
  let id=req.params.id;
  for (let i=0;i<productModule.products.length;i++){
    if(id==productModule.products[i].id){
      let product=productModule.products[i]
       product.price=req.body.price
       product.name=req.body.name
      
      res.json(product);
    }};

});


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
app.get("/paymentMethods/:index",isLogged,isAdmin,(req,res)=>{
        res.json(paymentModule.payments);
});


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
app.post("/paymentMethods/:index",isLogged,isAdmin,(req,res)=>{
   
    let name=req.body.name;
    let _enabled=true;

      if(typeof name!="string"||name==""){
        return res.status(400).send({ resultado: `Nombre inválido`});
      }

      let payment= new paymentModule.Payment (name,true);

      paymentModule.create(payment);

      res.json(payment).status(200).send({resultado:`Metodo de pago agregado`});

});

//borrado lógico de método de pago
/**
 * @swagger
 * /paymentMethods/{index}:
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
app.delete("/paymentMethods/:index",isLogged,isAdmin,(req,res)=>{

  let name=req.body.name;
  for (let i=0;i<paymentModule.payments.length;i++){
    if(name==paymentModule.payments[i].name){
      let payment=paymentModule.payments[i]
      paymentModule.remove(payment);
      res.json(payment);
    }
  
    }   
});

//crear pedido
/**
 * @swagger
 * /orders/{index}:
 *  post:
 *    tags: [orders]
 *    summary: Creación de pedido.
 *    description : Se genera un pedido vacío.
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
 *        name: order
 *        description: orden generada por el usuario
 *        schema:
 *          type: object
 *          required:
 *            - userId
 *            - payment
 *            - adress      
 *          properties:
 *            userId:
 *              description: id del usuario que realiza el pedido
 *              type: string
 *              example: 1
 *            payment:
 *              description: método de pago
 *              type: string
 *              example: cash
 *            adress:
 *              description: dirección de entrega del pedido
 *              type: string
 *              example: santo tome 4749
 *    responses:
 *      200:
 *       description: Pedido creado con éxito
 *      400:
 *       description: No se pudo generar pedido 
 *      
 */
app.post("/orders/:index",isLogged,(req,res)=>{
      
    let userId= req.params.index;
    let payment=req.body.payment;
    let adress= req.body.adress;

    if (!adress){adress=userModule.users[index].adress}

    let order01= new orderModule.Order (userId,payment,adress);

    orderModule.orders.push(order01);
   
    
    console.log(orderModule.orders)
    res.json(order01);

});

//Listado de ordenes
/**
 * @swagger
 * /orders/{index}:
 *  get:
 *    tags: [orders]    
 *    summary: Listado de pedidos
 *    description: Listado de pedidos realizados por usuarios
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
 *         description: Listado de pedidos
 */
app.get("/orders/:index",isLogged,isAdmin,(req,res)=>{
    
    res.json(orderModule.orders);   
});


//agregado de producto
/**
 * @swagger
 * /orders/{orderId}/products/{productId}/{index}:
 *  put:
 *    tags: [orders]
 *    summary: Agredado de productos al pedido.
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
 *      - in: path
 *        name: index
 *        required: true
 *        description: Index del usuario logueado
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: body
 *        name: product
 *        description: producto a agregar
 *        schema:
 *          type: object
 *          required:
 *            - productId
 *            - orderId
 *          properties:
 *            productId:
 *              description: Id del producto a agregar
 *              type: string
 *              example: 1 
 *            orderId:
 *              description: Id del pedido al que se agregará el producto 
 *              type: string
 *              example: 0
 *    responses:
 *      200:
 *       description: Pedido modificado
 *      400:
 *       description: Pedido no modificado
 *      
 */

app.put("/orders/:orderId/products/:productId/:index",isLogged,isOrderPendiente,(req,res)=>{
 
  let orderId= req.params.orderId;
  let productId=req.params.productId;

  let product=productModule.products[productId];
  let order=orderModule.orders[orderId];

  if (typeof order == "undefined")
    res.json({error:`orden no existe`});

  if (typeof product == "undefined")
    res.json({error:`producto no existe`});


  orderModule.addProduct(orderId,product,product.price);


  res.json({resultado:`producto agregado correctamente`});
});

//eliminar producto de pedido
/**
 * @swagger
 * /orders/{orderId}/products/{productId}/{index}:
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
 *          example: 0 
 *      - in: path
 *        name: productId
 *        required: true
 *        description: ID del producto a anular
 *        schema:
 *          type: integer
 *      - in: path
 *        name: index
 *        required: true
 *        description: Index del usuario logueado
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: body
 *        name: product
 *        description: producto a agregar
 *        schema:
 *          type: object
 *          required:
 *            - productId
 *            - orderId
 *          properties:
 *            productId:
 *              description: Id del producto a agregar
 *              type: string
 *              example: 1 
 *            orderId:
 *              description: Id del pedido al que se agregará el producto 
 *              type: string
 *              example: 0
 *    responses:
 *      200:
 *       description: Pedido modificado
 *      400:
 *       description: Pedido no modificado
 *      
 */
app.delete("/orders/:orderId/products/:productId/:index",isLogged,isOrderPendiente,(req,res)=>{
  let orderId= req.params.orderId;
  let productId=req.params.productId;

  let product=productModule.products[productId];
  let order=orderModule.orders[orderId];

  if (typeof order == "undefined")
    res.json({error:`orden no existe`});

  if (typeof product == "undefined")
    res.json({error:`producto no existe`});


   orderModule.removeProduct(orderId,product,product.price);


    res.json({resultado:`producto eliminado correctamente`});
});


//confirmación de orden por parte del usuario
/**
 * @swagger
 * /orders/{orderId}/{index}/confirmed:
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
 *          example: 0 
 *      - in: path
 *        name: index 
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1 
 *      - in: body
 *        name: order
 *        description: pedido a confirmar
 *        schema:
 *          type: object
 *          required:
 *            - orderId
 *          properties:
 *            orderId:
 *              description: id del pedido a confirmar
 *              type: string
 *              example: 0
 *    responses:
 *      200:
 *       description: Pedido confirmado
 *      400:
 *       description: Pedido no confirmado
 *      
 */
app.put("/orders/:orderId/:index/confirmed",isLogged,(req,res)=>{
       
  let orderId = req.params.orderId

  let order=orderModule.orders[orderId];

  if (typeof order==undefined){
    res.json({error:`orden no existe`})
  }
  else{
    order.status="confirmado";
    res.json(order);
  }
 
});


//historial de pedidos de usuario
/**
 * @swagger
 * /users/{index}/orders:
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
app.get("/users/:index/orders",isLogged,(req,res)=>{
   
   let userId= req.params.index
   let ordersUser=orderModule.orders.filter( o => (o.userId==userId));

   if (!ordersUser){
     res.json({error:`No existen pedidos del usuario indicado`})
    }
  else{
    res.json(ordersUser)
  };
   

  
});

//editar estado de pedido
/**
 * @swagger
 * /orders/{orderId}/{index}/status:
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
 *        name: index 
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 3 
 *      - in: body
 *        name: order
 *        description: pedido a modificar
 *        schema:
 *          type: object
 *          required:
 *            - orderId
 *            - status
 *          properties:
 *            orderId:
 *              description: id del pedido a confirmar
 *              type: string
 *              example: 0
 *            status:
 *              description: status que adquirirá el pedido
 *              type: string
 *              example: entregado
 *    responses:
 *      200:
 *       description: Estado del pedido modificado
 *      400:
 *       description: Estado del pedido no modificado
 *      
 */
app.put("/order/:orderId/:index/status",isLogged,isAdmin,(req,res)=>{

  let orderId= req.params.orderId;
  let order= orderModule.orders[orderId];
  let status=req.body.status;
  
  if (status == "pendiente"|| status == "confirmado" || status == "enPreparacion" || status =="enviado"|| status =="entregado"){
    order.status=status;
    res.json(order);
  }
  else{res.json({error:`No se puede actualizar estado-Estado inválido`})
    
    res.json(order);
  }



});


