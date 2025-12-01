const jwt=require('jsonwebtoken')
require("dotenv").config()
const key=process.env.KEY

function auth()
{
  return (req,res,next)=>
  {
    let token=req.cookies.token
    jwt.verify(token,key,(err,decode)=>
    {
        if(err)
            res.send("You are not authorized")
        else
            if(decode.role=='admin')
            {
            next();
            }
    })
  }
}

module.exports=auth