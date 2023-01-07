const Joi = require('joi');
const { generateError } = require('../helpers');

const newCommentSchema = Joi.object({
  texto: Joi.string()
    .max(500)
    .error(
      generateError(
        'El campo texto debe existir y no ser mayor a 500 caracteres',
        400
      )
    )
    .required(),
});

module.exports = {
  newCommentSchema,
};
