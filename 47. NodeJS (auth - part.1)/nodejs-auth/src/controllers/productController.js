const extractPublicId = require("../utils/extractPublicId");
const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/products");
const formattedObject = require("../utils/formatObject");
const Category = require("../models/category");

// MongoDB: Get all products
const getAll = async (req, res) => {
  const { search, sort, page = 1, size } = req.query;

  const [sortKey, sortOrder] = sort ? sort.split("-") : [];

  const totalCount = await Product.countDocuments();

  let filteredProducts = await Product.find({
    $or: [
      { name: { $regex: search || "", $options: "i" } },
      { description: { $regex: search || "", $options: "i" } },
    ],
  })
    .sort({ [sortKey]: sortOrder === "asc" ? 1 : -1 })
    .limit(size ? size : totalCount)
    .skip(size ? size * (page - 1) : 0)
    .populate("category", "name");

  if (filteredProducts.length === 0) {
    res.status(404).json({
      data: [],
      message: "No products found",
      status: "fail",
    });
  } else {
    res.status(200).json({
      total: totalCount,
      pageCount: size ? Math.ceil(totalCount / size) : 1,
      currentPage: page,
      data: filteredProducts.map(formattedObject),
      message: "Products retrieved successfully",
      status: "success",
    });
  }
};

// MongoDB: Get a single product
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name");

    if (product) {
      res.status(200).json({
        data: formattedObject(product),
        message: "Product retrieved successfully",
        status: "success",
      });
    } else {
      res.status(404).json({
        data: {},
        message: "Product not found",
        status: "fail",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: {},
      message: error.message,
      status: "fail",
    });
  }
};

// MongoDB: Delete a product
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletingProduct = await Product.findByIdAndDelete(id);

    if (!deletingProduct) {
      return res.status(404).json({
        data: null,
        message: "Product not found",
        status: "fail",
      });
    }

    // Remove product reference from its category
    if (deletingProduct.category) {
      await Category.findByIdAndUpdate(deletingProduct.category, {
        $pull: { products: id },
      });
    }

    // Remove product image from Cloudinary
    const publicId = extractPublicId(deletingProduct);
    await cloudinary.uploader.destroy(`uploads/${publicId}`, (error) => {
      if (error) throw new Error("Failed to delete image from Cloudinary");
    });

    res.status(200).json({
      data: formattedObject(deletingProduct),
      message: "Product deleted successfully",
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

// MongoDB: Create a new product
const post = async (req, res) => {
  try {
    const { name, description, battery, price, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      battery,
      price,
      category,
      image: req.file.path,
    });
    await newProduct.save();

    // Add product reference to category
    if (category) {
      await Category.findByIdAndUpdate(category, {
        $push: { products: newProduct._id },
      });
    }

    res.json({
      data: formattedObject(newProduct),
      message: "Product created successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to create product",
      status: "fail",
    });
  }
};

// MongoDB: Update a product
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { category: newCategory } = req.body;

    const sentProduct = {
      ...req.body,
    };

    if (req.file) {
      sentProduct.image = req.file.path; // Cloudinary path
    }

    // Fetch the previous product
    const prevProd = await Product.findById(id);

    if (!prevProd) {
      return res.status(404).json({
        data: null,
        message: "Product not found",
        status: "fail",
      });
    }

    // Update product
    const updatingProduct = await Product.findByIdAndUpdate(id, sentProduct, {
      new: true,
      runValidators: true,
    });

    // Manage category association
    if (prevProd.category && prevProd.category.toString() !== newCategory) {
      await Category.findByIdAndUpdate(prevProd.category, {
        $pull: { products: id },
      });
    }
    if (newCategory && prevProd.category?.toString() !== newCategory) {
      await Category.findByIdAndUpdate(newCategory, {
        $push: { products: id },
      });
    }

    // Remove the old image from Cloudinary
    if (req.file) {
      const publicId = extractPublicId(prevProd);
      await cloudinary.uploader.destroy(`uploads/${publicId}`, (error) => {
        if (error) throw new Error("Failed to delete image from Cloudinary");
      });
    }

    res.status(200).json({
      data: formattedObject(updatingProduct),
      message: "Product updated successfully",
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

module.exports = { getAll, getOne, deleteOne, post, update };
