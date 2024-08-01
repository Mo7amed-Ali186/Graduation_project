import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { toast } from "react-hot-toast";

export const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        if (!email || !code || !password || !confirmPassword) {
            setError("All fields are required");
            return false;
        }
        if (!validateEmail(email)) {
            setError("Invalid email address");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        // Add additional validation rules here if needed
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        // Call your API here to reset the password
        try {
            debugger;
            const response = await axios.put(
                `${API_BASE_URL}/auth/forgetPassword/${email}`,
                {
                    code,
                    password,
                    cPassword: confirmPassword,
                }
            );

            // Handle success response
            toast.success("Password reset successfully");
            setTimeout(() => {
                navigate("/login");
            }, 500);
            console.log("Password reset successfully");
        } catch (error) {
            console.error("Error resetting password:", error.message);
            setError("Failed to reset password. Please try again later.");
        }
    };

    return (
        <div className="container-fluid bg-primary">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="card-title text-center mb-4">
                        Reset Password
                    </h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Code:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-danger btn-block mt-5 d-block"
                            style={{
                                width: "50%",
                                margin: "0 auto",
                            }}
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
