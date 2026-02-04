import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const snap = await getDocs(collection(db, "bookings"));
            setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchBookings();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
            <ul>
                {bookings.map(b => (
                    <li key={b.id} className="border p-2 mb-2 rounded">
                        User: {b.userEmail} | Movie: {b.movieTitle} | Seats: {b.seats.join(", ")} | Time: {b.showTime}
                    </li>
                ))}
            </ul>
        </div>
    );
}
