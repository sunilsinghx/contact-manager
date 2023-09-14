const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    name:{
        type:String,
        required:[true,"PLease add the contact name"]
    },
    email:{
        type:String,
        required:[true,"PLease add the email "]
    },
    phone:{
        type:String,
        required:[true,"PLease add the phone"]
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("contacts",contactSchema)