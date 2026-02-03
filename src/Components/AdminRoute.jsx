import { Navigate } from "react-router-dom"
import { auth } from "../config/Firebase"

const AdminRoute = ({ children }) => {
    const isAdmin = auth.currentUser?.email === "admin@cinebook.com"
    return isAdmin ? children : <Navigate to="/" />
}

export default AdminRoute
