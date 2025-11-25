const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getDepartments,
    addDepartment,
    deleteDepartment,
    editDepartment,
    updateDepartment
} = require("../controllers/department");

router.get("/list", auth(), getDepartments);
router.post("/add", auth(), addDepartment);
router.get("/delete/:id", auth(), deleteDepartment);
router.get("/edit/:id", auth(), editDepartment);
router.post("/update/:id", auth(), updateDepartment);

module.exports = router;
