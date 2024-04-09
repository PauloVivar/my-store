
const express = require('express');
const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schema/product.schema');

const router = express.Router();

const service = new ProductsService();

//toda ruta que sea especifica debe ir antes de la ruta dinamica
//ruta especifica ejemplo
router.get('/filter', (req, res)=>{
  res.send("Este es un filtro");
});

//obtener productos
router.get('/', async (req, res)=> {
  const products = await service.find();
  res.json(products);
});

//obtener un producto : ruta dinamica
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async(req, res, next)=>{
    try {
      //const id = req.params.id;
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
    /*
    if(id === '999'){ res.status(404).json({ name: "not Found" });
    } else{ res.status(200).json({ id, name: "Zapatillas", price: 50 });}
    */
  }
);

//crear nuevo producto
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async(req, res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

//actualizar producto
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
    //try y catch finciona solo con el asincronismo (async - awit)
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
      /*
      res.status(404).json({ message: error.message });
      */
    }
  }
);

//eliminar producto
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
