import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link className="text-blue-600 hover:underline" to="/admin/movies">
                            Manage Movies
                        </Link>
                    </li>
                    <li>
                        <Link className="text-blue-600 hover:underline" to="/admin/theatres">
                            Manage Theatres
                        </Link>
                    </li>
                    <li>
                        <Link className="text-blue-600 hover:underline" to="/admin/showtimes">
                            Manage Showtimes
                        </Link>
                    </li>
                    <li>
                        <Link className="text-blue-600 hover:underline" to="/admin/bookings">
                            View Bookings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
