const express = require("express");
const { register, login, authUser } = require("../controllers/user.controller");
const verifyToken = require("../middleware/authentication");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, authUser);

module.exports = router;
