const express = require("express");
const router = express.Router();
const {
    getAssignment,
    reviewAssignment,
    decision
}=require("../controllers/professor")
const professorAuth=require('../middleware/professorAuth')

router.get('/assignmentsReview',professorAuth(),getAssignment)
router.get('/review/:id',professorAuth(),reviewAssignment)
router.get('/decision/:id',professorAuth(),decision)
module.exports=router  