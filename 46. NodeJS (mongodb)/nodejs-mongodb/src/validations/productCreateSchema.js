const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const productCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(1000).required(),
  battery: Joi.number().min(0).max(100).required(),
  price: Joi.number().min(0).required(),
  category: JoiObjectId().required(),
  image: Joi.string().uri().required(),
});

module.exports = productCreateSchema;
