// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBII7Tk1DG2A0P6Y14Rl7HrtT1_4Zkqo_A",
  authDomain: "ecommers-471ed.firebaseapp.com",
  projectId: "ecommers-471ed",
  storageBucket: "ecommers-471ed.firebasestorage.app",
  messagingSenderId: "63575852550",
  appId: "1:63575852550:web:c2ffbaaf8e243cbb756587",
  measurementId: "G-2C9DJB7JLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const fireDB = getFirestore(app)
export const auth = getAuth(app);