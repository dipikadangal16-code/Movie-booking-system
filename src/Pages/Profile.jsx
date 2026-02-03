import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function Profile() {
    const navigate = useNavigate()
    const name = Cookies.get("name") || "User"

    // For now, dummy bookings. You can replace with Firestore bookings later.
    const bookings = [
        { movie: "Movie A", seats: ["R1C1", "R1C2"] },
        { movie: "Movie B", seats: ["R2C3"] }
    ]

    return (
        <div style={{ padding: 50, textAlign: "center" }}>
            <h1>Welcome, {name}</h1>
            <h2>My Bookings</h2>
            {bookings.length ? (
                bookings.map((b, i) => (
                    <div key={i} style={{ marginBottom: 15, border: "1px solid #ff1493", padding: 10, borderRadius: 8 }}>
                        <p><strong>Movie:</strong> {b.movie}</p>
                        <p><strong>Seats:</strong> {b.seats.join(", ")}</p>
                    </div>
                ))
            ) : (
                <p>No bookings yet.</p>
            )}
            <button
                onClick={() => navigate("/")}
                style={{ padding: "10px 20px", marginTop: 20, background: "#ff1493", color: "white", border: "none", cursor: "pointer" }}
            >
                Back to Home
            </button>
        </div>
    )
}
