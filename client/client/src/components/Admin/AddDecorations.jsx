//AddDecoration.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const AddDecorations = ({ onClose, onAdd }) => {
  const [decorationName, setDecorationName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "decorationName") {
      setDecorationName(value);
    } else if (name === "price") {
      setPrice(value);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          setImage(reader.result);
        } catch (error) {
          console.error("Error reading image file:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("decorationName", decorationName);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://binge-be.onrender.com/postdecorations",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add decoration: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Decoration created:", data);

      onAdd();

      onClose();
    } catch (error) {
      console.error("Error creating decoration:", error.message);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div id="popup" className="d-block">
      <div className="card popup-card w-sm-75">
        <div className="card-header text-center">
          <h2>Add New Decoration</h2>
          <button
            type="button"
            className="btn-close close-icon"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="card-body w-sm-75">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="decorationName" className="form-label">
                Decoration Name
              </label>
              <input
                type="text"
                className="form-control w-sm-75"
                id="decorationName"
                name="decorationName"
                value={decorationName}
                onChange={handleInputChange}
                placeholder="Enter decoration name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control w-sm-75"
                id="price"
                name="price"
                value={price}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                <label className="custom-file-label" htmlFor="image">
                  Choose file
                </label>
              </div>
              {image && (
                <img
                  src={image}
                  alt="Decoration Preview"
                  className="preview-image"
                />
              )}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add Decoration..
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes
AddDecorations.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddDecorations;
