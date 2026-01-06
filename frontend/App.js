import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./landing/pages/LandingPage";
import AddAssets from "./assets/AddAssets";
import SignIn from "./auth/SignIn";
import AdminDashboard from "./Dashboard/Admindashboard"; // ✅ ADD THIS
import ProtectedRoute from "./auth/ProtectedRoute"; // ⬅ add import

// Bootstrap CSS & JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {

    const [assets, setAssets] = useState([]);
    const [error, setError] = useState("");

    // =========================
    // FETCH ASSETS (ONLY IF LOGGED IN)
    // =========================
    const fetchAssets = () => {
        const token = localStorage.getItem("token");

        // 🚫 Do NOT call backend if not authenticated
        if (!token) {
            setError("");
            return;
        }

        fetch("http://localhost:8080/api/assets", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch assets");
                }
                return response.json();
            })
            .then((data) => {
                setAssets(data);
                setError("");
            })
            .catch(() => {
                setError("");
            });
    };

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {
        fetchAssets();
    }, []);

    return (
        <Router>
            <div className="App">

                <Routes>
                    {/* Landing Page */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Login Page */}
                    <Route path="/login" element={<SignIn />} />

                    {/* Add Asset Page */}
                    <Route path="/assets/add" element={<AddAssets />} />

                    {/* ✅ ADMIN DASHBOARD */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </div>
        </Router>
    );
}

export default App;
