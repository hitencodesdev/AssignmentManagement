const {forgotPassword,resetPassword}=require('../controllers/password')
const express=require("express")
const router=express.Router()

router.get('/forgotPassword',forgotPassword)
router.post('/resetPassword',resetPassword)
module.exports=router