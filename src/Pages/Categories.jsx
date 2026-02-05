import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard.jsx";
import { movies as seedMovies } from "../Seed/SeedData.js";

// Categories based on seedData genres
const categories = [
    "Action",
    "Comedy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
];

export default function Categories() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    // Local filtering
    const filteredMovies = selectedCategory
        ? seedMovies.filter(movie =>
            movie.genre.includes(selectedCategory)
        )
        : [];

    return (
        <div style={{ padding: 20 }}>
            <h1 style={{ color: "#ff1493", textAlign: "center" }}>Categories</h1>

            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                >
                    <option value="">--Select Category--</option>
                    {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div style={styles.grid}>
                {filteredMovies.length === 0 && selectedCategory ? (
                    <p>No movies found</p>
                ) : (
                    filteredMovies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onBook={() => navigate(`/movie/${movie.id}`)}
                        />
                    ))
                )}
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
