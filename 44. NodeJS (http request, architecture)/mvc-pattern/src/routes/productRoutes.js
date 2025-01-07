const express = require("express");
const validateProduct = require("../middlewares/validateProduct");

const router = express.Router();
const {
  getAll,
  getOne,
  deleteOne,
  post,
  update,
} = require("../controllers/productController");

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteOne);
router.post("/", validateProduct, post);
router.patch("/:id", update);

module.exports = router;
