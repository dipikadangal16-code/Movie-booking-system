import { Routes, Route } from "react-router-dom"

// Pages
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx"
import Register from "./Pages/Register.jsx"
import Profile from "./Pages/Profile.jsx"
import Contact from "./Pages/contact.jsx"
import Genre from "./Pages/Genre.jsx"
import Categories from "./Pages/Categories.jsx"

// Components
import Navbar from "./Pages/Navbar.jsx"
import SeatMap from "./Components/SeatMap.jsx"

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login loginUpdate={() => { }} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seatmap/:id" element={<SeatMap />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/genre" element={<Genre />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </>
    )
}
