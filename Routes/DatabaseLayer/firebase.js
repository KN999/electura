//require('firebase/storage')
const firebase = require("firebase/app");
const auth = require("firebase/auth");
const firestore = require("firebase/firestore");
// const storage = firebase.storage()

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDjTRdQ08xrAyWrIrLbf2gafbfP4wl1XQ",
  authDomain: "registration-form-ad20a.firebaseapp.com",
  databaseURL: "https://registration-form-ad20a.firebaseio.com",
  projectId: "registration-form-ad20a",
  storageBucket: "registration-form-ad20a.appspot.com",
  messagingSenderId: "766278655828",
  appId: "1:766278655828:web:08ab67e806c771e13932c1",
  measurementId: "G-283LF3Z262"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = {
  firebase,
  db
}
