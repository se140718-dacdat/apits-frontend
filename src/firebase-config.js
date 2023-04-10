import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBa2pBLgRT39PlS3W7EjA6yR9fZqsMwUeI",
    authDomain: "apits-3dfeb.firebaseapp.com",
    projectId: "apits-3dfeb",
    storageBucket: "apits-3dfeb.appspot.com",
    messagingSenderId: "844982793379",
    appId: "1:844982793379:web:ed7f826e212751e9553b16"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
