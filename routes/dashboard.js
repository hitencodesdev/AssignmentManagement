const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    userDashboard,
    adminDashboard
} = require("../controllers/dashboard");

router.get("/user", userDashboard);
router.get("/admin", auth(), adminDashboard);

module.exports = router;
