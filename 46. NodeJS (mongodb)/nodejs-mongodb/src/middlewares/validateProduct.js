const validateProduct = (schema) => {
  return (req, res, next) => {

    if (req.file) {
      req.body.image = "http://localhost:7070/uploads" + req.file.filename;
    }

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }
    next();
  };
};

module.exports = validateProduct;
