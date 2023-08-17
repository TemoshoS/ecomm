// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwaIdYpOouo7l0-01zQ_auM9H_0kvIYZo",
  authDomain: "spares-2f4b2.firebaseapp.com",
  projectId: "spares-2f4b2",
  storageBucket: "spares-2f4b2.appspot.com",
  messagingSenderId: "647586473200",
  appId: "1:647586473200:web:3a53551b55db3957198e35",
  measurementId: "G-BQEXZG4LMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db}
