const Joi = require("joi");

const productUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().min(2).max(1000).optional(),
  battery: Joi.number().min(0).max(100).optional(),
  price: Joi.number().min(0).optional(),
  image: Joi.string().uri().optional(),
});

module.exports = productUpdateSchema;
