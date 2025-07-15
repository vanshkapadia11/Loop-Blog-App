// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrL9zL5E-FE9La08sALNltnba5GEZeVgE",
  authDomain: "authproject-494d7.firebaseapp.com",
  projectId: "authproject-494d7",
  storageBucket: "authproject-494d7.appspot.com", // ✅ FIXED HERE
  messagingSenderId: "425249780603",
  appId: "1:425249780603:web:cbac34728927081eb383de",
  measurementId: "G-LB4NYZV3ZQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
