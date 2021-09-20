const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');

const database = require('./database/db');
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


/*const userModule = require('./models/user');
const productModule=require('./models/product');
const paymentModule=require('./models/payment');
const orderModule=require('./models/orders');
const{isLogged,isAdmin, isOrderPendiente}=require('./middleware');*/

  app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));

   
  app.use( express.json() );

  app.listen(5000, () => console.log("listening on 5000"));




  const routerUsers = require('./routes/user');
  const routerProducts = require('./routes/product');
  const routerPaymentMethods = require('./routes/payment');
  const routerOrders = require('./routes/orders');

  app.use('/users',routerUsers);
  app.use('/products',routerProducts);
  app.use('/paymentMethods',routerPaymentMethods);
  app.use('/orders',routerOrders)
