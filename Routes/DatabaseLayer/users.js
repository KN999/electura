require('dotenv').config();
const fire = require('./firebase');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY

exports.logon = (user, callback) => {
  const payload = {username: user.username, email: user.email};

  fire.firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(async (firebaseUser) => {
      console.log("User " + firebaseUser.uid + " created successfully!");
      Updatefirestore();
    })
    .catch((error) => {
      console.log("An error happened.", error);
      callback({ code: 400, message: "Error", data: error });
    });

  const Updatefirestore = () => {
    fire.db.collection("users").add({email : user.email, username : user.username});

    const token = jwt.sign(payload, PRIVATE_KEY, {expiresIn : '5d'});
    console.log("User " + " created successfully!---",token);

    callback({ code: 200, message: "Success", token: token });
  };
};

// Login 
exports.login = (email, password, callback) => {
  const payload = {email: email};
  
  fire.firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((info) => {
      fire.db.collection('users').where('email', '==', email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          payload.isadmin = doc.data().isadmin;
          payload.name = doc.data().name;
        });
      })
      .then(() => {
        console.log("Successfully genrated token : ")
        const token = jwt.sign(payload, PRIVATE_KEY, {expiresIn : '5m'});
        callback({ code: 200, message: "Success", token: token });
      })
      .catch(error => {
        console.log('Error generating token', error);
        callback({ code: 400, message: "Error", data: error })
      });
      
    })
    .catch((error) => {
      console.log("Some error occurred ", error);
      console.log(" key :  ", PRIVATE_KEY);
      
      callback({ code: 400, message: "Error", data: error });
    });
};