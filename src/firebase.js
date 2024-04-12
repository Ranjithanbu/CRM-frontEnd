// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API,
  authDomain: "crm-plus-94631.firebaseapp.com",
  projectId: "crm-plus-94631",
  storageBucket: "crm-plus-94631.appspot.com",
  messagingSenderId: "830939925861",
  appId: "1:830939925861:web:b950d4dcd4976e89e8a58c",
  measurementId: "G-G8LW9K061Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
