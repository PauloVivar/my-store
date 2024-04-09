
const express = require('express');

const router = express.Router();

//ruta dinamica: obtener una categoría
router.get('/:idCategory', (req, res)=>{
  //const idCategory = req.params.idCategory;
  const {idCategory} = req.params;
   res.json(
     {
       idCategory,
       name: "Ropa",
       description: "Prendas de vestir"
     }
   );
});

//obtener idCategory/:idProduct
//router.get('/categories/:idCategory/products/:idProduct', (req, res)=>{
router.get('/:idCategory/:idProduct', (req, res)=>{
  const {idCategory, idProduct} = req.params;
  res.json({
    idCategory,
    idProduct,
  });
});

module.exports = router;
