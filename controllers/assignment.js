const assignment = require("../models/Assignment");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const user=require("../models/Users")
const department=require("../models/Department")
const cloudinary = require("../config/cloudnairy"); 
const upload = require("../config/multer");
require("dotenv").config()
const key = process.env.KEY;


exports.assign=(req,res)=>
{
    res.render("uploadAssignment")
}

exports.uploadAssignment = async (req, res) => {
    try {
        let path = req.file.path
        let {title,description,category}=req.body
        const uploadResults = await cloudinary.uploader.upload(path, {
            resource_type: "raw",
            format:"pdf"
        })
        let token=req.cookies.token
        jwt.verify(token,key,async (err,decode)=>
        {
            if(err)
                res.send("error")
            else
            {
                await assignment.create({
                    id:shortid(),
                    studentId:decode.id,
                    title:title,
                    description:description,
                    category:category,
                    status:"Draft",
                    fileName:uploadResults.secure_url,
                    submittedBy:decode.name
                })
                console.log(uploadResults)
                return res.redirect("/assignments/uploadAssignments");
            }
        })

    } catch (err) {
        res.send("error")
    }
};

exports.getAllAssignments = async (req, res) => {
    let token = req.cookies.token;

    jwt.verify(token, key, async (err, decode) => {
        if (err) return res.send(err);

        let data = await assignment.find({ studentId: decode.id });
        let prof=await user.find({dept:decode.dept,role:"professor"})
        res.render("allAssignment", { data:data,prof:prof });
    });
};


exports.submitAssignment=async (req,res)=>
{
     try {
        let {id}=req.params
        let prof=req.body
        await assignment.findByIdAndUpdate({_id:id},{status:"submitted",submittedTo:prof})
        res.redirect('/dashboard/user')
     } catch (error) {
        res.send("error")
     }
}

exports.viewDetails=async(req,res)=>
{
    try {
        let id=req.params.id
        let data=await assignment.findById({_id:id})
        res.render("viewDetails",{data:data})
    } catch (error) {
        
    }
}

exports.submitForReview=async(req,res)=>
{
    try {
        let {professor}=req.body;
        let {id}=req.params
        console.log(professor,id)
        await assignment.findByIdAndUpdate({_id:id},{submittedTo:professor,status:"Submitted"})
        res.redirect("/assignments/allAssignments")

    } catch (error) {
        res.send("error")
    }
}