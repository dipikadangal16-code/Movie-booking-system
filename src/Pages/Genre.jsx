import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard.jsx";
import { movies as seedMovies } from "../Seed/SeedData.js";

// Local genres (match seedData genres)
const genres = [
    "Action",
    "Adventure",
    "Sci-Fi",
    "Thriller",
    "Drama"
];

export default function Genre() {
    const [selectedGenre, setSelectedGenre] = useState("");
    const navigate = useNavigate();

    // Filter movies locally
    const filteredMovies = selectedGenre
        ? seedMovies.filter(movie =>
            movie.genre.includes(selectedGenre)
        )
        : [];

    return (
        <div style={{ padding: 20 }}>
            <h1 style={{ color: "#ff1493", textAlign: "center" }}>Genres</h1>

            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <select
                    value={selectedGenre}
                    onChange={e => setSelectedGenre(e.target.value)}
                >
                    <option value="">--Select Genre--</option>
                    {genres.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>

            <div style={styles.grid}>
                {filteredMovies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onBook={() => navigate(`/movie/${movie.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}

const styles = {
    grid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        justifyContent: "center",
    },
};
