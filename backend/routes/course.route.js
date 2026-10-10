const express = require("express");
const router = express.Router();
const coursecontroller = require("../controllers/course.controller");
const { isAdmin } = require("../middlewares/isadmin.middleware");

router.get("/", coursecontroller.getallcourses);
router.get("/:id", coursecontroller.getcoursebyid);
router.post("/", isAdmin, coursecontroller.createcourse);
router.put("/:id", isAdmin, coursecontroller.fullupdatecourse);
router.delete("/:id", isAdmin, coursecontroller.deletecourse);

module.exports = router;
