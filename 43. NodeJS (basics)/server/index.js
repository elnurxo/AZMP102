const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const products = require("./data/index.js");

// Serve static files (like HTML) more efficiently
app.use(express.static(path.join(__dirname, "views")));

// Basic endpoint
app.get("/", (_, res) => {
  res.redirect("/api");
});

// API endpoint - send the HTML page
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Products endpoint - get all products
app.get("/api/products", (req, res) => {
  const { name, sort } = req.query;

  if (products.length > 0) {
    if (name) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      res.status(200).json({
        message: "Filtered products",
        status: "success",
        code: 200,
        data: filteredProducts,
      });
    } else {
      res.status(200).json({
        message: "All products",
        data: products,
      });
    }

    if (sort) {
      if (sort === "asc") {
        const sortedProducts = products.sort((a, b) => a.price - b.price);
        res.status(200).json({
          message: "Sorted products",
          data: sortedProducts,
        });
      } else if (sort === "desc") {
        const sortedProducts = products.sort((a, b) => b.price - a.price);
        res.status(200).json({
          message: "Sorted products",
          data: sortedProducts,
        });
      } else {
        res.status(400).json({
          message: "Invalid sort query",
          data: [],
        });
      }
    } else {
      res.status(404).json({
        message: "No products found",
        name: name,
        data: [],
      });
    }
  }
});

// Product endpoint - get a single product
app.get("/api/products/:id", (req, res) => {
  console.log(req.params); // { id: '1' }
  console.log(req.body); //post request, update data

  if (req.params.id) {
    const product = products.find((product) => product.id === req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
        data: {},
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid request",
      data: {},
    });
  }
});

//POST request, DELETE request, PUT request, PATCH request

// 404 Error handling middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
