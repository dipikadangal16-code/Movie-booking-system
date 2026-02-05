import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/Firebase.js';

// -------------------- 20 Movies --------------------
export const movies = [
    { id: "movie_1", title: "Inception", genre: ["Sci-Fi", "Thriller"], rating: 8.8, synopsis: "A thief who enters dream worlds...", duration: 148, status: "now_showing", poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg", trailer: "https://www.youtube.com/embed/YoHD9XEInc0" },
    { id: "movie_2", title: "The Dark Knight", genre: ["Action", "Drama"], rating: 9.0, synopsis: "Batman raises the stakes...", duration: 152, status: "now_showing", poster_path: "/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg", trailer: "https://www.youtube.com/embed/EXeTwQWrcwY" },
    { id: "movie_3", title: "Interstellar", genre: ["Sci-Fi", "Adventure"], rating: 8.6, synopsis: "A journey through spacetime...", duration: 169, status: "coming_soon", poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", trailer: "https://www.youtube.com/embed/zSWdZVtXT7E" },
    { id: "movie_4", title: "Avengers: Endgame", genre: ["Action", "Sci-Fi"], rating: 8.4, synopsis: "The Avengers assemble one last time...", duration: 181, status: "now_showing", poster_path: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg", trailer: "https://www.youtube.com/embed/TcMBFSGVi1c" },
    { id: "movie_5", title: "Parasite", genre: ["Thriller", "Drama"], rating: 8.5, synopsis: "A dark tale of class divide...", duration: 132, status: "now_showing", poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", trailer: "https://www.youtube.com/embed/5xH0HfJHsaY" },
    { id: "movie_6", title: "Joker", genre: ["Crime", "Drama"], rating: 8.4, synopsis: "A troubled man descends into madness...", duration: 122, status: "now_showing", poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", trailer: "https://www.youtube.com/embed/zAGVQLHvwOY" },
    { id: "movie_7", title: "Dune", genre: ["Sci-Fi", "Adventure"], rating: 8.1, synopsis: "A noble family becomes embroiled in war...", duration: 155, status: "coming_soon", poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", trailer: "https://www.youtube.com/embed/n9xhJrPXop4" },
    { id: "movie_8", title: "The Matrix", genre: ["Sci-Fi", "Action"], rating: 8.7, synopsis: "A hacker discovers the truth about reality...", duration: 136, status: "now_showing", poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", trailer: "https://www.youtube.com/embed/vKQi3bBA1y8" },
    { id: "movie_9", title: "Titanic", genre: ["Romance", "Drama"], rating: 7.9, synopsis: "A love story aboard a doomed ship...", duration: 195, status: "now_showing", poster_path: "/kHXEpyfl6zqn8a6YuozZUujufXf.jpg", trailer: "https://www.youtube.com/embed/2e-eXJ6HgkQ" },
    { id: "movie_10", title: "Oppenheimer", genre: ["Drama", "History"], rating: 8.9, synopsis: "The story of the father of the atomic bomb...", duration: 180, status: "coming_soon", poster_path: "/od5b7WyhXuvI4n2pQ4mJgQBWxRv.jpg", trailer: "https://www.youtube.com/embed/bKsdt4Z-gPQ" },
    { id: "movie_11", title: "Avatar: The Way of Water", genre: ["Sci-Fi", "Adventure"], rating: 8.3, synopsis: "Jake Sully returns to Pandora...", duration: 192, status: "now_showing", poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", trailer: "https://www.youtube.com/embed/d9MyW72ELq0" },
    { id: "movie_12", title: "Black Panther: Wakanda Forever", genre: ["Action", "Adventure"], rating: 7.9, synopsis: "The legacy of Black Panther continues...", duration: 161, status: "now_showing", poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", trailer: "https://www.youtube.com/embed/_Z3QKkl1WyM" },
    { id: "movie_13", title: "Guardians of the Galaxy Vol. 3", genre: ["Action", "Sci-Fi"], rating: 8.0, synopsis: "The Guardians are back for one more adventure...", duration: 150, status: "coming_soon", poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg", trailer: "https://www.youtube.com/embed/2cv6jAHkLnc" },
    { id: "movie_14", title: "Doctor Strange in the Multiverse of Madness", genre: ["Action", "Fantasy"], rating: 7.5, synopsis: "Doctor Strange navigates multiple realities...", duration: 126, status: "now_showing", poster_path: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg", trailer: "https://www.youtube.com/embed/aWzlQ2N6qqg" },
    { id: "movie_15", title: "Spider-Man: No Way Home", genre: ["Action", "Adventure"], rating: 8.2, synopsis: "Spider-Man faces multiverse villains...", duration: 148, status: "now_showing", poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", trailer: "https://www.youtube.com/embed/JfVOs4VSpmA" },
    { id: "movie_16", title: "Thor: Love and Thunder", genre: ["Action", "Adventure"], rating: 6.8, synopsis: "Thor faces Gorr the God Butcher...", duration: 119, status: "coming_soon", poster_path: "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg", trailer: "https://www.youtube.com/embed/Go8nTmfrQd8" },
    { id: "movie_17", title: "Minions: The Rise of Gru", genre: ["Animation", "Comedy"], rating: 6.5, synopsis: "Gru's origins and adventures...", duration: 87, status: "now_showing", poster_path: "/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg", trailer: "https://www.youtube.com/embed/6DxjJzmYsXo" },
    { id: "movie_18", title: "Jurassic World: Dominion", genre: ["Action", "Adventure"], rating: 6.8, synopsis: "Dinosaurs are back...", duration: 146, status: "now_showing", poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg", trailer: "https://www.youtube.com/embed/0W2V5Q4Y1C0" },
    { id: "movie_19", title: "The Batman", genre: ["Action", "Crime"], rating: 7.9, synopsis: "Batman faces a new threat...", duration: 176, status: "now_showing", poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg", trailer: "https://www.youtube.com/embed/mqqft2x_Aa4" },
    { id: "movie_20", title: "Everything Everywhere All at Once", genre: ["Action", "Sci-Fi"], rating: 8.1, synopsis: "A multiverse adventure...", duration: 139, status: "coming_soon", poster_path: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", trailer: "https://www.youtube.com/embed/wxN1T1uxQ2g" }
];

// -------------------- Theatres --------------------
export const theatres = [
    { id: "theatre_1", name: "Grand Cinema", location: "Downtown" },
    { id: "theatre_2", name: "City Plex", location: "Mall Road" },
    { id: "theatre_3", name: "IMAX Arena", location: "Tech Park" }
];

// -------------------- Showtimes --------------------
export const showtimes = [
    { id: "show_1", movieId: "movie_1", theatreId: "theatre_1", time: "10:30" },
    { id: "show_2", movieId: "movie_1", theatreId: "theatre_1", time: "18:45" },
    { id: "show_3", movieId: "movie_2", theatreId: "theatre_1", time: "21:00" },
    { id: "show_4", movieId: "movie_3", theatreId: "theatre_2", time: "16:30" },
    { id: "show_5", movieId: "movie_4", theatreId: "theatre_2", time: "14:00" },
    { id: "show_6", movieId: "movie_5", theatreId: "theatre_1", time: "19:15" },
    { id: "show_7", movieId: "movie_6", theatreId: "theatre_2", time: "22:00" },
    { id: "show_8", movieId: "movie_7", theatreId: "theatre_3", time: "15:00" },
    { id: "show_9", movieId: "movie_8", theatreId: "theatre_3", time: "20:45" },
    { id: "show_10", movieId: "movie_9", theatreId: "theatre_1", time: "17:00" }
];

// -------------------- Generate Seats --------------------
function generateSeats(showTimeId) {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    rows.forEach(row => {
        for (let col = 1; col <= 10; col++) {
            seats.push({
                id: `${showTimeId}_${row}${col}`,
                showTimeId,
                seatId: `${row}${col}`,
                lockedBy: null,
                lockedAT: null,
                bookingId: null,
                type: (row === "A" || row === "B") ? "VIP" : "Regular"
            });
        }
    });
    return seats;
}

// -------------------- Seed Firestore --------------------
export async function seedFirestore() {
    console.log("Starting Seeding...");

    for (const movie of movies) await setDoc(doc(db, 'movies', movie.id), movie);
    console.log("Movies seeded");

    for (const theatre of theatres) await setDoc(doc(db, 'theatres', theatre.id), theatre);
    console.log("Theatres seeded");

    for (const showtime of showtimes) await setDoc(doc(db, 'showtimes', showtime.id), showtime);
    console.log("Showtimes seeded");

    for (const show of showtimes) {
        const seats = generateSeats(show.id);
        for (const seat of seats) await setDoc(doc(db, 'seats', seat.id), seat);
    }
    console.log("Seats seeded");
}
