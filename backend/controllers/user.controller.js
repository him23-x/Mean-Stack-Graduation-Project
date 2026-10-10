const User = require("../models/user.model");

const getprofile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getallusers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const updateuserrole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ msg: "role is required" });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ msg: "you cannot change your own role" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json({ msg: "role updated", user });
  } catch (err) {
    next(err);
  }
};

const updateprofile = async (req, res, next) => {
  try {
    const existing = await User.findById(req.user.id).select("+password");
    if (!existing) {
      return res.status(404).json({ msg: "user not found" });
    }

    const { name, email, password } = req.body;
    if (name) existing.name = name;
    if (email) existing.email = email;
    if (password) existing.password = password;

    await existing.save();
    res.status(200).json({ msg: "profile updated", user: existing });
  } catch (err) {
    next(err);
  }
};

module.exports = { getprofile, updateprofile, getallusers, updateuserrole };
