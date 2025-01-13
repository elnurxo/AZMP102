const Category = require("../models/category");
const Product = require("../models/products");
const formattedObject = require("../utils/formatObject");

// MongoDB: Get all categories
const getAll = async (req, res) => {
  try {
    const { search } = req.query;

    const filteredCategories = await Category.find({
      name: { $regex: search || "", $options: "i" },
    }).populate("products", "name price");

    if (!filteredCategories.length) {
      return res.status(404).json({
        data: [],
        message: "No categories found",
        status: "fail",
      });
    }

    res.status(200).json({
      data: filteredCategories.map(formattedObject),
      message: "Categories retrieved successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: "fail",
    });
  }
};

// MongoDB: Get a single category
const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate(
      "products",
      "name price"
    );

    if (!category) {
      return res.status(404).json({
        data: null,
        message: "Category not found",
        status: "fail",
      });
    }

    res.status(200).json({
      data: formattedObject(category),
      message: "Category retrieved successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: "fail",
    });
  }
};

// MongoDB: Create a new category
const post = async (req, res) => {
  try {
    const { name, products = [] } = req.body;

    // Check for duplicate categories
    const checkDuplicate = await Category.isDuplicateCategory(name);
    if (checkDuplicate) {
      return res.status(400).json({
        data: null,
        message: "Category already exists!",
        status: "fail",
      });
    }

    // Validate product IDs
    if (products.length) {
      const validProducts = await Product.find({ _id: { $in: products } });
      if (validProducts.length !== products.length) {
        return res.status(400).json({
          data: null,
          message: "Invalid product IDs provided",
          status: "fail",
        });
      }
    }

    // Create and save the new category
    const newCategory = new Category({ name, products });
    await newCategory.save();

    res.status(201).json({
      data: formattedObject(newCategory),
      message: "Category created successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to create category",
      status: "fail",
    });
  }
};

// MongoDB: Update a category
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, products } = req.body;

    // Validate product IDs
    if (products) {
      const validProducts = await Product.find({ _id: { $in: products } });
      if (validProducts.length !== products.length) {
        return res.status(400).json({
          data: null,
          message: "Invalid product IDs provided",
          status: "fail",
        });
      }
    }

    const updatingCategory = await Category.findByIdAndUpdate(
      id,
      { name, products },
      {
        new: true,
        runValidators: true,
      }
    ).populate("products", "name price");

    if (!updatingCategory) {
      return res.status(404).json({
        data: null,
        message: "Category not found",
        status: "fail",
      });
    }

    res.status(200).json({
      data: formattedObject(updatingCategory),
      message: "Category updated successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: "fail",
    });
  }
};

// MongoDB: Delete a category
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const deletingCategory = await Category.findByIdAndDelete(id);

    if (!deletingCategory) {
      return res.status(404).json({
        data: null,
        message: "Category not found",
        status: "fail",
      });
    }

    // Remove the deleted category from related products
    await Product.updateMany(
      { category: id },
      { $unset: { category: "" } } // Removes the category field from products
    );

    res.status(200).json({
      data: formattedObject(deletingCategory),
      message: "Category deleted successfully and products updated",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: "fail",
    });
  }
};

module.exports = { getAll, getOne, post, update, deleteOne };
