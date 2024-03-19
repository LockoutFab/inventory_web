// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgrSAaREjnfw8D1AVcczY2wDlerRZrsbo",
  authDomain: "inventory-app-72609.firebaseapp.com",
  projectId: "inventory-app-72609",
  storageBucket: "inventory-app-72609.appspot.com",
  messagingSenderId: "1010090583858",
  appId: "1:1010090583858:web:35aa70e77bb5cd519e192b",
  measurementId: "G-1CFSXL7SJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);