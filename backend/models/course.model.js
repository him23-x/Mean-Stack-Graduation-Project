const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: [3, "title must be at least 3 characters"],
    },
    description: { type: String },
    instructor: { type: String, required: [true, "instructor is required"] },
    category: { type: String },
    credits: { type: Number, default: 3 },
    seats: { type: Number, default: 30 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
