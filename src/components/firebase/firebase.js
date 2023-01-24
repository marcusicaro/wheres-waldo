// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQTtWeHoUnsI5-YT51nx5b77NjgtdO670",
  authDomain: "wheres-waldo-2334b.firebaseapp.com",
  projectId: "wheres-waldo-2334b",
  storageBucket: "wheres-waldo-2334b.appspot.com",
  messagingSenderId: "376744808075",
  appId: "1:376744808075:web:5dabcffbe55d1f1d120e8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
