import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MovieCard from "../Components/MovieCard.jsx"

export default function Home() {
  const [movies, setMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=80d491707d8cf7b38aa19c7ccab0952f")
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(err => console.error(err))
  }, [])

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % movies.length)

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#ff1493", textAlign: "center" }}>Welcome to CineBook</h1>
      <p style={{ textAlign: "center" }}>
        <button
          style={styles.bookNow}
          onClick={() => navigate("/profile")}
        >
          Book Now
        </button>
      </p>

      <h2 style={{ color: "#ff1493", marginTop: "50px" }}>Popular Movies</h2>
      <div style={styles.slider}>
        <button style={styles.arrow} onClick={handlePrev}>&lt;</button>
        <div style={styles.cards}>
          {movies.slice(currentIndex, currentIndex + 5).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onBook={() => navigate(`/seatmap/${movie.id}`)} // Book Now opens seat booking
            />
          ))}
        </div>
        <button style={styles.arrow} onClick={handleNext}>&gt;</button>
      </div>
    </div>
  )
}

const styles = {
  slider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  cards: {
    display: "flex",
    gap: "10px",
    overflow: "hidden",
    flex: 1
  },
  arrow: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  bookNow: {
    padding: "10px 20px",
    background: "#ff1493",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
}
