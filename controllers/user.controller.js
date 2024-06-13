const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessToken = require("../config/accessToken");

// REGISTER USER
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    // VALIDATE
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({ message: "User telah digunakan" });

    // SAVED
    const savedUser = await newUser.save();
    res.status(200).json({
      message: "Akun berhasil dibuat",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER
const login = async (req, res) => {
  const { email } = req.body;
  try {
    // VALIDATE
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({ message: "Email tidak ditemukan" });

    const passwordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );
    if (!passwordValid)
      return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign({ id: user._id }, accessToken, {
      expiresIn: "1h",
    });

    const { password, ...user_data } = user._doc;

    res.status(200).json({
      message: "Akun berhasil login",
      data: user_data,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// AUTH USER
const authUser = async (req, res) => {
  const user = await User.findOne({
    _id: req.user.id,
  });
  if (!user) res.status(401).json({ message: "unauthorized" });

  const { password, ...user_data } = user._doc;

  return res
    .status(200)
    .json({ message: `Hello ${user.username}`, data: user_data });
};
module.exports = { register, login, authUser };
