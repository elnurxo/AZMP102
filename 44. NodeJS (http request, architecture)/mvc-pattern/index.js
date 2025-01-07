const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const productRouter = require("./src/routes/productRoutes");
const authMiddleware = require("./src/middlewares/authMiddleware");
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());
app.use(authMiddleware);

//default route
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//products routes
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
