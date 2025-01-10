const extractPublicId = require("../utils/extractPublicId");
const { cloudinary } = require("../config/cloudinary");
//Product Model MongoDB
const Product = require("../models/products");
const formattedObject = require("../utils/formatObject");
const Category = require("../models/category");

//Mongo DB +
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
    .skip(size ? size * (page - 1) : 0);

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

//Mongo DB +
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

//Mongo DB +
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletingProduct = await Product.findByIdAndDelete(id);

    if (!deletingProduct) {
      res.status(404).json({
        data: null,
        message: "Product not found",
        status: "fail",
      });
    } else {
      //file remove from cloudinary
      const publicId = extractPublicId(deletingProduct);
      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(
        `uploads/${publicId}`,
        (error, result) => {
          if (error) {
            throw new Error("Failed to delete image from Cloudinary");
          }
        }
      );

      res.status(200).json({
        data: formattedObject(deletingProduct),
        message: "Product deleted successfully",
        status: "success",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: "fail",
    });
  }
};

//Mongo DB +
const post = async (req, res) => {
  try {
    const { name, description, battery, price, category } = req.body;

    //save to MongoDB
    const newProduct = new Product({
      name,
      description,
      battery,
      price,
      category,
      image: req.file.path, //cloudinary file path
    });
    await newProduct.save();

    //category - product (update)
    await Category.findByIdAndUpdate(category, {
      $push: { products: newProduct._id },
    });

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

//Mongo DB+ (update / patch request)
const update = async (req, res) => {
  try {
    const { id } = req.params;

    const sentProduct = {
      ...req.body,
    };
    if (sentProduct.image && req.file) {
      sentProduct.image = req.file.path; //cloudinary patH
    }

    //remove old image from cloudinary
    const prevProd = await Product.findById(id);
    const updatingProduct = await Product.findByIdAndUpdate(id, sentProduct, {
      new: true,
      runValidators: true,
    });

    if (!updatingProduct) {
      return res.status(404).json({
        data: null,
        message: "Product not found",
        status: "fail",
      });
    } else {
      const publicId = extractPublicId(prevProd);
      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(
        `uploads/${publicId}`,
        (error, result) => {
          if (error) {
            throw new Error("Failed to delete image from Cloudinary");
          }
        }
      );
      res.status(200).json({
        data: formattedObject(updatingProduct),
        message: "Product updated successfully",
        status: "success",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: "fail",
    });
  }
};

module.exports = { getAll, getOne, deleteOne, post, update };
