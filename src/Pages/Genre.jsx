import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard.jsx";

const API_KEY = "80d491707d8cf7b38aa19c7ccab0952f";

// Predefined genres with TMDb genre IDs
const genres = [
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 80, name: "Crime" },
    { id: 14, name: "Fantasy" },
    { id: 53, name: "Thriller" },
];

export default function Genre() {
    const [selectedGenre, setSelectedGenre] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedGenre) return;

        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
        )
            .then(res => res.json())
            .then(data => setMovies(data.results || []))
            .catch(err => console.error(err));
    }, [selectedGenre]);

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
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>
            </div>

            <div style={styles.grid}>
                {movies.map(movie => (
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
