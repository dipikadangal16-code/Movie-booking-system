import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

export default function AdminTheatres() {
    const [theatres, setTheatres] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        const fetchTheatres = async () => {
            const snapshot = await getDocs(collection(db, "theatres"));
            setTheatres(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchTheatres();
    }, []);

    const addTheatre = async () => {
        if (!name || !location) return alert("Enter name and location");
        const id = `theatre_${Date.now()}`;
        await setDoc(doc(db, "theatres", id), { id, name, location });
        setTheatres([...theatres, { id, name, location }]);
        setName("");
        setLocation("");
    };

    const removeTheatre = async (id) => {
        await deleteDoc(doc(db, "theatres", id));
        setTheatres(theatres.filter(t => t.id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Theatres</h2>
            <div className="mb-4 flex gap-2">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2" />
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="border p-2" />
                <button onClick={addTheatre} className="bg-blue-600 text-white px-4 py-2 rounded">Add Theatre</button>
            </div>
            <ul>
                {theatres.map(t => (
                    <li key={t.id} className="flex justify-between mb-2 border p-2 rounded">
                        {t.name} ({t.location})
                        <button onClick={() => removeTheatre(t.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
