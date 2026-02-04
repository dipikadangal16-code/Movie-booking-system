import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function UserDashboard() {
    const user = auth.currentUser;

    return (
        <div className="dashboard">
            <h2>Welcome, {user?.email}</h2>

            <nav>
                <Link to="/dashboard/bookings">My Bookings</Link>
                <button onClick={() => signOut(auth)}>Logout</button>
            </nav>
        </div>
    );
}
