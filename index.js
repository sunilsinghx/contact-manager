const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

const dotenv = require("dotenv").config();

const app= express();
app.use(bodyParser.urlencoded({ extended: true }))
const port  = process.env.PORT || 3000;


//connect db
connectDB()


app.use(express.json());     

app.use("/api/contacts",require("./routes/contact_routes"))
app.use("/api/users",require("./routes/users_routes"))
app.use(errorHandler)


app.listen(port,()=>
{
    console.log(`Server running on port ${port}`);
})