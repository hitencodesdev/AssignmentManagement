const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
    uploadAssignment,
    getAllAssignments,
    assign,
    submitAssignment,
    viewDetails
} = require("../controllers/assignment");

router.post("/uploadAssignments",upload.array("file", 5), uploadAssignment);
router.get("/allAssignments",getAllAssignments);
router.get("/uploadAssignments",assign)
router.get('/submitAssignment/:id',submitAssignment)
router.get('/viewDetails/:id',viewDetails)
module.exports = router;
