const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET || "xxxxx";

const generateToken = (payload) => {
  return jwt.sign(payload, key, { expiresIn: "1d" });
};

module.exports = { generateToken };
