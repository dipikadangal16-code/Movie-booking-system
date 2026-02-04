import { Link } from "react-router-dom";

export default function MovieCard({ movie, onBook }) {
    const posterBase = "https://image.tmdb.org/t/p/w500";

    // Ensure numeric TMDb ID for API
    const tmdbId = movie.id.toString().replace("movie_", "");

    return (
        <div style={styles.card}>
            {/* Clicking poster goes to MovieDetails page */}
            <Link to={`/movie/${tmdbId}`}>
                <img
                    src={movie.poster_path ? posterBase + movie.poster_path : ""}
                    alt={movie.title}
                    style={styles.img}
                />
            </Link>

            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>

            {/* Optional: Book Now button */}
            <button style={styles.button} onClick={onBook}>Book Now</button>
        </div>
    );
}

const styles = {
    card: {
        width: "150px",
        background: "#fff0f5",
        padding: "10px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer"
    },
    img: {
        width: "100%",
        borderRadius: "5px"
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
