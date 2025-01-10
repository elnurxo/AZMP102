const Category = require("../models/category");
const formattedObject = require("../utils/formatObject");

//Mongo DB +
const getAll = async (req, res) => {
  const { search } = req.query;

  let filteredCategories = await Category.find({
    name: { $regex: search || "", $options: "i" },
  });

  if (filteredCategories.length === 0) {
    res.status(404).json({
      data: [],
      message: "No categories found",
      status: "fail",
    });
  } else {
    res.status(200).json({
      data: filteredCategories.map(formattedObject),
      message: "Categories retrieved successfully",
      status: "success",
    });
  }
};

//Mongo DB +
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate(
      "products", "name price"
    );

    if (category) {
      res.status(200).json({
        data: formattedObject(category),
        message: "Category retrieved successfully",
        status: "success",
      });
    } else {
      res.status(404).json({
        data: {},
        message: "Category not found",
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
    const deletingCategory = await Category.findByIdAndDelete(id);

    if (!deletingCategory) {
      res.status(404).json({
        data: null,
        message: "Category not found",
        status: "fail",
      });
    } else {
      res.status(200).json({
        data: formattedObject(deletingCategory),
        message: "Category deleted successfully",
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
    const { name } = req.body;

    //save to MongoDB
    const checkDuplicate = await Category.isDuplicateCategory(name);
    if (checkDuplicate) {
      return res.json({
        data: null,
        message: "Category already exists!",
        status: "fail",
      });
    }

    const newCategory = new Category({ name: name });
    await newCategory.save();

    res.json({
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

//Mongo DB+ (update / patch request)
const update = async (req, res) => {
  try {
    const { id } = req.params;

    //remove old image from cloudinary
    const updatingCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatingCategory) {
      return res.status(404).json({
        data: null,
        message: "Category not found",
        status: "fail",
      });
    } else {
      res.status(200).json({
        data: formattedObject(updatingCategory),
        message: "Category updated successfully",
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
