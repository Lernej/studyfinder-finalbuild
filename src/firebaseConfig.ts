// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const key = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: {key},
  authDomain: "shellhacks-2025-studyfinder.firebaseapp.com",
  projectId: "shellhacks-2025-studyfinder",
  storageBucket: "shellhacks-2025-studyfinder.appspot.com",
  messagingSenderId: "521476233651",
  appId: "1:521476233651:web:c4c7ecf5659e5508ef13c6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
