const errorhandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((fieldError) => fieldError.message);
    return res.status(400).json({ msg: messages.join(", ") });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ msg: `${field} already in use` });
  }

  const status = err.status || 500;
  res.status(status).json({ msg: err.message || "Internal server error" });
};

module.exports = errorhandler;
