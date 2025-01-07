const validateProduct = (req, res, next) => {
  const { name, description, battery, price } = req.body;
  if (!name || !description || !battery || !price) {
    return res.status(400).json({
      data: null,
      message: "Please provide all fields",
      status: "fail",
    });
  } else {
    next();
  }
};

module.exports = validateProduct;
