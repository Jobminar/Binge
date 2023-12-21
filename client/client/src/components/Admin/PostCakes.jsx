//PostCakes.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const PostCakes = ({ onClose }) => {
  const popupStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    width: "90%", // Adjusted for better responsiveness
    maxWidth: "500px", // Set a maximum width if needed
    maxHeight: "90vh", // 90% of the viewport height
    minHeight: "300px",
    padding: "20px",
    backgroundColor: "#fce4ec", // Pale pinkish white
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    color: "rgb(60, 27, 27)",
    zIndex: 9999,
  };

  const [cakeData, setCakeData] = useState({
    cakeName: "",
    price: 0,
    image: "",
  });

  const { cakeName, price, image } = cakeData;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setCakeData({
      ...cakeData,
      [name]:
        type === "file"
          ? files[0]
          : type === "number"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("cakeName", cakeName);
      formData.append("price", price);
      formData.append("image", image);

      const response = await fetch("https://binge-be.onrender.com/postcakes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Cake Posted:", result);

      // Close the form after successful submission
      onClose();
    } catch (error) {
      console.error("Error posting cake:", error.message);
    }
  };

  return (
    <div id="cakespop" style={popupStyles}>
      <div className="card">
        <div className="card-header text-center">
          <h2>Post a Cake</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cakeName" className="form-label">
                Cake Name:
              </label>
              <input
                type="text"
                id="cakeName"
                name="cakeName"
                value={cakeName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="form-control"
                accept="image/*"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>{" "}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PostCakes.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PostCakes;
