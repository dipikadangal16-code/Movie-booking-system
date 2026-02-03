import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export default function Navbar() {
    const navigate = useNavigate()
    const isLoggedIn = !!Cookies.get("uid")
    const userName = Cookies.get("name") || "User"

    const handleLogout = () => {
        Cookies.remove("uid")
        Cookies.remove("name")
        Cookies.remove("token")
        navigate("/login")
    }

    return (
        <nav style={styles.nav}>
            <div style={styles.logo} onClick={() => navigate("/")}>CineBook</div>
            <div style={styles.links}>
                <Link style={styles.link} to="/">Movies</Link>
                <Link style={styles.link} to="/categories">Categories</Link>
                <Link style={styles.link} to="/genre">Genre</Link>
                <Link style={styles.link} to="/contact">Contact</Link>

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
    )
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
        background: "linear-gradient(90deg, #ffb6c1, #ff1493)",
        color: "white",
        fontWeight: "bold"
    },
    logo: { cursor: "pointer", fontSize: "24px" },
    links: { display: "flex", gap: "20px", alignItems: "center" },
    link: { color: "white", textDecoration: "none" },
    button: {
        padding: "5px 10px",
        background: "black",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
}
