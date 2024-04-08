const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.R();

router.get('/', (req, res)=> {
  const products = [];
  const {size} = req.query;
  const limit = size || 10;

  for(let i=0; i<limit; i++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);

  // res.json([ {name: "Zapatos", price: 300}, {name: "Chaqueta", price: 100} ]);

});

//ojo toda ruta que sea especifica debe ir antes de la ruta dinamica
//ruta especifica
router.get('/filter', (req, res)=>{
  res.send("Este es un filtro");
});

//ruta dinamica
router.get('/:id', (req, res)=>{
  //const id = req.params.id;
  const {id} = req.params;
   res.json(
     {
       id,
       name: "Zapatillas",
       price: 50
     }
   );
});

module.exports = router;
