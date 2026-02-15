import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("uid"));

    const handleLogout = () => {
        Cookies.remove("uid");
        Cookies.remove("name");
        Cookies.remove("token");
        Cookies.remove("role");

        setIsLoggedIn(false); // triggers UI update
        navigate("/login");   // SPA-friendly navigation
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.logoLink}>CineBook</Link>
            </div>

            <div style={styles.links}>
                <Link style={styles.link} to="/">Home</Link>
                <Link style={styles.link} to="/categories">Categories</Link>
                <Link style={styles.link} to="/genre">Genre</Link>
                <Link style={styles.link} to="/contact">Contact</Link>
                <Link style={styles.link} to="/movies">Movies</Link>

                {isLoggedIn ? (
                    <>
                        <Link style={styles.link} to="/profile">Profile</Link>
                        <button style={styles.button} onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link style={styles.link} to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
        background: "linear-gradient(90deg, #ffb6c1, #ff1493)",
        color: "white",
        fontWeight: "bold",
        position: "sticky",
        top: 0,
        zIndex: 10
    },
    logo: { fontSize: "24px", fontWeight: "bold" },
    logoLink: { color: "white", textDecoration: "none" },
    links: { display: "flex", gap: "20px", alignItems: "center" },
    link: { color: "white", textDecoration: "none", cursor: "pointer" },
    button: {
        padding: "5px 10px",
        background: "black",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};