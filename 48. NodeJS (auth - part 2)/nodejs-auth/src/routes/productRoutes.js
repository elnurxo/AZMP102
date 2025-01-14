const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  deleteOne,
  post,
  update,
} = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const productCreateSchema = require("../validations/productCreateSchema");
const { productUpload } = require("../middlewares/multerConfig");
const productUpdateSchema = require("../validations/productUpdateSchema");

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteOne);
router.post(
  "/",
  productUpload.single("image"),
  validateProduct(productCreateSchema),
  post
);
router.patch(
  "/:id",
  productUpload.single("image"),
  validateProduct(productUpdateSchema),
  update
);

module.exports = router;
