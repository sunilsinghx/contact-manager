const asyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const { json } = require("express");

//we use async handler as we mongodb use promise we would be nedd to put try catch 
//rtaher than that we use async handler

//@desc Register the user
//@routes POST /api/users/register
//@access public 

const registerUser = asyncHandler( async(req,res)=>{
   const {username,email,password} = req.body;

   //if any fields are missing
    if (!username || !email || !password )
    {
        console.log("1");
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    //check if user already registered
    const isAlreadyRegisted = await User.findOne({email});
    if(isAlreadyRegisted )
    {
        res.status(400)
        throw new Error("User already registered")
    }

    const hashPass = await bcrypt.hash(password,10);
    //create new User with hash password
    const usr = await User.create({
        username,
        email,
        password: hashPass
    }) 

    if(usr)
    {
        res.status(201).json({_id:usr.id, email: usr.email})
    }else
    {
        res.status(400);
        throw new Error("User Data not valid");
    }

})

//@desc login the user
//@routes POST /api/users/login
//@access public 

const loginUser = asyncHandler( async(req,res)=>{

    const {email , password} = req.body
    if (!email || !password )
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const usr = await User.findOne({email});

    //compare password with hashed password
    if(usr && (await bcrypt.compare(password,usr.password)))
    {
        //create access token
        const accessToken= jwt.sign(
        {
            //user info
            user:{ username: usr.username, email :usr.email,id: usr.id}
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"5m"}
        );

        res.status(200).json({accessToken})
    }else
    {
        res.status(401);
        throw new Error("email or password not valid")
    }
    
})

//@desc Get current user info
//@routes GET /api/users/current
//@access private 

const currentUser = asyncHandler( async(req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}


