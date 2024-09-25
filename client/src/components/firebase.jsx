// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAosiQ5FSllhQH6NAq-ggDN3xD97nYG09E",
  authDomain: "login-auth-48df3.firebaseapp.com",
  projectId: "login-auth-48df3",
  storageBucket: "login-auth-48df3.appspot.com",
  messagingSenderId: "87448542684",
  appId: "1:87448542684:web:3037964998e9c3d0974319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export default app