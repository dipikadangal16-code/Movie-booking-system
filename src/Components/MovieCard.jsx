export default function MovieCard({ movie, onBook }) {
    const posterBase = "https://image.tmdb.org/t/p/w500"

    return (
        <div style={styles.card}>
            <img src={posterBase + movie.poster_path} alt={movie.title} style={styles.img} />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <button style={styles.button} onClick={onBook}>Book Now</button>
        </div>
    )
}

const styles = {
    card: {
        width: "150px",
        background: "#fff0f5",
        padding: "10px",
        borderRadius: "10px",
        textAlign: "center"
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
}
