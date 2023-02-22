const Joi = require('joi');
const { generateError } = require('../helpers');

const newUserSchema = Joi.object({
  name: Joi.string()
    .max(30)
    .required()
    .error(generateError('El campo name debe existir y no debe ser mayor a 30 caracteres', 400)),
  nameUser: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(generateError('El campo nameUser debe existir y debe ser entre 3 a 30 caracteres', 400)),
  email: Joi.string()
    .email()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    )
    .required(),
  password: Joi.string()
    .min(5)
    .max(15)
    .error(
      generateError(
        'El campo password debe existir y ser mayor de cinco caracteres',
        400
      )
    )
    .required(),
});

const updateUserSchema = Joi.object({
  nameUser: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(generateError('El campo nameUser debe existir y debe ser entre 3 a 30 caracteres', 400)),
  email: Joi.string()
    .email()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    )
    .required(),
  password: Joi.string()
    .min(5)
    .max(15)
    .error(
      generateError(
        'El campo password debe existir y ser mayor de cinco caracteres',
        400
      )
    )
    .required(),
  biografia: Joi.string()
    .min(0)
    .max(150)
    .error(generateError('El campo debe ser menor a 150 caracteres', 400)),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    )
    .required(),
  password: Joi.string()
    .min(5)
    .max(15)
    .error(
      generateError(
        'El campo password debe existir y ser mayor de cinco caracteres',
        400
      )
    )
    .required(),
});
module.exports = {
  newUserSchema,
  updateUserSchema,
  loginSchema,
};
