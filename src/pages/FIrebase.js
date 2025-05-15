import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

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
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app;