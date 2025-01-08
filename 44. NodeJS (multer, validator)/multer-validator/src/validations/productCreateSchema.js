const Joi = require("joi");

const productCreateSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(100).required(),
  description: Joi.string().min(2).max(1000).required(),
  battery: Joi.number().min(0).max(100).required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().uri().required(),
});

module.exports = productCreateSchema;
