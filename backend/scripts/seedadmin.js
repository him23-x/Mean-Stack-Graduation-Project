const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "config.env") });

const mongoose = require("mongoose");
const User = require("../models/user.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/student_course_management";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function seedAdmin() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in config.env");
  }

  await mongoose.connect(MONGO_URI);

  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log(`Existing user ${ADMIN_EMAIL} promoted to admin`);
  } else {
    await User.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: "admin" });
    console.log(`Admin user ${ADMIN_EMAIL} created`);
  }

  await mongoose.disconnect();
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed to seed admin:", err.message);
    process.exit(1);
  });
