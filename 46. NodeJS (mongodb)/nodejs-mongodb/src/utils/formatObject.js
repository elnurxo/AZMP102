const formattedObject = (product) => {
  const formattedProduct = { ...product._doc };
  formattedProduct.id = product._id;
  delete formattedProduct.__v;
  delete formattedProduct._id;

  return formattedProduct;
};

module.exports = formattedObject;
