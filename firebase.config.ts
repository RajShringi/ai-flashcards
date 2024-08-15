// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-flashcards-611b3.firebaseapp.com",
  projectId: "ai-flashcards-611b3",
  storageBucket: "ai-flashcards-611b3.appspot.com",
  messagingSenderId: "505757590741",
  appId: "1:505757590741:web:ae31d02f64ac695d00ee5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
