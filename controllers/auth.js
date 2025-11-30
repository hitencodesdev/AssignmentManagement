const admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const key = process.env.KEY;

exports.registerAdmin = async (req, res) => {
    try {
        let {name,email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        await admin.create({ name,email, password: hashPassword });
        res.redirect("/auth/login");
    } catch (error) {
        res.send(error);
    }
};

exports.professorAuth=(req,res)=>
{
  let token=req.cookies.token;
  jwt.verify(token,key,(err,decode)=>
{
    if(decode.role=="professor")
        next();
    else
        res.send("You are do not have the access for this route")
})
}
