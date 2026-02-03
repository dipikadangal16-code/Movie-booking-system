import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// 🔑 Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2FoSdKvl6rOgFA-7VQASyFTiP3UOYAMs",
    authDomain: "movie-booking-system-bc7fd.firebaseapp.com",
    projectId: "movie-booking-system-bc7fd",
    storageBucket: "movie-booking-system-bc7fd.firebasestorage.app",
    messagingSenderId: "32886318918",
    appId: "1:32886318918:web:8f4ca60d17892267f3e747",
    measurementId: "G-ZVW43LLTGD"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Firebase Auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

// Firestore database
export const db = getFirestore(app)
