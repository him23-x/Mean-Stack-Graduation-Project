const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user.controller");
const { isAdmin } = require("../middlewares/isadmin.middleware");

router.get("/profile", usercontroller.getprofile);
router.patch("/profile", usercontroller.updateprofile);

router.get("/", isAdmin, usercontroller.getallusers);
router.patch("/:id/role", isAdmin, usercontroller.updateuserrole);

module.exports = router;
