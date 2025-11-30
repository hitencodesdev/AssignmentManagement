const express = require("express");
const router = express.Router();
const {
    getAssignment,
    reviewAssignment,
    decision
}=require("../controllers/professor")

router.get('/assignmentsReview',getAssignment)
router.get('/review/:id',reviewAssignment)
router.get('/decision/:id',decision)
module.exports=router  