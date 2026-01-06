import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admindashboard.css";

const ITEMS_PER_PAGE = 5;

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [assets, setAssets] = useState([]);
    const [sortBy, setSortBy] = useState("latest");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // ==========================
    // FETCH ASSETS FROM DB
    // ==========================
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:8080/api/assets", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch assets");
                return res.json();
            })
            .then(data => {
                setAssets(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [navigate]);

    // ==========================
    // LOGOUT
    // ==========================
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // ==========================
    // DELETE ASSET
    // ==========================
    const handleDelete = (id) => {
        if (!window.confirm("Delete this asset?")) return;

        fetch(`http://localhost:8080/api/assets/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(() => {
            setAssets(prev => prev.filter(a => a.id !== id));
        });
    };

    // ==========================
    // FILTER + SORT + PAGINATION
    // ==========================
    const filteredAssets = assets.filter(a =>
        a.model?.toLowerCase().includes(search.toLowerCase()) ||
        a.assetType?.toLowerCase().includes(search.toLowerCase()) ||
        a.department?.toLowerCase().includes(search.toLowerCase())
    );

    const sortedAssets = [...filteredAssets].sort((a, b) => {
        if (sortBy === "latest") return b.id - a.id;
        if (sortBy === "oldest") return a.id - b.id;
        if (sortBy === "brand")
            return (a.model || "").localeCompare(b.model || "");
        return 0;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedAssets = sortedAssets.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(sortedAssets.length / ITEMS_PER_PAGE);

    // ==========================
    // STATS
    // ==========================
    const stats = [
        { title: "Total Assets", value: assets.length },
        { title: "Available Assets", value: Math.floor(assets.length * 0.3) },
        { title: "Assigned Assets", value: Math.floor(assets.length * 0.7) },
        { title: "Departments", value: 4 }
    ];

    return (
        <div className="dashboard-container">

            {/* ========== SIDEBAR ========== */}
            <aside className="sidebar">
                <h2 className="sidebar-title">IT Asset Hub</h2>

                <div
                    className="nav-item active"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Dashboard
                </div>

                <div
                    className="nav-item"
                    onClick={() => navigate("/assets/add")}
                >
                    Assets
                </div>

                <div className="nav-item">Users</div>
                <div className="nav-item">Reports</div>

                <div
                    className="nav-item text-danger mt-auto"
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </aside>

            {/* ========== MAIN CONTENT ========== */}
            <main className="main-content">

                <h1 className="page-title">Dashboard Overview</h1>

                {/* ===== SECTION 1: VISUALS ===== */}
                <section className="row g-4">
                    <div className="col-md-6">
                        <div className="card p-4">
                            <h6 className="mb-3">Asset Distribution</h6>
                            <div className="circle-chart"></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card p-4">
                            <h6 className="mb-3">Growth Trend</h6>
                            <div className="line-chart">
                                <span></span><span></span><span></span>
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 2: STATS ===== */}
                <section className="row g-4 mt-3">
                    {stats.map((s, i) => (
                        <div className="col-md-3" key={i}>
                            <div className="card text-center p-3">
                                <h3>{s.value}</h3>
                                <p>{s.title}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* ===== SECTION 3: TABLE ===== */}
                <section className="card mt-4">

                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5>Assets Inventory</h5>

                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />

                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                                <option value="brand">Brand (A–Z)</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        {loading ? (
                            <p className="p-3">Loading assets...</p>
                        ) : (
                            <table className="table table-hover mb-0">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Model</th>
                                    <th>Model Number</th>
                                    <th>Type</th>
                                    <th>Department</th>
                                    <th>In Charge</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedAssets.map(a => (
                                    <tr key={a.id}>
                                        <td>{a.id}</td>
                                        <td>{a.model}</td>
                                        <td>{a.modelNumber}</td>
                                        <td>{a.assetType}</td>
                                        <td>{a.department}</td>
                                        <td>{a.inCharge}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(a.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* PAGINATION */}
                    <div className="d-flex justify-content-end p-3 gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`btn btn-sm ${
                                    currentPage === i + 1
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                </section>

            </main>
        </div>
    );
};

export default AdminDashboard;
