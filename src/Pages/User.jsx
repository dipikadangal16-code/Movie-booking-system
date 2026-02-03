import { useEffect, useState } from "react"
import { db, auth } from "../config/Firebase.js"  // ✅ match filename exactly

import { collection, query, where, getDocs } from "firebase/firestore"

const User = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            if (!auth.currentUser) return
            const q = query(
                collection(db, "bookings"),
                where("userId", "==", auth.currentUser.uid)
            )
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setBookings(data)
        }
        fetchBookings()
    }, [])

    const logout = () => {
        auth.signOut()
        window.location.href = "/login"
    }

    return (
        <div style={{ padding: "40px" }}>
            <h2>My Profile</h2>

            <h3>My Bookings</h3>
            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <ul>
                    {bookings.map((b, i) => (
                        <li key={i}>
                            🎬 {b.movie} - Seats: {b.seats.join(", ")}
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={logout}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>
        </div>
    )
}

export default User
