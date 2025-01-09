const express = require("express");

const router = express.Router();
const {
  getAll,
  getOne,
  deleteOne,
  post,
  update,
} = require("../controllers/sliderController");
const { sliderUpload } = require("../middlewares/multerConfig");

router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteOne);
router.post("/", sliderUpload.single("image"), post);
router.patch("/:id", update);

module.exports = router;
