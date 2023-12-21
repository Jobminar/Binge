// Import necessary dependencies and components
import { useState } from "react";
import PropTypes from "prop-types";

// Import the components for various functionalities
import GetUsers from "./GetUsers";
import GetSlots from "./GetSlots";
import GetCakes from "./GetCakes";
import GetOrders from "./GetOrders";
// import GetContactUs from "./GetContactUs";
import Getbookings from "./GetBookings";
import Decorations from "./Decorations";
import AllReports from "./Reports/AllReports";
import TheatrePrice from "./TheatrePricing";
// Import images and styles
import BgImage from "../../assets/images/Home-bg-img.jpeg";
import logoImg from "../../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

// Define the AdminDashboard component
const AdminDashboard = ({ handleLogout }) => {
  // State to track the active module
  const [activeModule, setActiveModule] = useState("GetOrders");

  // Function to render the active module based on the state
  const renderModule = () => {
    switch (activeModule) {
      case "GetUsers":
        return <GetUsers />;
      case "GetSlots":
        return <GetSlots />;
      case "GetCakes":
        return <GetCakes />;
      case "GetOrders":
        return <GetOrders />;
      case "GetBookings":
        return <Getbookings />;
      case "Decorations":
        return <Decorations />;
      case "Reports":
        return <AllReports />;
      case "Theatres":
        return <TheatrePrice />;
      default:
        return null;
    }
  };

  // Function to handle navigation item click
  const handleNavItemClick = (module) => {
    setActiveModule(module);
    console.log(`Clicked on ${module}`);
  };

  // Function to handle logout click
  const handleLogoutClick = () => {
    handleLogout();
    console.log("Logout clicked");
  };

  // Return the JSX for the AdminDashboard component
  return (
    <div className="admin-dashboard-container">
      {/* Background image */}

      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand">
            <img src={logoImg} alt="Logo" className="logo-img" />
          </a>

          {/* Title */}
          <a className="navbar-brand">Admin Dashboard</a>

          {/* Navbar toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  id="all-orders-link"
                  className={`nav-link ${
                    activeModule === "GetOrders" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavItemClick("GetSlots")}
                >
                  SLOTS
                </a>
              </li>
              {/* Bookings dropdown */}
              <li className="nav-item">
                <a
                  id="all-orders-link"
                  className={`nav-link ${
                    activeModule === "GetOrders" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavItemClick("GetOrders")}
                >
                  BOOKINGS
                </a>
              </li>

              {/* Payments dropdown */}
              <li className="nav-item dropdown">
                <a
                  id="payments-dropdown"
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  PRICING
                </a>

                {/* Payments dropdown menu */}
                <div
                  className="dropdown-menu"
                  aria-labelledby="payments-dropdown"
                >
                  <a
                    id="slots-link"
                    className={`dropdown-item ${
                      activeModule === "Theatres" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => handleNavItemClick("Theatres")}
                  >
                    THEATRES
                  </a>

                  {/* Removed the "Add Slot" option */}
                  <a
                    id="decorations-link"
                    className={`dropdown-item ${
                      activeModule === "Decorations" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => handleNavItemClick("Decorations")}
                  >
                    DECORATIONS
                  </a>

                  <a
                    id="cakes-link"
                    className={`dropdown-item ${
                      activeModule === "GetCakes" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => handleNavItemClick("GetCakes")}
                  >
                    Cakes
                  </a>

                  {/* Removed the "Add Cakes" option */}
                </div>
              </li>

              {/* Reports dropdown */}
              <li className="nav-item">
                <a
                  id="reports-link"
                  className={`nav-link ${
                    activeModule === "Reports" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavItemClick("Reports")}
                >
                  REPORTS
                </a>
              </li>

              {/* Contact Us link */}
              <li className="nav-item">
                <a
                  id="contact-us-link"
                  className={`nav-link ${
                    activeModule === "GetBookings" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleNavItemClick("GetBookings")}
                >
                  ENQUIRIES
                </a>
              </li>

              {/* Logout link */}
              <li className="nav-item">
                <a
                  id="logout-link"
                  className="nav-link logout-link"
                  href="#"
                  onClick={handleLogoutClick}
                >
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content container */}
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">{renderModule()}</div>
        </div>
      </div>
    </div>
  );
};

// Define prop types for the AdminDashboard component
AdminDashboard.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

// Export the AdminDashboard component
export default AdminDashboard;
