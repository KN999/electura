const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const firebase = require("../DatabaseLayer/users.js");

// logon
router.post("/register", (req, res) => {
  const user = {
      username : req.body.username,
      email : req.body.email,
      password : req.body.password,
  }

  firebase.logon(user, (message) => {
    console.log("DONE");
    res.send(message);
  });
});

// Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  firebase.login(email, password, (message) => {
    console.log("DONE");
    res.send(message);
  });
});

module.exports = router;
