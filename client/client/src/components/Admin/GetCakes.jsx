//GetCakes.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCakes from "./PostCakes"; // Update the path accordingly

const GetCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPostCakes, setShowPostCakes] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://binge-be.onrender.com/getcakes");

      if (!response.ok) {
        throw new Error(`Failed to fetch cakes. Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setCakes(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Failed to fetch cakes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCake = async (cakeId) => {
    try {
      const response = await fetch(
        `https://binge-be.onrender.com/cakes/${cakeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCakes((prevCakes) =>
          prevCakes.filter((cake) => cake._id !== cakeId)
        );
      } else {
        console.error(
          `Failed to delete cake with ID ${cakeId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting cake:", error.message);
    }
  };

  const handleShowPostCakes = () => {
    setShowPostCakes(true);
  };

  const handleClosePostCakes = () => {
    setShowPostCakes(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Premium Cakes</h2>

      {/* Add Cake button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleShowPostCakes}
      >
        Add Cake
      </button>

      {/* Display PostCakes component conditionally */}
      {showPostCakes && <PostCakes onClose={handleClosePostCakes} />}

      {loading && <p>Loading...</p>}

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped mt-3">
          <thead className="text-center">
            <tr>
              <th>Cake Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cakes.map((cake) => (
              <tr key={cake._id}>
                <td>{cake.cakeName}</td>
                <td>{cake.price}</td>
                <td style={{ width: "30%", height: "30%" }}>
                  {cake.image && (
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={`data:image/jpeg;base64,${cake.image}`}
                      alt={cake.cakeName}
                      className="cake-image"
                    />
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteCake(cake._id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetCakes;
