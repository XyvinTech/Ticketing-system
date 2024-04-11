// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7WiuKHUwZKpaFeNRNb1mRSZo80HP1qog",
  authDomain: "mern-auth-dff47.firebaseapp.com",
  projectId: "mern-auth-dff47",
  storageBucket: "mern-auth-dff47.appspot.com",
  messagingSenderId: "337678718409",
  appId: "1:337678718409:web:45ab4abf959dd67cc68418"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);