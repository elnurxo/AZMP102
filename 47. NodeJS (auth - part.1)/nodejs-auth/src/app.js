const express = require("express");
const path = require("path");
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const multerErrorHandling = require("./middlewares/multerErrorHandling");
const userRouter = require("./routes/userRoutes");
const app = express();

// Middleware configuration
const configureMiddleware = () => {
  app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // app.use(authMiddleware);
};

// Route configuration
const configureRoutes = () => {
  // Default route
  app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
  });

  // Products routes
  app.use("/api/products", productRouter);

  app.use("/api/users", userRouter);

  // Categories routes
  app.use("/api/categories", categoryRouter);

  app.use(multerErrorHandling);
};

const configureApp = () => {
  configureMiddleware();
  configureRoutes();
};

module.exports = { app, configureApp };
