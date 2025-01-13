const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  deleteOne,
  post,
  update,
} = require("../controllers/categoryController");
const validateCategory = require("../middlewares/categoryValidator");

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteOne);
router.post("/", validateCategory, post);
router.patch("/:id", validateCategory, update);

module.exports = router;
