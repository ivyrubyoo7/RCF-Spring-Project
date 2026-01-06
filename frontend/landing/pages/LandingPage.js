import React, { useState } from 'react';
import './LandingPage.css';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    // ==========================
    // AUTH STATE
    // ==========================
    const [showMenu, setShowMenu] = useState(false);
    const isLoggedIn = !!localStorage.getItem("token");

    // ==========================
    // LOGOUT HANDLER
    // ==========================
    const handleLogout = () => {
        localStorage.clear();        // reset login process
        setShowMenu(false);
        navigate("/");               // back to landing page
    };

    // Smooth scroll
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page">

            {/* ========== NAVBAR ========== */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">

                    {/* LOGO + TITLE */}
                    <a className="navbar-brand fw-bold d-flex align-items-center" href="#home">
                        {/* 🔴 LOGO PLACEHOLDER – YOU CAN REPLACE THIS LINK */}
                        <img
                            src="https://media.licdn.com/dms/image/v2/C4E0BAQEvuDrrZoG0lA/company-logo_200_200/company-logo_200_200/0/1631356392891?e=1769040000&v=beta&t=SJnEto-Qix5OYQZ2kANwceDUa064dFlkKSvTxrh6xFA"
                            alt="RCF Logo"
                            style={{ width: "36px", height: "36px", marginRight: "10px" }}
                        />
                        RCF Ltd.
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">

                            <li className="nav-item">
                                <a className="nav-link" href="#home"
                                   onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                                    Home
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/assets/add"
                                   onClick={(e) => { e.preventDefault(); navigate("/assets/add"); }}>
                                    Assets
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#features"
                                   onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
                                    Attendance
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#features"
                                   onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
                                    Permit
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#about"
                                   onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                                    About
                                </a>
                            </li>

                            {/* ==========================
                                LOGIN / USER ICON + DROPDOWN
                               ========================== */}
                            <li className="nav-item ms-lg-3 position-relative">

                                {!isLoggedIn ? (
                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </button>
                                ) : (
                                    <>
                                        {/* USER ICON */}
                                        <button
                                            className="btn btn-outline-light rounded-circle"
                                            style={{ width: "42px", height: "42px" }}
                                            onClick={() => setShowMenu(!showMenu)}
                                        >
                                            <i className="bi bi-person-fill"></i>
                                        </button>

                                        {/* DROPDOWN MENU */}
                                        {showMenu && (
                                            <div
                                                className="dropdown-menu show shadow"
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "50px",
                                                    minWidth: "160px"
                                                }}
                                            >
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setShowMenu(false);
                                                        navigate("/admin/dashboard");
                                                    }}
                                                >
                                                    <i className="bi bi-speedometer2 me-2"></i>
                                                    Dashboard
                                                </button>

                                                <div className="dropdown-divider"></div>

                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={handleLogout}
                                                >
                                                    <i className="bi bi-box-arrow-right me-2"></i>
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            {/* ========== 2. HERO SECTION ========== */}
            <section id="home" className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-8 mx-auto text-center">
                            <h1 className="display-3 fw-bold mb-4">
                                Centralized Plant Asset & Permit Management System
                            </h1>
                            <p className="lead mb-4 text-muted">
                                Streamline your industrial operations with our comprehensive
                                management platform. Track IT assets, monitor attendance,
                                enforce safety rules, and authorize work permits—all in one
                                integrated solution built for enterprise excellence.
                            </p>
                            <div className="hero-features mb-5">
                                <div className="row g-3 justify-content-center">
                                    <div className="col-md-3">
                                        <div className="feature-badge">
                                            <i className="bi bi-laptop me-2"></i>
                                            Asset Tracking
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="feature-badge">
                                            <i className="bi bi-calendar-check me-2"></i>
                                            Attendance
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="feature-badge">
                                            <i className="bi bi-shield-check me-2"></i>
                                            Safety Rules
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="feature-badge">
                                            <i className="bi bi-file-earmark-text me-2"></i>
                                            Work Permits
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn btn-primary btn-lg px-5 py-3"
                                onClick={() => scrollToSection('features')}
                            >
                                Get Started
                                <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== 3. FEATURES / VISUALIZATION SECTION ========== */}
            <section id="features" className="features-section py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">System Overview</h2>
                        <p className="lead text-muted">
                            Four integrated modules designed for operational excellence
                        </p>
                    </div>

                    <div className="row g-4">
                        {/* Feature Card 1: IT Asset Tracking */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card feature-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-laptop display-4 text-primary"></i>
                                    </div>
                                    <h5 className="card-title fw-bold mb-3">IT Asset Tracking</h5>
                                    <p className="card-text text-muted">
                                        Maintain a comprehensive inventory of all IT equipment,
                                        computers, servers, and network devices. Track assignment,
                                        location, warranty, and maintenance schedules with ease.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 2: Attendance Management */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card feature-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-calendar-check display-4 text-success"></i>
                                    </div>
                                    <h5 className="card-title fw-bold mb-3">
                                        Attendance Management
                                    </h5>
                                    <p className="card-text text-muted">
                                        Digital attendance tracking with real-time monitoring.
                                        Generate reports, track working hours, manage leaves, and
                                        ensure compliance with labor regulations effortlessly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 3: Rules & Compliance */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card feature-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-shield-check display-4 text-warning"></i>
                                    </div>
                                    <h5 className="card-title fw-bold mb-3">
                                        Rules & Compliance
                                    </h5>
                                    <p className="card-text text-muted">
                                        Centralized repository of safety protocols, operational
                                        guidelines, and regulatory requirements. Ensure all
                                        personnel are informed and compliant with current standards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Card 4: Permit-to-Work System */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card feature-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-file-earmark-text display-4 text-danger"></i>
                                    </div>
                                    <h5 className="card-title fw-bold mb-3">
                                        Permit-to-Work System
                                    </h5>
                                    <p className="card-text text-muted">
                                        Streamlined authorization workflow for hazardous work
                                        activities. Digital approvals, safety checklists, and
                                        real-time permit status tracking for enhanced safety.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== 4. PEOPLE / CONTRIBUTORS SECTION ========== */}
            <section id="contributors" className="contributors-section py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Leadership & Contributors</h2>
                        <p className="lead text-muted">
                            Meet the team driving operational excellence
                        </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {/* Profile Card 1: CEO / Plant Head */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card people-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="profile-image-wrapper mb-3">
                                        <img
                                            src="https://www.indianchemicalnews.com/public/uploads/news/2025/12/28702/Rakesh_Mehta__COO_North__HNGIL.jpeg"
                                            alt="Plant Head"
                                            className="profile-image rounded-circle"
                                        />
                                    </div>
                                    <h5 className="card-title fw-bold mb-1">Shri Nitin Hirde</h5>
                                    <p className="text-primary fw-semibold mb-2">
                                        Chairman & MD for RCFL
                                    </p>
                                    <p className="card-text text-muted small">
                                        {/*Leading strategic operations and driving digital*/}
                                        {/*transformation initiatives across the plant with over 20*/}
                                        {/*years of industry experience.*/}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Card 2: IT Manager */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card people-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="profile-image-wrapper mb-3">
                                        <img
                                            src="https://static.india.com/wp-content/uploads/2024/03/QT-PM3.jpg?impolicy=Medium_Resize&w=1200&h=800"
                                            alt="IT Manager"
                                            className="profile-image rounded-circle"
                                        />
                                    </div>
                                    <h5 className="card-title fw-bold mb-1">Narendra Modi</h5>
                                    <p className="text-success fw-semibold mb-2"> Prime Minister of India</p>
                                    <p className="card-text text-muted small">
                                        {/*Overseeing IT infrastructure, asset management systems, and*/}
                                        {/*ensuring seamless technology integration across all*/}
                                        {/*departments.*/}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Card 3: Safety Officer */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card people-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="profile-image-wrapper mb-3">
                                        <img
                                            src="https://cdn.siasat.com/wp-content/uploads/2024/06/Untitled-design-2024-06-21T151537.932.jpg"
                                            alt="Safety Officer"
                                            className="profile-image rounded-circle"
                                        />
                                    </div>
                                    <h5 className="card-title fw-bold mb-1">Devendra Fadnavis</h5>
                                    <p className="text-warning fw-semibold mb-2">
                                        Chief Minister of Maharashtra

                                    </p>
                                    <p className="card-text text-muted small">
                                        {/*Responsible for safety compliance, permit authorization*/}
                                        {/*workflows, and maintaining the highest standards of*/}
                                        {/*workplace safety.*/}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Card 4: Developer / Intern */}
                        <div className="col-lg-6 col-xl-3">
                            <div className="card people-card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="profile-image-wrapper mb-3">
                                        <img
                                            src="https://taxconcept.net/wp-content/uploads/2022/09/Anupriya-Patel-Apna-Dal-2-20b0a11f.jpg"
                                            alt="Developer"
                                            className="profile-image rounded-circle"
                                        />
                                    </div>
                                    <h5 className="card-title fw-bold mb-1">Smt. Anupriya Patel</h5>
                                    <p className="text-danger fw-semibold mb-2">
                                        Minister of State for Health and Family Welfare of India

                                    </p>
                                    <p className="card-text text-muted small">
                                        {/*Developing and maintaining the integrated management system*/}
                                        {/*using Java Spring Boot and React for modern enterprise*/}
                                        {/*solutions.*/}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== 5. FOOTER SECTION ========== */}
            <footer className="footer bg-dark text-white py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <h5 className="fw-bold mb-3">
                                <i className="bi bi-building me-2"></i>
                                Plant Asset Manager
                            </h5>
                            <p className="text-white-50">
                                Comprehensive enterprise solution for asset tracking, attendance
                                management, safety compliance, and work permit authorization.
                            </p>
                        </div>

                        <div className="col-lg-4">
                            <h5 className="fw-bold mb-3">Quick Links</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a
                                        href="#home"
                                        className="text-white-50 text-decoration-none"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('home');
                                        }}
                                    >
                                        <i className="bi bi-chevron-right me-2"></i>Home
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#features"
                                        className="text-white-50 text-decoration-none"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('features');
                                        }}
                                    >
                                        <i className="bi bi-chevron-right me-2"></i>Assets
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#features"
                                        className="text-white-50 text-decoration-none"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('features');
                                        }}
                                    >
                                        <i className="bi bi-chevron-right me-2"></i>Attendance
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        href="#features"
                                        className="text-white-50 text-decoration-none"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('features');
                                        }}
                                    >
                                        <i className="bi bi-chevron-right me-2"></i>Permit
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-4">
                            <h5 className="fw-bold mb-3">Contact Information</h5>
                            <ul className="list-unstyled text-white-50">
                                <li className="mb-2">
                                    <i className="bi bi-geo-alt-fill me-2"></i>
                                    Industrial Area, Plant Site
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-envelope-fill me-2"></i>
                                    info@plantassetmanager.com
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    +91 9999999999
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-4 bg-white opacity-25" />

                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="mb-0 text-white-50">
                                &copy; 2024 Plant Asset Manager. All rights reserved.
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0 text-white-50">
                                Built with Java Spring Boot & React
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;