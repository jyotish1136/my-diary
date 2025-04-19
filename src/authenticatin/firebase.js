import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAEOdYQrMEzzQdrzbCew7FxoOG0YeiYSTI",
    authDomain: "my-notes-e46c2.firebaseapp.com",
    projectId: "my-notes-e46c2",
    storageBucket: "my-notes-e46c2.firebasestorage.app",
    messagingSenderId: "470635093073",
    appId: "1:470635093073:web:acafffe768463782bbac70",
    measurementId: "G-9EWXMNSPGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPhoneNumber, RecaptchaVerifier };
