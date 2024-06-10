const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validate = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    const _id = jwt.verify(token, process.env.NODE_TOKEN).payload;
    const user = await User.findOne({ _id });
    const { password, ...data } = user._doc;

    req.user = data;
    next();
  } catch (error) {
    res.status(501).json({ message: "unauthorized" });
  }
};

module.exports = validate;
