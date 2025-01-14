const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
} = require("../controllers/movieController");
const {body} = require('express-validator');

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", post);

router.patch("/:id", update);

router.delete("/:id", deleteOne);

module.exports = router;
