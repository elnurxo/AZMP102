const { categorySchema } = require("../schemas/category");
const mongoose = require("mongoose");

//create a model for the product schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
