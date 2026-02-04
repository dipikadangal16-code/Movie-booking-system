import { db } from "../config/Firebase";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

// TMDb API
const TMDB_API = "https://api.themoviedb.org/3/discover/movie?api_key=80d491707d8cf7b38aa19c7ccab0952f";

export async function seedTMDbMovies() {
    try {
        console.log("Fetching movies from TMDb...");
        const res = await fetch(TMDB_API);
        const data = await res.json();
        const movies = data.results;

        if (!movies || movies.length === 0) {
            console.log("No movies fetched from TMDb");
            return;
        }

        // 1️⃣ Delete existing movies
        const movieSnapshot = await getDocs(collection(db, "movies"));
        for (const docSnap of movieSnapshot.docs) {
            await deleteDoc(doc(db, "movies", docSnap.id));
        }
        console.log("Existing movies deleted.");

        // 2️⃣ Add TMDb movies
        const moviePromises = movies.map(async (movie) => {
            const movieData = {
                id: `movie_${movie.id}`,
                title: movie.title,
                genre: movie.genre_ids || [],
                rating: movie.vote_average,
                synopsis: movie.overview,
                duration: 120, // default
                status: "now_showing",
                poster_path: movie.poster_path,
                release_date: movie.release_date,
            };
            await setDoc(doc(db, "movies", movieData.id), movieData);
        });

        await Promise.all(moviePromises);
        console.log("Seeding complete! TMDb movies added to Firestore.");
    } catch (error) {
        console.error("TMDb seeding failed:", error);
    }
}
