// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMfNKevXp8UzBKEX-f755N8PviRDNr_OY",
    authDomain: "react-weather-app-d744a.firebaseapp.com",
    projectId: "react-weather-app-d744a",
    storageBucket: "react-weather-app-d744a.firebasestorage.app",
    messagingSenderId: "228084427162",
    appId: "1:228084427162:web:72a73b4743e455e4af3223",
    measurementId: "G-2GGT7W09SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth}