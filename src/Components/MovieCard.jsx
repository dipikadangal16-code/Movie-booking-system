import { Link } from "react-router-dom";

export default function MovieCard({ movie, onBook }) {
    // For seeded movies, prepend TMDb base if poster_path starts with '/'
    const posterBase = "https://image.tmdb.org/t/p/w500";
    const poster = movie.poster_path.startsWith("/")
        ? posterBase + movie.poster_path
        : movie.poster_path;

    return (
        <div style={styles.card}>
            {/* Clicking poster goes to MovieDetails page */}
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={poster}
                    alt={movie.title}
                    style={styles.img}
                />
            </Link>

            <h3>{movie.title}</h3>
            <p>{movie.release_date || "2026-01-01"}</p>

            {/* Book Now button */}
            <button style={styles.button} onClick={() => onBook(movie)}>
                Book Now
            </button>
        </div>
    );
}

const styles = {
    card: {
        width: "150px",
        background: "#b94f73",
        padding: "10px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer"
    },
    img: {
        width: "100%",
        borderRadius: "5px",
        height: "225px",
        objectFit: "cover"
    },
    button: {
        marginTop: "5px",
        padding: "5px",
        background: "#ff1493",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};
