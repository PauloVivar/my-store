const Joi = require('joi');

const idCategory = Joi.string().uuid();
const idProduct = Joi.string().uuid();
const description = Joi.string().min(5).max(50);

const createCategorySchema = Joi.object({
  idCategory: idCategory.required(),
  idProduct: idProduct.required(),
  description: description.required(),
});

const updateCategorySchema = Joi.object({
  idCategory: idCategory,
  idProduct: idProduct,
  description: description,
});

const getCategorySchema = Joi.object({
  idCategory: idCategory.required(),
  idProduct: idProduct.required(),
});

module.exports = {createCategorySchema, updateCategorySchema, getCategorySchema}
