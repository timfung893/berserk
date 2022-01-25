import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC4HnFoJMyeKdwKCGU7d1wENGi8EJNaLIw",
  authDomain: "berserk2.firebaseapp.com",
  databaseURL: "https://berserk2-default-rtdb.firebaseio.com",
  projectId: "berserk2",
  storageBucket: "berserk2.appspot.com",
  messagingSenderId: "927667383419",
  appId: "1:927667383419:web:8e9e090f6fc17439cc86de",
  measurementId: "G-NYV2F7EFR7",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const productSource = firebase.database().ref("BerserkData/");
