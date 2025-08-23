import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 1. Import getFirestore
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCR4Z3UPfmXbxZTEYwaeJLGS7dJU6df-ec",
    authDomain: "ai-projectapp.firebaseapp.com",
    projectId: "ai-projectapp",
    storageBucket: "ai-projectapp.firebasestorage.app",
    messagingSenderId: "777188508717",
    appId: "1:777188508717:web:7e1762cc1c5834ce3fa4a4",
    measurementId: "G-00FFQ4SZ89"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db}