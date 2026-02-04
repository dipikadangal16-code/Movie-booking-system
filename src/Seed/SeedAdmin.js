// src/Seed/SeedAdmin.js
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/Firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function seedAdmin() {
    const email = "admin@example.com";
    const password = "admin123"; // change to a secure password
    const name = "Super Admin";

    try {
        // 1️⃣ Create admin in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // 2️⃣ Add admin info in Firestore users collection
        await setDoc(doc(db, "users", uid), {
            name,
            email,
            role: "admin"
        });

        console.log("✅ Admin user created successfully!");
        console.log("Email:", email);
        console.log("Password:", password);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            console.log("⚠️ Admin already exists!");
        } else {
            console.error("Error creating admin:", error.message);
        }
    }
}
