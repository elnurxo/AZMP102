const productSchema = require("../schemas/product");
const mongoose = require("mongoose");

//create a model for the product schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
