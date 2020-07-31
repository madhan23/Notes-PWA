import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBIvuXV47uWH7kGv2eh3j4Y5gO5PjzIFZk",
    authDomain: "notes-f7f00.firebaseapp.com",
    databaseURL: "https://notes-f7f00.firebaseio.com",
    projectId: "notes-f7f00",
    storageBucket: "notes-f7f00.appspot.com",
    messagingSenderId: "83866277892",
    appId: "1:83866277892:web:176607a05519cc409fbd51",
    measurementId: "G-KQZGRMZYR8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db= firebase.firestore();

  export {firebase,db};