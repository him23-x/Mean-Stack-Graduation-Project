const express = require("express");
const router = express.Router();
const enrollmentcontroller = require("../controllers/enrollment.controller");

router.get("/my", enrollmentcontroller.getmyenrollments);
router.post("/", enrollmentcontroller.createenrollment);
router.delete("/:id", enrollmentcontroller.cancelenrollment);

module.exports = router;
