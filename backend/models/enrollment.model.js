const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "userId is required"] },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: [true, "courseId is required"] },
  },
  { timestamps: true },
);

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
