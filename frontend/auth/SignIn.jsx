import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signin.css';

const SignIn = () => {
    const [activeCard, setActiveCard] = useState('signin');
    const [showSuccess, setShowSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    // ======================
    // AUTH STATES (ADDED)
    // ======================
    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });

    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });

    const GoogleIcon = () => (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
    );

    const XIcon = () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
    );

    // ======================
    // SIGN UP SUBMIT (UPDATED)
    // ======================
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpData)
            });

            if (!res.ok) {
                alert("Signup failed (email may already exist)");
                return;
            }

            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setActiveCard('signin');
                setSignUpData({
                    fullName: "",
                    email: "",
                    phone: "",
                    password: ""
                });
            }, 1500);

        } catch (err) {
            alert("Server error");
        }
    };

    // ======================
    // SIGN IN SUBMIT (UPDATED)
    // ======================
    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signInData)
            });

            if (!res.ok) {
                alert("Invalid email or password");
                return;
            }

            const data = await res.json();

            // STORE AUTH DATA
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("role", data.role);

            setLoginSuccess(true);

            setTimeout(() => {
                navigate("/");
            }, 1200);

            // later → navigate("/dashboard")

        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <div className="auth-wrapper">

            {/* SUCCESS TOAST */}
            <div className={`success-toast ${showSuccess ? 'show' : ''}`}>
                <i className="bi bi-check-circle me-2"></i>
                Account created successfully!
            </div>
            <div className={`success-toast ${loginSuccess ? 'show' : ''}`}>
                <i className="bi bi-check-circle me-2"></i>
                Login successful! Redirecting...
            </div>

            <div className="cards-section single">
                <div className="auth-container">

                    {/* SIGN IN CARD */}
                    <div className={`auth-card ${activeCard === 'signin' ? 'front' : 'back'}`}>
                        <div className="card-header-gradient">
                            <div className="avatar-circle">
                                <div className="avatar-icon"></div>
                            </div>
                            <div className="header-text">
                                <div className="header-subtitle">Welcome back</div>
                                <h2 className="header-title">Sign In</h2>
                            </div>
                        </div>

                        <div className="card-body-custom">
                            <form onSubmit={handleSignInSubmit}>
                                <div className="form-group-custom">
                                    <label className="form-label-custom">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-input-custom"
                                        placeholder="your@email.com"
                                        required
                                        value={signInData.email}
                                        onChange={(e) =>
                                            setSignInData({ ...signInData, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group-custom">
                                    <label className="form-label-custom">Password</label>
                                    <input
                                        type="password"
                                        className="form-input-custom"
                                        placeholder="••••••••"
                                        required
                                        value={signInData.password}
                                        onChange={(e) =>
                                            setSignInData({ ...signInData, password: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="forgot-password">
                                    <a href="#forgot">Forgot password?</a>
                                </div>

                                <button type="submit" className="btn btn-primary-custom">
                                    Sign In
                                </button>
                            </form>

                            <div className="divider-custom"><span>OR</span></div>

                            <div className="social-login">
                                <button className="social-icon google"><GoogleIcon /></button>
                                <button className="social-icon x-twitter"><XIcon /></button>
                            </div>
                        </div>

                        <div className="card-footer-custom">
                            Don&apos;t have an account?{' '}
                            <a href="#signup" onClick={(e) => { e.preventDefault(); setActiveCard('signup'); }}>
                                Sign Up
                            </a>
                        </div>
                    </div>

                    {/* SIGN UP CARD */}
                    <div className={`auth-card ${activeCard === 'signup' ? 'front' : 'back'}`}>
                        <div className="card-header-gradient">
                            <div className="avatar-circle">
                                <div className="avatar-icon"></div>
                            </div>
                            <div className="header-text">
                                <div className="header-subtitle">Join us today</div>
                                <h2 className="header-title">Sign Up</h2>
                            </div>
                        </div>

                        <div className="card-body-custom">
                            <form onSubmit={handleSignUpSubmit}>
                                <div className="form-group-custom">
                                    <label className="form-label-custom">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-input-custom"
                                        required
                                        value={signUpData.fullName}
                                        onChange={(e) =>
                                            setSignUpData({ ...signUpData, fullName: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group-custom">
                                    <label className="form-label-custom">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-input-custom"
                                        required
                                        value={signUpData.email}
                                        onChange={(e) =>
                                            setSignUpData({ ...signUpData, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group-custom">
                                    <label className="form-label-custom">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-input-custom"
                                        required
                                        value={signUpData.phone}
                                        onChange={(e) =>
                                            setSignUpData({ ...signUpData, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group-custom">
                                    <label className="form-label-custom">Password</label>
                                    <input
                                        type="password"
                                        className="form-input-custom"
                                        required
                                        value={signUpData.password}
                                        onChange={(e) =>
                                            setSignUpData({ ...signUpData, password: e.target.value })
                                        }
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary-custom">
                                    Sign Up
                                </button>
                            </form>
                        </div>

                        <div className="card-footer-custom">
                            Already have an account?{' '}
                            <a href="#signin" onClick={(e) => { e.preventDefault(); setActiveCard('signin'); }}>
                                Sign In
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignIn;
