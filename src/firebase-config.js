import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfp79kmkeFu7T1U7lKIvEea_5dtIzf2HQ",
    authDomain: "apits-32832.firebaseapp.com",
    projectId: "apits-32832",
    storageBucket: "apits-32832.appspot.com",
    messagingSenderId: "580512757743",
    appId: "1:580512757743:web:5583e929c7cf875d72a81a",
    measurementId: "G-GRKCSDWWSE"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
