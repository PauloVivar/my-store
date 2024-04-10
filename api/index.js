// Para crear datso fake y poder probar nuestra aplicación
// PS C:\Users\admin\dev\my-store> npm i @faker-js/faker

const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');     //manipulacion de errores

const app = express();

//se lee el port desde una variable de ambiente para poner en producción

//const port = 3000;
const port = process.env.PORT || 3000;

//Middleware: gestion de las APIs -> para el fun de metodo post(create)
app.use(express.json());

//cors
const whitelist = ['http://localhost:8080', 'https://miapp.ec', 'http://localhost:3000/']
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options));

// definimos la rutas
// tiene un callback que va a ejecutar la respuesta que enviemos al cliente.
// el callback siempre tiene dos parámetros "req" y "res".

app.get('/api', (req, res)=> {
  res.send('Hola es mi server de pruebas con node js - express');
});

app.get('/api/nueva-ruta', (req, res)=> {
  res.send('Hola es mi nueva ruta endpoint');
});

routerApi(app);

//middlewares errors -> siempre se deben ejecutar despues de routeApi
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  //console.log('Mi puerto' + port);
  console.log(`Listening at http://localhost:${port}`);
});

//vercel
module.exports = app;

// Antes de delegar responsabilidades ejemplo

// app.get('/people/:idPerson', (req, res)=>{
//   const {idPerson} = req.params;
//   res.json({
//     idPerson,
//     name: "Paulo",
//     age: "31",
//     rol: "Programming"
//   });
// });
