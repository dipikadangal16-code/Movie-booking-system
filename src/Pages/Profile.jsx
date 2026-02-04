import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase.js";

export default function Profile() {
    const navigate = useNavigate();
    const uid = Cookies.get("uid");

    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: "", email: "" });
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!uid) {
            navigate("/login");
            return;
        }

        async function fetchUserData() {
            try {
                // Fetch user info
                const userSnapshot = await getDocs(
                    query(collection(db, "users"), where("uid", "==", uid))
                );
                if (!userSnapshot.empty) {
                    const userData = userSnapshot.docs[0].data();
                    setUser(userData);
                    setForm({ name: userData.name, email: userData.email });
                }

                // Fetch user bookings
                const bookingSnapshot = await getDocs(
                    query(collection(db, "bookings"), where("userId", "==", uid))
                );
                const userBookings = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBookings(userBookings);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [uid, navigate]);

    // Update user info in Firestore
    const handleUpdate = async () => {
        try {
            const userDoc = await getDocs(
                query(collection(db, "users"), where("uid", "==", uid))
            );
            if (!userDoc.empty) {
                const docRef = doc(db, "users", userDoc.docs[0].id);
                await updateDoc(docRef, { name: form.name, email: form.email });
                setUser({ ...user, name: form.name, email: form.email });
                alert("Profile updated!");
                setEditing(false);
            }
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ color: "#ff1493", textAlign: "center" }}>Profile</h1>

            {user && (
                <div style={styles.userInfo}>
                    {editing ? (
                        <>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </label>
                            <button style={styles.button} onClick={handleUpdate}>Save</button>
                            <button style={styles.button} onClick={() => setEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <button style={styles.button} onClick={() => setEditing(true)}>Edit Profile</button>
                        </>
                    )}
                </div>
            )}

            <h2 style={{ color: "#ff1493", marginTop: "30px" }}>My Bookings</h2>
            {bookings.length ? (
                <ul style={styles.bookingList}>
                    {bookings.map((b, i) => (
                        <li key={i} style={styles.bookingItem}>
                            <p><strong>Movie:</strong> {b.movieTitle}</p>
                            <p><strong>Theatre:</strong> {b.theatreName}</p>
                            <p><strong>Time:</strong> {b.showTime}</p>
                            <p><strong>Seats:</strong> {b.seats.join(", ")}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}

            {/* Optional: Change Password */}
            <h2 style={{ color: "#ff1493", marginTop: "30px" }}>Change Password</h2>
            <div style={styles.userInfo}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    style={styles.button}
                    onClick={() => alert("Password change functionality to implement with auth provider")}
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}

const styles = {
    userInfo: {
        background: "#5f3543",
        padding: "15px",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "0 auto 20px auto",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    bookingList: {
        listStyle: "none",
        padding: 0,
        maxWidth: "600px",
        margin: "0 auto"
    },
    bookingItem: {
        background: "#971f5b",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
    },
    button: {
        padding: "5px 10px",
        background: "#d60876",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};
