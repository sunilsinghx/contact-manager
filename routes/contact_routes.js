const express = require('express');
const router = express.Router();

const {
    getContact,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact} = require("../controller/contactController");

const validateToken = require('../middleware/validateTokenHandler');

    //validate with token before going to any route
    router.use(validateToken)

    router.route("/")
        .get(getContact)
        .post(createContact);

    router.route("/:id")
        .put(updateContact)
        .get(getSingleContact)
        .delete(deleteContact);


module.exports =router;