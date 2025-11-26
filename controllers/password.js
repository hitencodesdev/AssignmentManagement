const nodemailer=require("nodemailer")
const shortid=require("shortid")
const user=require('../models/Users')
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"hitengarg918@gmail.com",
        pass:"uxcg waax idpv gnyz"
    }
})


exports.forgotPassword=(req,res)=>
{
   res.render('forgotPassword')
}

exports.resetPassword=async(req,res)=>
{
    let {email}=req.body
    let tempPass=shortid()
    let mail={
        from:"hitengarg918@gmail.com",
        to:email,
        subject:"Your new Password",
        text:`Your temperorary Password is ${tempPass}`,
    }
    await user.findOneAndUpdate({email:email},{password:tempPass})
    transport.sendMail(mail,(err,data)=>
    {
        if(err)
            console.log("email not sent")
        else
        {
            res.send("Email send succesffully")
        }
    })
}

exports.changePassword=(req,res)=>
{
    let {resetPassword}=req.body
  console.log()
}