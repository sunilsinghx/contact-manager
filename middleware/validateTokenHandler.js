const asyncHandler = require('express-async-handler');
const jwt =require("jsonwebtoken")

//validate token when we access current route i.e private

const validateToken = asyncHandler(async (req,res,next)=>{

    let token;
    let authHead = req.headers.authorization || req.headers.Authorization

   
    if(authHead && authHead.startsWith("Bearer"))
    {
        token = authHead.split(" ")[1] //gets token

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{

            if(err)

            {
                console.log(err);
                res.status(401);
                throw new Error("User not Authorized")
            }

            req.user = decoded.user;
            next(); 
        })

        if(!token)
        {
            res.status(401)
            throw new Error("User not Authorized or token is missing")
        }
    }
})

module.exports = validateToken

