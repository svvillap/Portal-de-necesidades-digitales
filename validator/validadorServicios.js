const Joi = require('joi');
const { generateError } = require('../helpers');

const newServiceSchema = Joi.object({
  title: Joi.string()
    .max(80)
    .required()
    .error(generateError('El campo título debe existir', 400)),
  description: Joi.string()
    .max(1000)
    .error(generateError('El campo description debe existir', 400))
    .required(),
  price: Joi.number()
    .min(1)
    .max(100000)
    .error(generateError('El campo price debe existir', 400))
    .required(),
  date: Joi.date()
    .greater('now')
    .error(generateError('El campo date debe existir', 400))
    .required(),
  categoriaId: Joi.number()
    .integer()
    .error(generateError('El campo categoriaId debe existir', 400))
    .required(),
  subcategoriaId: Joi.number()
    .integer()
    .error(generateError('El campo subcategoriaId debe existir', 400))
    .required(),
});

const updateServiceSchema = Joi.object({
  title: Joi.string()
    .max(80)
    .required()
    .error(generateError('El campo título debe existir', 400)),
  description: Joi.string()
    .max(1000)
    .error(generateError('El campo description debe existir', 400))
    .required(),
  price: Joi.number()
    .min(1)
    .max(100000)
    .error(generateError('El campo price debe existir', 400))
    .required(),
  date: Joi.date()
    .greater('now')
    .error(generateError('El campo date debe existir', 400))
    .required(),
  categoriaId: Joi.number()
    .integer()
    .error(generateError('El campo categoriaId debe existir', 400))
    .required(),
  subcategoriaId: Joi.number()
    .integer()
    .error(generateError('El campo subcategoriaId debe existir', 400))
    .required(),
});

module.exports = {
  newServiceSchema,
  updateServiceSchema,
};
