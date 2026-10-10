const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "admin access required" });
  }
  next();
};

module.exports = { isAdmin };
