const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");

const getmyenrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id }).populate("courseId");
    res.status(200).json(enrollments);
  } catch (err) {
    next(err);
  }
};

const createenrollment = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      const error = new Error("courseId is required");
      error.status = 400;
      throw error;
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "course not found" });
    }

    const already = await Enrollment.findOne({ userId: req.user.id, courseId });
    if (already) {
      return res.status(400).json({ msg: "already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({ userId: req.user.id, courseId });
    res.status(201).json({ msg: "enrolled successfully", enrollment });
  } catch (err) {
    next(err);
  }
};

const cancelenrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ msg: "enrollment not found" });
    }

    if (enrollment.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "you are not allowed to cancel this enrollment" });
    }

    await enrollment.deleteOne();
    res.status(200).json({ msg: "enrollment cancelled" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getmyenrollments, createenrollment, cancelenrollment };
