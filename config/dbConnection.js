const mongoose = require('mongoose');

const connectDB = async ()=>{
    //connect to DB
    mongoose.connect(process.env.CONNECTION_STRING).then(() => {
        console.log(`successfully connected`);
        }).catch((e) => {
            console.log(e);
            console.log(`not connected`);
        });
   
}


module.exports = connectDB