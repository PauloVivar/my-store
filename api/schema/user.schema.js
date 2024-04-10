const Joi = require('joi');

const id = Joi.string().uuid();
const firstName = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);
const email = Joi.string();

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
});

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  email: email,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema}
