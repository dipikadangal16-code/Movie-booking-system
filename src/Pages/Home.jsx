import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MovieCard from "../Components/MovieCard.jsx"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../config/Firebase.js"

export default function Home() {
  const [movies, setMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  // Fetch movies from Firestore
  useEffect(() => {
    async function fetchMovies() {
      const snapshot = await getDocs(collection(db, "movies"))
      const movieList = snapshot.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(m => m.status === "now_showing") // Only now showing
      setMovies(movieList)
    }
    fetchMovies()
  }, [])

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % movies.length)

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <h1 style={{ color: "#ff1493", textAlign: "center" }}>Welcome to CineBook</h1>

      {/* Now Showing Slider */}
      {movies.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading movies...</p>
      ) : (
        <>
          <h2 style={{ color: "#ff1493", marginTop: "40px", textAlign: "center" }}>
            Now Showing
          </h2>
          <div style={styles.slider}>
            <button style={styles.arrow} onClick={handlePrev}>&lt;</button>
            <div style={styles.cards}>
              {movies.slice(currentIndex, currentIndex + 5).map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onBook={() => navigate(`/movie/${movie.id}`)} // Open movie details page
                />
              ))}
            </div>
            <button style={styles.arrow} onClick={handleNext}>&gt;</button>
          </div>
        </>
      )}
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
  }
}