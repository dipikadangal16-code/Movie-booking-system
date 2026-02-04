import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard.jsx";

const API_KEY = "80d491707d8cf7b38aa19c7ccab0952f";

const categories = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" },
];

export default function Categories() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedCategory) return;

        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedCategory}`
        )
            .then(res => res.json())
            .then(data => setMovies(data.results || []))
            .catch(err => console.error(err));
    }, [selectedCategory]);

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
                        <option key={c.id} value={c.id}>{c.name}</option>
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
