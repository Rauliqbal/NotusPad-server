const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validate = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    const _id = jwt.verify(
      token,
      "0e1e3ac528da43f9fe53441e49344692d4e068ac7f10fd2fdded47740fb770a8"
    ).payload;
    const user = await User.findOne({ _id });
    const { password, ...data } = user._doc;

    req.user = data;
    next();
  } catch (error) {
    res.status(501).json({ message: "unauthorized" });
  }
};

module.exports = validate;
