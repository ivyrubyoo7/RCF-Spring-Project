import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // ❌ Not logged in → redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Logged in → allow access
    return children;
};

export default ProtectedRoute;
