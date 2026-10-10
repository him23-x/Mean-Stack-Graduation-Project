const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config.env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authroute = require("./routes/auth.route");
const userroute = require("./routes/user.route");
const courseroute = require("./routes/course.route");
const enrollmentroute = require("./routes/enrollment.route");
const errorhandler = require("./middlewares/error.middleware");
const { verifyjwt } = require("./middlewares/verifytoken.middleware");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/student_course_management";

app.use(cors());
app.use(express.json());
app.use("/auth", authroute);
app.use("/users", verifyjwt, userroute);
app.use("/courses", verifyjwt, courseroute);
app.use("/enrollments", verifyjwt, enrollmentroute);
app.use(errorhandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, "127.0.0.1", () => {
  console.log(`app listen on port ${PORT}`);
});
