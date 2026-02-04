import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

export default function AdminShowtimes() {
    const [showtimes, setShowtimes] = useState([]);
    const [movieId, setMovieId] = useState("");
    const [theatreId, setTheatreId] = useState("");
    const [time, setTime] = useState("");

    const [movies, setMovies] = useState([]);
    const [theatres, setTheatres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const movieSnap = await getDocs(collection(db, "movies"));
            setMovies(movieSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const theatreSnap = await getDocs(collection(db, "theatres"));
            setTheatres(theatreSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const showSnap = await getDocs(collection(db, "showtimes"));
            setShowtimes(showSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchData();
    }, []);

    const addShowtime = async () => {
        if (!movieId || !theatreId || !time) return alert("Fill all fields");
        const id = `show_${Date.now()}`;
        await setDoc(doc(db, "showtimes", id), { id, movieId, theatreId, time });
        setShowtimes([...showtimes, { id, movieId, theatreId, time }]);
        setMovieId(""); setTheatreId(""); setTime("");
    };

    const removeShowtime = async (id) => {
        await deleteDoc(doc(db, "showtimes", id));
        setShowtimes(showtimes.filter(s => s.id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Showtimes</h2>

            <div className="mb-4 flex gap-2">
                <select value={movieId} onChange={e => setMovieId(e.target.value)} className="border p-2">
                    <option value="">Select Movie</option>
                    {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                </select>

                <select value={theatreId} onChange={e => setTheatreId(e.target.value)} className="border p-2">
                    <option value="">Select Theatre</option>
                    {theatres.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>

                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="border p-2" />
                <button onClick={addShowtime} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
            </div>

            <ul>
                {showtimes.map(s => (
                    <li key={s.id} className="flex justify-between mb-2 border p-2 rounded">
                        Movie: {movies.find(m => m.id === s.movieId)?.title || s.movieId},
                        Theatre: {theatres.find(t => t.id === s.theatreId)?.name || s.theatreId},
                        Time: {s.time}
                        <button onClick={() => removeShowtime(s.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
