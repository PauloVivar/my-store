const express = require('express');

const UsersService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schema/user.schema');

const router = express.Router();

const service = new UsersService();

//obtener usuario
router.get('/', async (req, res)=> {
  const users = await service.find();
  res.json(users);
});

//obtener un usuario : ruta dinamica
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async(req, res, next)=>{
    try {
      //const id = req.params.id;
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

//crear nuevo usuario
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async(req, res)=>{
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }
);

//actualizar usuario
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next)=>{
    //try y catch finciona solo con el asincronismo (async - awit)
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
      /*
      res.status(404).json({ message: error.message });
      */
    }
  }
);

//eliminar usuario
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
