// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const key = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: "studyfinder-final.firebaseapp.com",
  projectId: "studyfinder-final",
  storageBucket: "studyfinder-final.appspot.com",
  messagingSenderId: "781142311405",
  appId: "1:781142311405:web:d09f0c0a92ac7517fc67e4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
