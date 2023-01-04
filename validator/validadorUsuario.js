const Joi = require('joi');
const { generateError } = require('../helpers');

const newUserSchema = Joi.object({
  nameUser: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(generateError('El campo nameUser debe existir', 400)),
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
};
