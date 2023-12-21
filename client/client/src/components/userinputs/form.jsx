import { useState } from "react";
import "./form.css";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
//this file changed in 11-12-2023, this is form
const FormComponentmini = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`Data with key '${key}' set in local storage.`);
    } catch (error) {
      console.error("Error setting data in local storage:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numOfPeople") {
      if (value === "" || parseInt(value) < 1) {
        setErrors({
          ...errors,
          [name]: "Number of People should be 1 or more",
        });
        setFormData({ ...formData, [name]: "1" }); // Set default value as '1'
      } else {
        setErrors({ ...errors, [name]: "" });
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  let extraCost = 0; // Initialize extra cost

  if (formData.numOfPeople > 4) {
    const extraPeople = formData.numOfPeople - 6;
    extraCost = extraPeople * 399; // Assuming 399 is the cost per additional person
  }
  console.log(extraCost);
  // Set extraCost in local storage
  setLocalStorage("extraCost", extraCost);

  console.log("no of eople value", formData.numOfPeople);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("no of eople value", formData.numOfPeople);
    let errorsData = {};
    if (parseInt(formData.numOfPeople) < 1) {
      alert("Number of People should be 1 or more");
      return; // Prevent further execution of form submission
    }
    // Validation: Mobile number should contain exactly 10 digits
    if (formData.mobile.length !== 10) {
      errorsData.mobile = "Mobile number should be 10 digits";
    }

    // Validation: Check if the email is in proper format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errorsData.email = "Please enter a valid email";
    }

    // Set errors or submit the form
    if (Object.keys(errorsData).length > 0) {
      setErrors(errorsData);
    } else {
      // Submit the form - Here, you can perform further actions with formData
      console.log("Form submitted:", formData);

      // Store form data in local storage
      localStorage.setItem("formData", JSON.stringify(formData));

      // Optionally, you can clear the form data in the state if needed
      setFormData({
        name: "",
        mobile: "",
        email: "",
        numOfPeople: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-data">
        <label className="input-label">Name:</label>
        <br />
        <input
          className="user-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-data">
        <label className="input-label">Mobile Number:</label>
        <br />
        <input
          className="user-input"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}
      </div>
      <div className="input-data">
        <label className="input-label">Email:</label>
        <br />
        <input
          className="user-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="input-data">
        <label className="input-label">Number of People:</label>
        <br />
        <select
          className="user-input"
          name="numOfPeople"
          value={formData.numOfPeople}
          onChange={handleChange}
          required
        >
          {/* Generating options for numbers starting from 1 */}
          {Array.from({ length: 6 }, (_, index) => index + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        {errors.numOfPeople && (
          <span className="error">{errors.numOfPeople}</span>
        )}
      </div>
      {parseInt(formData.numOfPeople) > 4 && (
        <p className="reminder">
          Standard pricing includes only 4 people <br /> You can include upto 2
          more guests at 399 per Guest{" "}
        </p>
      )}
    </form>
  );
};
FormComponentmini.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    numOfPeople: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};
export default FormComponentmini;
