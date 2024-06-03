const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authLogin = (req, res, next) => {
  const token = req.cookies.auth;
  if (token) {
    try {
      const _id = jwt.verify(token, process.env.NODE_TOKEN).payload;
      User.findOne({ _id })
        .then(next())
        .catch((error) => {
          console.log(error);
          return res.status(401).json({ message: "unauthorized" });
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "token kadaluarsa", error });
    }
  } else {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = authLogin;
