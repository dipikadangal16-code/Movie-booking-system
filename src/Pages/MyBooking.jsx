import { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const userId = Cookies.get("uid") || "guest";

    useEffect(() => {
        const fetchBookings = async () => {
            const q = query(collection(db, "bookings"));
            const snapshot = await getDocs(q);
            const data = [];
            snapshot.docs.forEach(doc => {
                const d = doc.data();
                if (d.bookings) {
                    d.bookings.forEach(b => {
                        if (b.userId === userId) data.push(b);
                    });
                }
            });
            setBookings(data);
        };
        fetchBookings();
    }, [userId]);

    if (!bookings.length) return <h2 style={{ textAlign: "center" }}>No bookings found</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>My Bookings</h2>
            {bookings.map((b, i) => (
                <div key={i} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
                    <p><strong>Movie:</strong> {b.movieTitle}</p>
                    <p><strong>Theatre:</strong> {b.theatreName}</p>
                    <p><strong>Seats:</strong> {b.seats.join(", ")}</p>
                    <p><strong>Time:</strong> {b.time}</p>
                </div>
            ))}
        </div>
    );
}
