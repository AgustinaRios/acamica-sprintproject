require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const database = require('./database/db');
const helmet = require('helmet');
const passport = require('passport');
const association = require('./models/associations');
const auth0 = require('./auth/auth0');
const cors = require ('cors');
const session = require('express-session'); 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.3",
      info: {
        title: "Sprint Project 2- Mi primera API",
        version: "2.0.0",
        description: "Sprint Project N. 2",
      },
    
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
    apis: ['./src/app.js', 
    
    './src/routes/user.js', 
    './src/routes/product.js',
    './src/routes/orders.js',
    './src/routes/payment.js',],
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


  app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));

  
   app.use(helmet({
    contentSecurityPolicy: true,
  })); 

  app.use( express.json() );
  passport.serializeUser(function(user,done){
    done(null,user);
  });

  passport.deserializeUser(function(user,done){
    done(null,user);
  });

  app.use(cors())
  app.use(session({
    secret: 'mi-secreto'
  }))
  app.use(passport.initialize())
  app.use(passport.session())


  app.listen(process.env.PORT, () => console.log("listening on"+" "+ process.env.PORT));




  const routerUsers = require('./routes/user');
  const routerProducts = require('./routes/product');
  const routerPaymentMethods = require('./routes/payment');
  const routerOrders = require('./routes/orders');
  

  
  app.use('/api/v1/users',routerUsers);
  app.use('/api/v1/products',routerProducts);
  app.use('/api/v1/paymentMethods',routerPaymentMethods);
  app.use('/api/v1/orders',routerOrders)
  app.use('/api/v1',auth0)
  app.get('/api/v1',(req,res)=>{

    console.log('api version 1')
    res.status(200).json('api v1')
  })