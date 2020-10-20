const express = require('express');
require('dotenv');
const jwt = require('jsonwebtoken');
const router = express.Router();
const PRIVATE_KEY = process.env.PRIVATE_KEY// import private key from environment variable
const firebase = require('../DatabaseLayer/documents.js');

// Add document
router.post('/', (req, res) => {

    const token = req.body.token;
    const document = req.body.document;
    const data = {};
    try {
        data.user = (jwt.verify(token, PRIVATE_KEY)).email;
        data.document = document;
        console.log("&&&&&&", data.document);
        firebase.addDocument(data, (message) => {
            console.log("DONE");
            res.send(message);
        })
        
    }
    catch(err) {
        //console.log("Error ", err);
        res.send({ code: 400, message: "Error", error: "Session Expired" });
    }
})

// Get all documents
router.get('/', (req, res) => {

    const token = req.params.token;

    try {
        data = jwt.verify(token, PRIVATE_KEY);
        firebase.allDocuments(data.email, (message) => {
            console.log("DONE");
            res.send(message);
        })
    }
    catch(err) {
        console.log("Error ", err);
        res.send({ code: 400, message: "Error", error: "Session Expired" });
    }
})

module.exports = router;