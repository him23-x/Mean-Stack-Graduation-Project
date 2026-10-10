const Course = require("../models/course.model");

const getallcourses = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.search) {
      const regex = new RegExp(req.query.search, "i");
      filter.$or = [{ title: regex }, { instructor: regex }];
    }
    if (req.query.category) {
      filter.category = new RegExp(req.query.category, "i");
    }
    const courses = await Course.find(filter);
    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
};

const getcoursebyid = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ msg: "course not found" });
    }
  } catch (err) {
    next(err);
  }
};

const createcourse = async (req, res, next) => {
  try {
    const { title, description, instructor, category, credits, seats } = req.body;
    const newcourse = await Course.create({ title, description, instructor, category, credits, seats });
    res.status(201).json({ msg: "course created", newcourse });
  } catch (err) {
    next(err);
  }
};

const fullupdatecourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor,
        category: req.body.category,
        credits: req.body.credits,
        seats: req.body.seats,
      },
      { new: true, runValidators: true },
    );
    if (course) {
      res.status(200).json({ msg: "course updated", course });
    } else {
      res.status(404).json({ msg: "course not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deletecourse = async (req, res, next) => {
  try {
    const result = await Course.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ msg: "course deleted" });
    } else {
      res.status(404).json({ msg: "course not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getallcourses,
  getcoursebyid,
  createcourse,
  fullupdatecourse,
  deletecourse,
};
