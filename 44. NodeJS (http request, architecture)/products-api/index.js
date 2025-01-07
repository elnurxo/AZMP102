const express = require("express");
const products = require("./data/products");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const validateProduct = require("./middlewares/validateProduct");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//custom middleware (global middleware)
const isAuth = true;
app.use((req, res, next) => {
  if (isAuth) {
    next();
  } else {
    res.status(403).send({
      message: "Unauthorized",
    });
  }
});

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//PRODUCTS CRUD -> Create, Read, Update, Delete

//get all products - search, sort, pagination
app.get("/products", (req, res) => {
  const { search, sort, page = 1, size } = req.query;
  let filteredProducts = [...products];
  //pagination
  const [sortKey, sortOrder] = sort ? sort.split("-") : [];

  if (products.length === 0) {
    res.status(404).json({
      data: [],
      message: "No products found",
      status: "fail",
    });
  } else {
    //filter products by search query
    if (search) {
      const searchQuery = search.toLowerCase();
      filteredProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
        );
      });
    }
    //sort products by sort query
    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        } else if (sortOrder === "desc") {
          return a[sortKey] < b[sortKey] ? 1 : -1;
        }
      });
    }

    //pagination
    const pageNumber = Number(page) || 1;
    const pageSize = size ? Number(size) : products.length;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;
    filteredProducts = filteredProducts.slice(startIndex, endIndex);

    res.status(200).json({
      total: products.length,
      pageCount: Math.ceil(products.length / pageSize),
      currentPage: pageNumber,
      hasNext: endIndex < products.length,
      hasPrev: startIndex > 0,
      data: filteredProducts,
      message: "Products retrieved successfully",
      status: "success",
    });
  }
});

//single product
app.get("/products/:id", (req, res) => {
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
});

//delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productIdx = products.findIndex((product) => product.id === id);

  if (productIdx === -1) {
    res.status(404).json({
      data: null,
      message: "Product not found",
      status: "fail",
    });
  } else {
    products.splice(productIdx, 1);
    res.status(200).json({
      data: null,
      message: "Product deleted successfully",
      status: "success",
    });
  }
});

//create product - validation
app.post("/products", validateProduct, (req, res) => {
  const { name, description, battery, price } = req.body;

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    battery,
    price,
  };
  products.push(newProduct);
  res.json({
    data: newProduct,
    message: "Product created successfully",
    status: "success",
  });
});

//update product
app.patch("/products/:id", (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
