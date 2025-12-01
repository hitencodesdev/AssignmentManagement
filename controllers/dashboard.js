const assignment = require("../models/Assignment");
const department = require("../models/Department");
const user = require("../models/Users");
const jwt = require("jsonwebtoken");
const ObjectId = require("bson").ObjectId;

const key = process.env.KEY;

exports.userDashboard = async (req, res) => {
    let token = req.cookies.token;

    jwt.verify(token, key, async (err, decode) => {
        if (err) return res.send("Invalid Token");

        let data = await assignment.find({});
        let valid = data.filter(a => new ObjectId(a.studentId).equals(decode.id));
        

        let submit=valid.filter(u=>u.status==="submit").length;
        let draft=valid.filter(u=>u.status==="Draft").length;
        let reject=valid.filter(u=>u.status==="reject").length;
        let approve=valid.filter(u=>u.status==="approve").length;

        res.render("userDashBoard", { valid ,submit,reject,draft,approve});
    });
};

exports.adminDashboard = async (req, res) => {
    try {
        let deps = await department.find();
        let usersList = await user.find();

        let student = usersList.filter(u => u.role === "student").length;
        let hod = usersList.filter(u => u.role === "HOD").length;
        let prof = usersList.filter(u => u.role === "professor").length;

        res.render("adminDashboard", { data: deps, student, hod, prof });
    } catch (error) {
        res.send("error");
    }
};

exports.professorDashboard=async(req,res)=>
{
    try {
        res.render('professorDashboard')
    } catch (error) {
        res.send("error")
    }
}
