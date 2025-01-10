const { body, validationResult } = require("express-validator");

// Validation rules
const validateHero = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),

  body("alias")
    .notEmpty() // required field
    .isString()
    .withMessage("Alias must be a string"),

  body("powers")
    .notEmpty()
    .withMessage("Power is required")
    .isArray({ min: 1 })
    .withMessage("Power must be a string"),

  body("powers.*")
    .isString()
    .withMessage("Each power in the powers array must be a string"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 1 })
    .withMessage("Age must be a non-negative integer"),

  body("homeTown")
    .optional()
    .isString()
    .withMessage("HomeTown must be a string"),

  body("isImmortal")
    .notEmpty()
    .withMessage("isImmortal is required")
    .isBoolean()
    .withMessage("isImmortal must be a boolean"),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateHero;
