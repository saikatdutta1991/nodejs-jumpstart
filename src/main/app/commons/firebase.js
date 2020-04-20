const AppConfig = require("../../config/app");
const firebase = require("firebase/app");

// load the firebase auth module
require("firebase/auth");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: AppConfig.firebaseApiKey
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
