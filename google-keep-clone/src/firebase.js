import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, getDocs, updateDoc 
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Firebase Authentication
const provider = new GoogleAuthProvider(); // Google Sign-In

// signInWithPopup(auth, provider)
//   .then((result) => {
//     console.log("User signed in:", result.user);
//   })
//   .catch((error) => {
//     console.error("Sign-in error:", error);
//   });


export { db, auth, provider, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, getDocs, updateDoc, signInWithPopup };
