const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email tidak ditemukan" });

    const passwordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );
    if (!passwordValid)
      return res.status(401).json({ message: "Password salah" });

    const { password, ...user_data } = user._doc;

    // JWT
    const maxAge = 3 * 24 * 60 * 60;
    const createJwt = (payload) => {
      return jwt.sign(
        { payload },
        "0e1e3ac528da43f9fe53441e49344692d4e068ac7f10fd2fdded47740fb770a8",
        {
          expiresIn: maxAge,
        }
      );
    };
    const token = createJwt(user._id, maxAge);
    res.cookie("auth", token, {
      maxAge: maxAge * 10,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Akun berhasil login", data: user_data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGOUT USER
const logout = async (req, res) => {
  res.clearCookie("auth");
  return res.status(200).json({ message: "Akun terlogout" });
};

// AUTH USER
const authUser = async (req, res) => {
  const token = req.cookies.auth;
  const _id = jwt.verify(
    token,
    "0e1e3ac528da43f9fe53441e49344692d4e068ac7f10fd2fdded47740fb770a8"
  ).payload;

  try {
    const response = await User.findOne(
      { _id },
      { username: 1, email: 1, registrationDate: 1 }
    );

    const user = response;
    return res
      .status(200)
      .json({ message: `Hello ${user.username}`, data: user });
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
};
module.exports = { register, login, logout, authUser };
