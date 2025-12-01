const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
    uploadAssignment,
    getAllAssignments,
    assign,
    submitAssignment,
    viewDetails,
    submitForReview
} = require("../controllers/assignment");

const studentAuth=require("../middleware/studentAuth")

router.post("/uploadAssignments",upload.single("file"), uploadAssignment);
router.get("/allAssignments",studentAuth(),getAllAssignments);
router.get("/uploadAssignments",studentAuth(),assign)
router.get('/submitAssignment/:id',studentAuth(),submitAssignment)
router.get('/viewDetails/:id',studentAuth(),viewDetails)
router.post("/submitForReview/:id",studentAuth(),submitForReview)
module.exports = router;
