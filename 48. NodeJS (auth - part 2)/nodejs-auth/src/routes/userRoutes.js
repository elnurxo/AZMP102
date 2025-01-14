const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  register,
  login,
  resetPassword,
  verifyAccount,
  forgotPassword,
  updateUserInfo,
  deleteAccount,
  freezeAccount,
  unfreezeAccount,
  banAccount,
  unBanAccount,
  updatePassword,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

//RBAC - Role Based Access Control
router.get("/", verifyToken, verifyRoles("admin", "user"), getAll);

router.get("/:id", verifyToken, getOne);

router.post("/register", register);

router.post("/login", login);

router.get("/verify/:token", verifyAccount);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", verifyToken, resetPassword);

router.put("/update-info/:id", verifyToken, updateUserInfo);

router.delete("/delete-account/:id", verifyToken, deleteAccount);

router.put(
  "/freeze-account/:id",
  verifyToken,
  verifyRoles("user"),
  freezeAccount
);

router.put(
  "/unfreeze-account/:id",
  verifyToken,
  verifyRoles("user"),
  unfreezeAccount
);

router.put("/ban-account/:id", verifyToken, verifyRoles("admin"), banAccount);

router.put(
  "/unban-account/:id",
  verifyToken,
  verifyRoles("admin"),
  unBanAccount
);

router.put("/update-password/:id", verifyToken, updatePassword);


module.exports = router;
