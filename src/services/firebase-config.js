import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getFirestore} from "firebase/firestore"

//import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyCCCxrOgvkx5iuGkc0bFjwcczrAPnt7ZvI",
  authDomain: "visitasbibliotecask.firebaseapp.com",
  databaseURL: "https://visitasbibliotecask-default-rtdb.firebaseio.com",
  projectId: "visitasbibliotecask",
  storageBucket: "visitasbibliotecask.appspot.com",
  messagingSenderId: "579330224790",
  appId: "1:579330224790:web:fb4970d97b4fb2146508b7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const databaseMiApp = getDatabase(app);
const firestoreMiApp = getFirestore(app);

export {app, databaseMiApp, firestoreMiApp, auth};