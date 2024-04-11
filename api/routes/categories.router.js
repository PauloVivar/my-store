const express = require('express');

const CategoriesService = require('./../services/categories.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schema/category.schema');

const router = express.Router();

const service = new CategoriesService();

//obtener categoria
router.get('/', async (req, res)=> {
  const categories = await service.find();
  res.json(categories);
});

//obtener un categoria : ruta dinamica
router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async(req, res, next)=>{
    try {
      //const id = req.params.id;
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

//crear nuevo categoria
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async(req, res)=>{
    const body = req.body;
    const newcategory = await service.create(body);
    res.status(201).json(newcategory);
  }
);

//actualizar categoria
router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next)=>{
    //try y catch finciona solo con el asincronismo (async - awit)
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
      /*
      res.status(404).json({ message: error.message });
      */
    }
  }
);

//eliminar categoria
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
