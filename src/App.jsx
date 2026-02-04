import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import Contact from "./Pages/Contact.jsx";
import Genre from "./Pages/Genre.jsx";
import Categories from "./Pages/Categories.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import MyBookings from "./Pages/MyBooking.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AdminMovies from "./Pages/AdminMovies.jsx";
import AdminTheatres from "./Pages/AdminTheatres.jsx";
import AdminShowtimes from "./Pages/AdminShowtimes.jsx";
import AdminBooking from "./Pages/AdminBooking.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import Footer from "./Pages/Footer.jsx";

// Components
import Navbar from "./Pages/Navbar.jsx";
import SeatMap from "./Components/SeatMap.jsx";

/* ---------- ADMIN ROUTE ---------- */
export function AdminRoute({ children, role }) {
    return role === "admin" ? children : <Navigate to="/" />;
}

/* ---------- APP ---------- */
export default function App() {
    const [userRole, setUserRole] = useState(Cookies.get("role") || "user");

    useEffect(() => {
        // Only read role, NEVER seed here
        setUserRole(Cookies.get("role") || "user");
    }, []);

    return (
        <div style={styles.app}>
            <Navbar />

            {/* MAIN CONTENT */}
            <main style={styles.main}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                loginUpdate={() =>
                                    setUserRole(Cookies.get("role") || "user")
                                }
                            />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/seatmap/:id" element={<SeatMap />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/genre" element={<Genre />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />

                    {/* User Routes */}
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route
                        path="/dashboard/bookings"
                        element={<MyBookings />}
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute role={userRole}>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/movies"
                        element={
                            <AdminRoute role={userRole}>
                                <AdminMovies />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/theatres"
                        element={
                            <AdminRoute role={userRole}>
                                <AdminTheatres />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/showtimes"
                        element={
                            <AdminRoute role={userRole}>
                                <AdminShowtimes />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/bookings"
                        element={
                            <AdminRoute role={userRole}>
                                <AdminBooking />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

/* ---------- STYLES ---------- */
const styles = {
    app: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    main: {
        flex: 1, // keeps footer at bottom
    },
};
