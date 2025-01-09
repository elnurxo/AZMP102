const { v4: uuidv4 } = require("uuid");
const extractPublicId = require("../utils/extractPublicId");
const { cloudinary } = require("../config/cloudinary");
//Product Model MongoDB
const Product = require("../models/products");
const formattedProduct = require("../utils/formatProduct");

//Mongo DB +
const getAll = async (req, res) => {
  const { search, sort, page = 1, size = 2 } = req.query;

  const [sortKey, sortOrder] = sort ? sort.split("-") : [];

  let filteredProducts = await Product.find({
    $or: [
      { name: { $regex: search || "", $options: "i" } },
      { description: { $regex: search || "", $options: "i" } },
    ],
  })
    .sort({ [sortKey]: sortOrder === "asc" ? 1 : -1 })
    .limit(size)
    .skip(size * (page - 1));

  const totalCount = await Product.countDocuments();

  if (filteredProducts.length === 0) {
    res.status(404).json({
      data: [],
      message: "No products found",
      status: "fail",
    });
  } else {
    res.status(200).json({
      total: totalCount,
      pageCount: Math.ceil(totalCount / size),
      currentPage: page,
      data: filteredProducts.map(formattedProduct),
      message: "Products retrieved successfully",
      status: "success",
    });
  }
};

const getOne = (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);

  if (product) {
    res.status(200).json({
      data: product,
      message: "Product retrieved successfully",
      status: "success",
    });
  } else {
    res.status(404).json({
      data: null,
      message: "Product not found",
      status: "fail",
    });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const productIdx = products.findIndex((product) => product.id === id);

  if (productIdx === -1) {
    res.status(404).json({
      data: null,
      message: "Product not found",
      status: "fail",
    });
  } else {
    //file remove from cloudinary
    const publicId = extractPublicId(products, id);
    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(
      `uploads/${publicId}`,
      (error, result) => {
        if (error) {
          throw new Error("Failed to delete image from Cloudinary");
        }
      }
    );

    //removing data from array
    products.splice(productIdx, 1);
    res.status(200).json({
      data: null,
      message: "Product deleted successfully",
      status: "success",
    });
  }
};

//done with Mongo DB
const post = async (req, res) => {
  try {
    const { name, description, battery, price } = req.body;

    //save to MongoDB
    const newProduct = new Product({
      name,
      description,
      battery,
      price,
      image: req.file.path, //cloudinary file path
    });
    await newProduct.save();

    res.json({
      data: formattedProduct(newProduct),
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

const update = (req, res) => {
  const { id } = req.params;
  const { name, description, battery, price } = req.body;
  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      data: null,
      message: "Product not found",
      status: "fail",
    });
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.battery = battery || product.battery;
  product.price = price || product.price;

  res.status(200).json({
    data: product,
    message: "Product updated successfully",
    status: "success",
  });
};

module.exports = { getAll, getOne, deleteOne, post, update };
