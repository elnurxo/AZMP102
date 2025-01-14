const { body, validationResult } = require("express-validator");

const movieValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string.")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isString()
    .withMessage("Description must be a string."),

  body("imageURL")
    .notEmpty()
    .withMessage("Image URL is required.")
    .isString()
    .withMessage("Image URL must be a string.")
    .trim()
    .isURL()
    .withMessage("Image URL must be a valid URL."),

  body("year")
    .notEmpty()
    .withMessage("Year is required.")
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage("Year must be a valid integer between 1800 and the current year."),
];

const validateMovie = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { movieValidationRules, validateMovie };
