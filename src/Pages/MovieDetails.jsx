import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const API_KEY = "80d491707d8cf7b38aa19c7ccab0952f";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState("");
    const [selectedTheatre, setSelectedTheatre] = useState("");
    const [showDropdown, setShowDropdown] = useState(true);
    const [showtimes, setShowtimes] = useState([]);

    /* ---------------- FETCH MOVIE DETAILS ---------------- */
    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
                );
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchMovie();
    }, [id]);

    /* ---------------- FETCH TRAILER ---------------- */
    useEffect(() => {
        async function fetchTrailer() {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
                );
                const data = await res.json();

                const trailerVideo = data.results?.find(
                    (v) => v.type === "Trailer" && v.site === "YouTube"
                );

                if (trailerVideo) {
                    setTrailer(
                        `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1`
                    );
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchTrailer();
    }, [id]);

    /* ---------------- SHOWTIMES (STATIC) ---------------- */
    useEffect(() => {
        if (!selectedTheatre) return;
        setShowtimes(["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"]);
    }, [selectedTheatre]);

    if (!movie) return <p style={{ textAlign: "center" }}>Loading movie details...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <div style={styles.container}>

                {/* LEFT SIDE */}
                <div style={styles.left}>
                    <h1 style={{ color: "#ff1493" }}>{movie.title}</h1>

                    {movie.poster_path && (
                        <img
                            src={POSTER_BASE + movie.poster_path}
                            alt={movie.title}
                            style={styles.poster}
                        />
                    )}

                    <p>{movie.overview}</p>
                    <p><strong>Release:</strong> {movie.release_date}</p>
                    <p><strong>Runtime:</strong> {movie.runtime || 120} mins</p>

                    {showDropdown ? (
                        <>
                            <h3>Select Theatre</h3>
                            <select
                                value={selectedTheatre}
                                onChange={(e) => {
                                    setSelectedTheatre(e.target.value);
                                    setShowDropdown(false);
                                }}
                            >
                                <option value="">--Choose Theatre--</option>
                                <option value="QFX">QFX Cinema</option>
                                <option value="FCUBE">FCube</option>
                                <option value="RANJANA">Ranjana</option>
                            </select>
                        </>
                    ) : (
                        <>
                            <h4>Showtimes</h4>
                            {showtimes.map((time, i) => (
                                <button
                                    key={i}
                                    onClick={() =>
                                        navigate(`/seatmap/${id}`, {
                                            state: {
                                                movie,
                                                theatre: { name: selectedTheatre },
                                                showtime: { id: `${id}-${selectedTheatre}-${i}`, time }
                                            }
                                        })
                                    }
                                    style={styles.timeBtn}
                                >
                                    {time}
                                </button>
                            ))}

                            <br />
                            <button
                                onClick={() => {
                                    setShowDropdown(true);
                                    setSelectedTheatre("");
                                    setShowtimes([]);
                                }}
                                style={styles.changeBtn}
                            >
                                Change Theatre
                            </button>
                        </>
                    )}
                </div>

                {/* RIGHT SIDE – TRAILER */}
                <div style={styles.right}>
                    {trailer ? (
                        <iframe
                            src={trailer}
                            title="Movie Trailer"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            style={styles.trailer}
                        />
                    ) : (
                        <p>No trailer available</p>
                    )}
                </div>

            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        gap: "30px",
        alignItems: "flex-start",
    },
    left: {
        width: "350px",
    },
    poster: {
        width: "100%",
        height: "520px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "10px",
    },
    right: {
        flex: 1,
        height: "520px",
    },
    trailer: {
        width: "100%",
        height: "520px",
        borderRadius: "10px",
    },
    timeBtn: {
        margin: "5px",
        padding: "6px 12px",
        background: "#ff1493",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
    changeBtn: {
        marginTop: "10px",
        padding: "6px 12px",
        background: "black",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
};