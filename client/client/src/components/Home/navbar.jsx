import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import grid from "../../assets/images/grid.png";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Handle logic for login, you can add your own implementation here
    navigate("/login");
  };

  const handleAdminClick = () => {
    navigate("/adminlogin");
  };

  return (
    <>
      <div
        className="grid-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={grid} alt="grid" />
      </div>
      <div className="nav-con">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </div>
        <div
          onClick={() => {
            navigate("/aboutus");
          }}
        >
          ABOUT US
        </div>
        <div
          onClick={() => {
            navigate("/gallery");
          }}
        >
          GALLERY
        </div>
        <div
          onClick={() => {
            navigate("/contactus");
          }}
        >
          CONTACT US
        </div>
        <div
          className="refund-item"
          onClick={() => {
            navigate("/refund");
          }}
        >
          REFUND
        </div>
        <div
          className="user-icon"
          onClick={() => {
            handleAdminClick();
          }}
          style={{ marginTop: "0", marginBottom: "1rem" }}
        >
          <FaUser style={{ fontSize: "18px" }} />
        </div>
      </div>
    </>
  );
};

export default Navbar;