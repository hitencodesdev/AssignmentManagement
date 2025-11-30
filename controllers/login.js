const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const admin=require('../models/Admin')
const user=require('../models/Users')

const key = process.env.KEY




const login=(req,res)=>
{
  res.render("Login")
}


const loginPost=async(req,res)=>
{
    try {
        let {email,password}=req.body
        const userAdmin=await admin.findOne({email:email})
        const regular=await user.findOne({email:email})
        
        if(userAdmin)
        {
            const isMatch=await bcrypt.compare(password,userAdmin.password)
            if(isMatch)
            {
              let token=jwt.sign({name:userAdmin.name,email:userAdmin.email,role:"admin"},key)
              res.cookie("token",token)
              res.redirect('/dashboard/admin')
            }
            else
            {
              res.redirect('/login')
            }
        }  
        else if(regular.role=='student')
        {
           let token=jwt.sign({id:regular._id,name:regular.name,email:regular.email,role:"user",dept:regular.dept},key)
           res.cookie("token",token)
           res.redirect('/dashboard/user')
        }   
        else
          if(regular.role=='professor')
            {
              let token=jwt.sign({id:regular._id,name:regular.name,email:regular.email,role:"professor",dept:regular.dept},key)
              res.cookie("token",token)
              res.redirect('/dashboard/professor')
            }    
        else
        {
            res.redirect('/login')
        }
    } catch (error) {
        res.send(error)
    }
}


module.exports={login,loginPost} 
