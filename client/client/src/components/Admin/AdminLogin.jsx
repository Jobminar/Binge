import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AdminLogin.css";
import BgImage from "../../assets/images/Home-bg-img.jpeg";
import logoImg from "../../assets/images/logo.png";

const LoggedInPage = () => {
  return (
    <div className="logged-in-page">
      <div className="logo-container">
        <img src={logoImg} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

const AdminLogin = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    // Simulating a basic login validation
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setError(""); // Clear any previous error
    } else {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Delay navigation for 5 seconds after successful login
      const timerId = setTimeout(() => {
        handleLogin();
      }, 2000);

      // Clear the timer if the component unmounts or user navigates before the delay
      return () => clearTimeout(timerId);
    }
  }, [isLoggedIn, handleLogin]);

  return (
    <div className="background-image">
      {isLoggedIn ? (
        <LoggedInPage />
      ) : (
        <div className="card" id="logincard">
          <div className="card-body">
            <h2 className="text-center mb-4">Admin Login</h2>
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
                className="btn btn-danger"
                onClick={handleLoginClick}
                style={{ width: "100%", backgroundColor: "#b36c6c" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

AdminLogin.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default AdminLogin;
