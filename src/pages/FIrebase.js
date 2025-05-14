// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4haMOuPJU31vEqWbUgRoFivcyPGQUZsQ",
  authDomain: "connecxa.firebaseapp.com",
  projectId: "connecxa",
  storageBucket: "connecxa.firebasestorage.app",
  messagingSenderId: "27558915627",
  appId: "1:27558915627:web:713d99e090e46fff78c46e",
  measurementId: "G-2K65NNFZHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);