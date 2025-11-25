const user = require("../models/Users");
const department = require("../models/Department");
const shortid = require("shortid");
const nodemailer=require("nodemailer")
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"hitengarg918@gmail.com",
        pass:"uxcg waax idpv gnyz"
    }
})

   
exports.addUser=async(req,res)=>
{
    try {
    let data=await department.find({})
    res.render('createUser',{data:data,password:shortid()})
    } catch (error) {
        res.send("error")
    }
    
}

exports.getUsers = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let skip = 10 * (page - 1);
        let data = await user.find().skip(skip).limit(10);

        res.render("users", { data, currPage: page });
    } catch (error) {
        res.send(error);
    }
};

exports.createUser = async (req, res) => {
    try {
        let { name, email, password, phone, dept, role } = req.body;
        await user.create({ name, email, password, dept, phone, role });
        await department.findOneAndUpdate({ name: dept }, { $inc: { users: 1 } });
        let mails={
            from: 'hitengarg918@gmail.com',
            to: email,
            subject: 'Welcome!!',
            text: `Your id is ${email} with password ${password}`
        }
        transport.sendMail(mails,(err,data)=>
        {
            if(err)
                console.log("email not sent")
            else
                console.log("email sent successfully")
        })
        res.redirect("/users/create");
    } catch (error) {
        res.send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id);
        res.redirect("/users/list");
    } catch (error) {
        res.send("error");
    }
};

exports.editUser = async (req, res) => {
    try {
        let data = await user.findById(req.params.id);
        let dept = await department.find({});
        res.render("updateUser", { data, dept });
    } catch (error) {
        res.send("error");
    }
};

exports.updateUser = async (req, res) => {
    try {
        let { name, email, password, phone, dept, role } = req.body;
        await user.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
            dept,
            phone,
            role,
        });

        res.redirect("/users/list");
    } catch (error) {
        res.send("error");
    }
};
