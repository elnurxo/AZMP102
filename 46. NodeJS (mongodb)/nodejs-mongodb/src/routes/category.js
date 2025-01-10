const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  deleteOne,
  post,
  update,
} = require("../controllers/categoryController");

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteOne);
router.post("/", post);
router.patch("/:id", update);

module.exports = router;
