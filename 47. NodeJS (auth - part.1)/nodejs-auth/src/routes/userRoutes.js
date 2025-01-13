const express = require("express");
const router = express.Router();

const {
  getAll,
  register,
  login,
  verifyAccount,
  getOne,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

//RBAC - Role Based Access Control
router.get("/", verifyToken, verifyRoles("admin", "user"), getAll);

router.get("/:id", getOne);

router.post("/register", register);

router.post("/login", login);

router.get("/verify/:id", verifyAccount);

module.exports = router;
