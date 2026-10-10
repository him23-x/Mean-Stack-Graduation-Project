const jwt = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET || "xxxxx";

const verifyjwt = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "no token provided, please login" });
  }

  try {
    const payload = jwt.verify(token, secretkey);
    req.user = payload;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "token expired, please login again" });
    }

    return res.status(401).json({ msg: "invalid token" });
  }
};

module.exports = { verifyjwt };
