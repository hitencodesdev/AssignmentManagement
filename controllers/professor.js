const assignment=require('../models/Assignment')
const key=process.env.KEY
const jwt=require("jsonwebtoken")
const {ObjectId}=require('bson')


exports.getAssignment=async(req,res)=>
{
   try {
    let token=req.cookies.token
    jwt.verify(token,key,async(err,decode)=>
    {
        if(err)
            res.send("error")
        else
        {
            let data=await assignment.find({submittedTo:decode.id})
            console.log(data)
            res.render('professorAssignment',{data:data})
        }
    })
   } catch (error) {
       res.send("error")
   }    
}

exports.reviewAssignment=async(req,res)=>
{
    try {
        let {id}=req.params
        let data=await assignment.findOne({id:id})
        res.render('reviewAssignment',{data:data})
    } catch (error) {
        res.send("error")
    }
}

exports.decision=async(req,res)=>
{
    try {
        let {decision}=req.query
        let {id}=req.params
        await assignment.findOneAndUpdate({id:id},{status:decision})
        res.redirect('/dashboard/professor')
    } catch (error) {
        
    }
}