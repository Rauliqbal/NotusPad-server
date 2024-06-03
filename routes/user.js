const express = require("express");
const {
  register,
  login,
  logout,
  authUser,
} = require("../controllers/user.controller");
const authLogin = require("../middleware/authentication");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", authLogin, authUser);

module.exports = router;
