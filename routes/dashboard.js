const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    userDashboard,
    adminDashboard,
    professorDashboard
} = require("../controllers/dashboard");

router.get("/user", userDashboard);
router.get("/admin", auth(), adminDashboard);
router.get('/professor',professorDashboard)
module.exports = router;
