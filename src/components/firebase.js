import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyADB6xS-d7NTjaQTRMdbe2CVVtXeouFUhk",
    authDomain: "employee-scheduling-2ba6a.firebaseapp.com",
    databaseURL: "https://employee-scheduling-2ba6a.firebaseio.com",
    projectId: "employee-scheduling-2ba6a",
    storageBucket: "employee-scheduling-2ba6a.appspot.com",
    messagingSenderId: "128448459069",
    appId: "1:128448459069:web:6720c3cb2395c6914c9554"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;