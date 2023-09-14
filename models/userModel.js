const mongoose = require('mongoose');

//create schema for user 

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true,"Please enter username"]
    },
    email: {
        type: String,
        required:[true,"please enter email"],
        unique:[true,"email already taken"]
    },
    password:{
        type:String,
        required:[true,"Please enter user's password"]
    }
},
{
    timestamps:true
})


module.exports = mongoose.model("users",userSchema);