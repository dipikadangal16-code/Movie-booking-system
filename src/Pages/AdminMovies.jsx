import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

export default function AdminMovies() {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");

    // Fetch movies from Firestore
    useEffect(() => {
        const fetchMovies = async () => {
            const snapshot = await getDocs(collection(db, "movies"));
            setMovies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchMovies();
    }, []);

    // Add movie
    const addMovie = async () => {
        if (!title) return alert("Enter movie title");
        const id = `movie_${Date.now()}`;
        await setDoc(doc(db, "movies", id), { id, title });
        setMovies([...movies, { id, title }]);
        setTitle("");
    };

    // Delete movie
    const removeMovie = async (id) => {
        await deleteDoc(doc(db, "movies", id));
        setMovies(movies.filter(m => m.id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Movies</h2>
            <div className="mb-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Movie Title"
                    className="border p-2 mr-2"
                />
                <button onClick={addMovie} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add Movie
                </button>
            </div>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id} className="flex justify-between mb-2 border p-2 rounded">
                        {movie.title}
                        <button
                            onClick={() => removeMovie(movie.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
