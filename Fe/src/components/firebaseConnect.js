import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBObYEVb_HkZpnFqoro2Ww_2jRrIh-HS_c",
  authDomain: "berserk-ce479.firebaseapp.com",
  databaseURL: "https://berserk-ce479-default-rtdb.firebaseio.com",
  projectId: "berserk-ce479",
  storageBucket: "berserk-ce479.appspot.com",
  messagingSenderId: "146564038541",
  appId: "1:146564038541:web:580ccf5b1b565a15ff87c4",
  measurementId: "G-DMYP9MY6JC",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const productSource = firebase.database().ref("Berserk/");
