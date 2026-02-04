import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/Firebase"; 
import { collection, addDoc } from "firebase/firestore";
import Cookies from "js-cookie";

export default function SeatMap() {
    const { id } = useParams(); // movie id
    const navigate = useNavigate();

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [theatre, setTheatre] = useState("");
    const [showtime, setShowtime] = useState("");

    const userId = Cookies.get("uid"); // make sure you store uid in cookie on login

    /* ---------------- INITIALIZE SEATS ---------------- */
    useEffect(() => {
        const rows = 5;
        const cols = 8;
        const tempSeats = [];
        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                tempSeats.push({ id: `R${r}C${c}`, booked: false });
            }
        }
        setSeats(tempSeats);
    }, []);

    /* ---------------- HANDLE SEAT CLICK ---------------- */
    const handleSeatClick = (seatId) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    };

    /* ---------------- CONFIRM BOOKING ---------------- */
    const confirmBooking = async () => {
        if (!userId) return alert("Please login first!");
        if (!theatre || !showtime) return alert("Please select theatre and showtime!");
        if (selectedSeats.length === 0) return alert("Please select at least one seat!");

        const bookingData = {
            movieId: id,
            userId,
            theatre,
            showtime,
            seats: selectedSeats,
            createdAt: new Date(),
        };

        try {
            await addDoc(collection(db, "bookings"), bookingData);
            alert("Booking confirmed!");
            setSelectedSeats([]); // reset after booking
            navigate("/dashboard/bookings"); // go to MyBookings
        } catch (err) {
            console.error(err);
            alert("Booking failed: " + err.message);
        }
    };

    /* ---------------- RENDER ---------------- */
    return (
        <div style={{ padding: "20px" }}>
            <h2>Seat Selection</h2>

            {/* Theatre Selection */}
            <div>
                <label>Theatre: </label>
                <select value={theatre} onChange={(e) => setTheatre(e.target.value)}>
                    <option value="">--Select Theatre--</option>
                    <option value="QFX">QFX Cinema</option>
                    <option value="FCUBE">FCube</option>
                    <option value="RANJANA">Ranjana</option>
                </select>
            </div>

            {/* Showtime Selection */}
            <div>
                <label>Showtime: </label>
                <select value={showtime} onChange={(e) => setShowtime(e.target.value)}>
                    <option value="">--Select Showtime--</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                </select>
            </div>

            {/* Seat Grid */}
            <div style={styles.seatGrid}>
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id)}
                        style={{
                            ...styles.seat,
                            backgroundColor: selectedSeats.includes(seat.id)
                                ? "#ff1493"
                                : "#ccc",
                        }}
                    >
                        {seat.id}
                    </div>
                ))}
            </div>

            {/* Confirm Booking Button */}
            <button style={styles.confirmBtn} onClick={confirmBooking}>
                Confirm Booking
            </button>
        </div>
    );
}

/* ---------------- STYLES ---------------- */
const styles = {
    seatGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(8, 50px)",
        gap: "10px",
        marginTop: "20px",
    },
    seat: {
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "4px",
    },
    confirmBtn: {
        marginTop: "20px",
        padding: "10px 20px",
        background: "#ff1493",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
};
