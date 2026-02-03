import { useEffect, useState } from "react"

export default function Genre() {
    const [movies, setMovies] = useState([])
    const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"]

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=80d491707d8cf7b38aa19c7ccab0952f")
            .then(res => res.json())
            .then(data => setMovies(data.results || []))
            .catch(err => console.error(err))
    }, [])

    const posterBase = "https://image.tmdb.org/t/p/w500"

    return (
        <div style={{ padding: 50 }}>
            <h1>Genres</h1>
            {genres.map((g, i) => (
                <div key={i} style={{ marginBottom: 40 }}>
                    <h2>{g}</h2>
                    <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
                        {movies.slice(0, 10).map(movie => (
                            <div key={movie.id} style={{ width: 150, textAlign: "center" }}>
                                <img src={posterBase + movie.poster_path} alt={movie.title} style={{ width: "100%", borderRadius: 8 }} />
                                <p>{movie.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
