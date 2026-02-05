import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies as seedMovies } from "../Seed/SeedData";

export default function Movies() {
    const [filter, setFilter] = useState("now_showing");
    const navigate = useNavigate();

    // Filter movies based on status
    const filteredMovies = seedMovies.filter(
        (movie) => movie.status === filter
    );

    return (
        <div style={{ padding: 20 }}>
            <h1 style={styles.title}>Movies</h1>

            {/* FILTER */}
            <div style={styles.filter}>
                <button
                    style={filter === "now_showing" ? styles.activeBtn : styles.btn}
                    onClick={() => setFilter("now_showing")}
                >
                    Now Showing
                </button>
                <button
                    style={filter === "coming_soon" ? styles.activeBtn : styles.btn}
                    onClick={() => setFilter("coming_soon")}
                >
                    Coming Soon
                </button>
            </div>

            {/* MOVIE GRID */}
            <div style={styles.grid}>
                {filteredMovies.length === 0 ? (
                    <p>No movies found</p>
                ) : (
                    filteredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            style={styles.card}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <h3>{movie.title}</h3>
                            <p>{movie.genre.join(", ")}</p>
                            <p>⭐ {movie.rating}</p>
                            <p>{movie.duration} mins</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    title: {
        textAlign: "center",
        color: "#ff1493"
    },
    filter: {
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginBottom: 20
    },
    btn: {
        padding: "8px 16px",
        border: "1px solid #ff1493",
        background: "white",
        cursor: "pointer"
    },
    activeBtn: {
        padding: "8px 16px",
        border: "none",
        background: "#ff1493",
        color: "white",
        cursor: "pointer"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 20
    },
    card: {
        padding: 15,
        borderRadius: 10,
        background: "#b8496e",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }
};
