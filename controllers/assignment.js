const assignment = require("../models/Assignment");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const user=require("../models/Users")
const department=require("../models/Department")
const cloudinary = require("../config/cloudnairy"); 
const streamifier = require("streamifier");
const upload = require("../config/multer");
const key = "&$^@&#*!";


exports.assign=(req,res)=>
{
    res.render("uploadAssignment")
}

exports.uploadAssignment = async (req, res) => {
    try {

        // Extract token
        // const token = req.cookies.token;

        // Verify JWT
        // let decoded;
        // try {
        //     decoded = jwt.verify(token, key); // <-- YOUR JWT SECRET HERE
        // } catch (err) {
        //     return res.status(401).send("Invalid token");
        // }

        // Extract form fields
        // const { title, description, category } = req.body;
        let path = req.file.path
        console.log(path)
        const uploadResults = await cloudinary.uploader.upload(path, {
            resource_type: "raw"
        })
        .catch(err=> console.log(err.message))

        console.log(uploadResults)

        // Store actual Cloudinary URLs
        // const fileUrls = uploadResults.map((file) => file.secure_url);

        // Save assignment in MongoDB
        // await assignment.create({
        //     id: shortid(),
        //     studentId: decoded.id,
        //     title,
        //     description,
        //     category,
        //     status: "Draft",
        //     fileName: uploadResults.secure_url // <-- now full secure URLs
        // });

        return res.redirect("/assignments/uploadAssignments");

    } catch (err) {
        console.error("UPLOAD ASSIGNMENT ERROR:", err);
        return res.status(500).json({
            success: false,
            error: err.message
        });
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