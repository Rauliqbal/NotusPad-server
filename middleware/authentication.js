const accessToken = require("../config/accessToken");
const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthenticated." });

  // Verify token
  jwt.verify(token, accessToken, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

module.exports = authToken;
