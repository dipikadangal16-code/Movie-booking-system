import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function SeatMap() {
    const { id } = useParams() // movie id
    const navigate = useNavigate()
    const rows = 5
    const cols = 8

    const [seats, setSeats] = useState(Array(rows).fill(null).map(() => Array(cols).fill(false)))
    const [selectedSeats, setSelectedSeats] = useState([])

    const toggleSeat = (row, col) => {
        const updated = seats.map((r, i) => r.map((c, j) => {
            if (i === row && j === col) return !c
            return c
        }))
        setSeats(updated)

        const seatLabel = `R${row + 1}C${col + 1}`
        if (selectedSeats.includes(seatLabel)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatLabel))
        } else {
            setSelectedSeats([...selectedSeats, seatLabel])
        }
    }

    const handleConfirm = () => {
        if (!selectedSeats.length) return alert("Select at least 1 seat")
        alert(`Booking confirmed for seats: ${selectedSeats.join(", ")}`)
        navigate("/profile")
    }

    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            <h2>Seat Booking - Movie ID: {id}</h2>
            <div style={{ display: "inline-block", marginTop: 20 }}>
                {seats.map((row, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        {row.map((booked, j) => {
                            const seatLabel = `R${i + 1}C${j + 1}`
                            return (
                                <div
                                    key={j}
                                    onClick={() => toggleSeat(i, j)}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        background: booked ? "green" : "#ffb6c1",
                                        cursor: "pointer",
                                        borderRadius: 4,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: 10,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}
                                    title={seatLabel}
                                >
                                    {seatLabel}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 20 }}>
                <button
                    onClick={handleConfirm}
                    style={{ padding: "10px 20px", background: "#ff1493", color: "white", border: "none", cursor: "pointer" }}
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    )
}
