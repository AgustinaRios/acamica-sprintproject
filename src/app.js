const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const database = require('./database/db');
const helmet = require('helmet');
const association = require('./models/associations')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.3',
      info: {
        title: 'Sprint Project 1- Mi primera API',
        version: '1.0.0'
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
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

  app.listen(process.env.PORT, () => console.log("listening on"+" "+ process.env.PORT));




  const routerUsers = require('./routes/user');
  const routerProducts = require('./routes/product');
  const routerPaymentMethods = require('./routes/payment');
  const routerOrders = require('./routes/orders');

  app.use('/users',routerUsers);
  app.use('/products',routerProducts);
  app.use('/paymentMethods',routerPaymentMethods);
  app.use('/orders',routerOrders)

