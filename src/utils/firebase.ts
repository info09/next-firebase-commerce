// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI2fnfIEuevUx--PiwLzjosG4g1E8a9EE",
  authDomain: "next-firebase-commerce-14c8c.firebaseapp.com",
  projectId: "next-firebase-commerce-14c8c",
  storageBucket: "next-firebase-commerce-14c8c.firebasestorage.app",
  messagingSenderId: "680100080823",
  appId: "1:680100080823:web:201d534736e6318569f132",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
