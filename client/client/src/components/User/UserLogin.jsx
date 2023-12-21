/* eslint-disable react/no-unescaped-entities */
// Login.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./User.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleHomeClick = () => {
    // Navigate to the home page
    navigate("/");
  };
  const handleLoginClick = () => {
    // Simulating a basic login validation
    if (username === "admin" && password === "password") {
      // Navigate to the home page after successful login
      navigate("/");
      setError(""); // Clear any previous error
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="background-image">
      <div className="small-card">
        <div className="grid-button" id="grid-button" onClick={handleHomeClick}>
          <FaHome />
        </div>
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
        <p>
          Don't have an account? <Link to="/adminlogin">Are you a Admin?</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
