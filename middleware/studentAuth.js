const jwt = require('jsonwebtoken');
require("dotenv").config();
const key = process.env.KEY;

function studentAuth() 
{
  return(req,res,next)=>
    {
    const token = req.cookies.token;

    if(!token) 
      return res.status(401).send("Token not provided");

    jwt.verify(token, key, (err, decode) => {
      if(err)
        return res.status(401).send("You are not authorized");

      if(!decode||!decode.role)
        return res.status(403).send("Invalid token data");
 
      if(decode.role=='student')
        next()

      if(decode.role!=='student')
        return res.status(403).send("You do not have permission to access this route")

    });
  };
}

module.exports=studentAuth;
