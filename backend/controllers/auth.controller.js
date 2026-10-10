const User = require("../models/user.model");
const { generateToken } = require("../utils/token");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    await user.save();

    const token = generateToken({ id: user._id, name: user.name, role: user.role });

    res.status(201).json({ msg: "Registered!", user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const token = generateToken({ id: user._id, name: user.name, role: user.role });

    res.status(200).json({ msg: "Logged in!", user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
