
const express = require('express');
const productsRouter = require('./products.router');
//const usersRouter = require('./users.router');
//const categoriesRouter = require('./categories');

function routerApi(app){
  //const router = express.Router();
  //para generar nuevas versiones de mis rutas
  //app.use('/api/v1', router);

  app.use('/products', productsRouter);
  //router.use('/products', productsRouter);

  //router.use('/users', usersRouter);
  //router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
