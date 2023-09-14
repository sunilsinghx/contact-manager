const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
const mongoose = require('mongoose');

//we use async handler as we mongodb use promise we would be nedd to put try catch 
//rtaher than that we use async handler

//@desc GET all Contacts
//@routes GET /api/contacts/
//@access Private 

const getContact = asyncHandler( async (req,res)=>{
    const cont =await Contact.find({user_id: req.user.id});
    res.status(200).json(cont);
})

//@desc GET single Contact
//@routes GET /api/contacts/:id
//@access Private 

const getSingleContact = asyncHandler(async (req,res)=>{
    
    const  contact = await Contact.findOne({user_id: req.user.id , _id: req.params.id })
    .then((x)=>{
        console.log("clicked");
        if(!x)  //if x is null
        {
            res.status(404);
            throw new Error("Contact Not Found")
        }
        console.log(req.user.id);
        res.status(200).json(x);
    })
    .catch((error)=>{
        // console.log(error);
        res.status(404);
        throw new Error("Contact Not Found")
        
    })
    
})

//@desc create Contact
//@routes POST /api/contacts/
//@access Private 

const createContact = asyncHandler(async (req,res)=>{
    // console.log("body is : "+JSON.stringify(req.body));
    const {name,email,phone} =req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    } 

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json({
       contact
    });
})

//@desc update Contact
//@routes PUT /api/contacts/:id
//@access Private 

const updateContact = asyncHandler(async (req,res)=>{

    const contact = await Contact.findById(req.params.id)

    if(!contact)
    {
        res.status(404)
        throw new Error("Contact not found")   
    }

    //if user_id not matched with token (res.user.id)
    if(contact.user_id.toString() !== res.user.id)
    {
        res.status(403);
        throw new Error("User not have permission to update other user contact")
    }

    const updateCont = await Contact.findByIdAndUpdate(
        req.params.id,  //id
        req.body,   //new body
        {new:true}
    )
    res.status(200).json(updateCont);
})

//@desc delete Contact 
//@routes DELETE /api/contacts/:id
//@access Private 

const deleteContact = asyncHandler(async (req,res)=>{

    const  contact = await Contact.findByIdAndRemove(req.params.id)
    .then((obj)=>{
        if(!obj)
        {
            res.status(404)
            throw new Error("Contact not found")
        }

        //if user_id not matched with token (res.user.id)
        if(obj.user_id.toString() !== res.user.id)
        {
            res.status(403);
            throw new Error("User not have permission to update other user contact")
        }

        res.status(200).json(obj);
    })
    .catch(()=>{
        res.status(404)
        throw new Error("Contact not found")
    })
    
})




module.exports = {
    getContact,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};