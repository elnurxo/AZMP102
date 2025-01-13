const { body, validationResult } = require("express-validator");

// Validation rules - Express Validator
const validateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),

  body("products")
    .optional() // The field is optional
    .isArray()
    .withMessage("Products must be an array"),

  body("products.*")
    .optional()
    .isMongoId()
    .withMessage(
      "Each product in the products array must be a valid MongoDB ID"
    ),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCategory;
