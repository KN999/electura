const express = require('express');
require('dotenv');
const jwt = require('jsonwebtoken');
const router = express.Router();
const PRIVATE_KEY = process.env.PRIVATE_KEY// import private key from environment variable
const firebase = require('../DatabaseLayer/article.js');

// Add article
router.post('/', (req, res) => {

    const token = req.body.token;
    let data;
    try {
        data = jwt.verify(token, PRIVATE_KEY);
        if(data.isadmin === 'true') {
            const article = {
                topicid : (req.body.topicid)? req.body.topicid : '',
                title : (req.body.title)? req.body.title : '',
                image : (req.body.image)? req.body.image : '',
                content : (req.body.content)? req.body.content : '',
                isFeatured : (req.body.isFeatured)? req.body.isFeatured : '',
                tag : (req.body.tag)? req.body.tag : [],
                count : 0
            }
        
            if(req.body.tag) {
                article.tag = article.tag.slice(1,-1);
                article.tag = article.tag.split(",");
            }
        
            firebase.addArticle(article, (message) => {
                console.log("DONE");
                res.send(message);
            })
        }
        else {
            res.send({ code: 400, message: "Error", error: "Not Authorized" });
        }
    }
    catch(err) {
        //console.log("Error ", err);
        res.send({ code: 400, message: "Error", error: "Session Expired" });
    }
})

// Get all article
router.get("/", (req, res) => {

  const token = req.body.token;
  let data;
  try {
    data = jwt.verify(token, PRIVATE_KEY);
    firebase.allArticlelogged((message) => {
        console.log("DONE");
        res.send(message);
      });
  } catch (err) {
    firebase.allArticle((message) => {
        console.log("DONE");
        res.send(message);
      });
  }
});

// Get specific article detail
router.get('/specificarticle', (req, res) => {

    const AID = req.query.AID;
    console.log("(((((((((",AID);
    firebase.specificArticle(AID, (message) => {
        console.log("DONE");
        res.send(message);
    })
})

// update a whole article
router.put('/:AID', (req, res) => {

    const token = req.body.token;
    let data;
    try {
        data = jwt.verify(token, PRIVATE_KEY);
        if(data.isadmin === 'true') {
            let article = {
                topicid : (req.body.topicid)? req.body.topicid : '',
                title : (req.body.title)? req.body.title : '',
                image : (req.body.image)? req.body.image : '',
                content : (req.body.content)? req.body.content : '',
                isFeatured : (req.body.isFeatured)? req.body.isFeatured : '',
                tag : (req.body.tag)? req.body.tag : [],
                count : 0
            }
        
            firebase.putArticle(req.params.AID, article, (message) => {
                console.log("DONE");
                res.send(message);
            })
        }
        else {
            res.send({ code: 400, message: "Error", error: "Not Authorized" });
        }
    }
    catch(err) {
        //console.log("Error ", err);
        res.send({ code: 400, message: "Error", error: "Session Expired" });
    }
})

// update a part of article
router.patch('/:AID', (req, res) => {
    
    const token = req.body.token;
    let data;
    try {
        data = jwt.verify(token, PRIVATE_KEY);
        if(data.isadmin === 'true') {
            const article = {
              AID: req.params.AID,
              datafield: req.body.datafield,
              data: req.body.data,
            };

            firebase.patchArticle(article, (message) => {
              console.log("DONE");
              res.send(message);
            });
        }
        else {
            res.send({ code: 400, message: "Error", error: "Not Authorized" });
        }
    }
    catch(err) {
        //console.log("Error ", err);
        res.send({ code: 400, message: "Error", error: "Session Expired" });
    }
})

// delete the article
router.delete('/:AID', (req, res) => {

    const token = req.body.token;
    let data;
    try {
        data = jwt.verify(token, PRIVATE_KEY);
        if(data.isadmin === 'true') {
            firebase.deleteArticle(req.params.AID, (message) => {
                console.log("DONE");
                res.send(message);
            })
        }
        else {
            res.send({ code: 400, message: "Error", error: "Not Authorized" });
        }
    }
    catch(err) {
        //console.log("Error ", err);
        res.send({ code: 400, message: "Error", error: "Session Expired" });
    }

})

module.exports = router;