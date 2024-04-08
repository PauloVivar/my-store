//Para crear datso fake y poder probar nuestra aplicación
//PS C:\Users\admin\dev\my-store> npm i @faker-js/faker

const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

//definimos la ruta
// tiene un callback que va a ejecutar la respuesta que enviemos al cliente.
//el callback siempre tiene dos parámetros "req" y "res".

app.get('/', (req, res)=> {
  res.send('Hola es mi server en express');
});

app.get('/nueva-ruta', (req, res)=> {
  res.send('Hola es mi nuva ruta endpoit');
});

routerApi(app);

app.listen(port, ()=>{
  //console.log('Mi puerto' + port);
  console.log(`Listening at http://localhost:${port}`);
});

//antes de delegar responsabilidades

// app.get('/people/:idPerson', (req, res)=>{
//   const {idPerson} = req.params;
//   res.json({
//     idPerson,
//     name: "Paulo",
//     age: "31",
//     rol: "Programming"
//   });
// });
