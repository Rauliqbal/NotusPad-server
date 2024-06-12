const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authLogin = (req, res, next) => {
  const token = req.cookies.auth;
  if (token) {
    try {
      const _id = jwt.verify(
        token,
        "0e1e3ac528da43f9fe53441e49344692d4e068ac7f10fd2fdded47740fb770a8"
      ).payload;
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
