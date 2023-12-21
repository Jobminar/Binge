import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import PropTypes from "prop-types";
import PrintShare from "./PrintShare";
import { FaRegClock } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Import your custom styles for UserDetailsForm

const UserDetailsForm = ({ contact, onClose }) => {
  const [formData, setFormData] = useState({
    theaterType: "Mini",
    name: "",
    contact: "",
    email: "", // Add the email field
    date: null,
    time: "12:00",
    numOfPeople: "",
    addons: "",
    extras: [],
    generatedBill: null,
  });

  const [billPopup, setBillPopup] = useState(false);
  const [printShareMode, setPrintShareMode] = useState(false);
  useEffect(() => {
    if (contact) {
      setFormData({
        theaterType: contact.theaterType || "Mini",
        name: contact.name || "",
        contact: contact.phone || "",
        email: contact.mailID || "",
        date: contact.date ? new Date(contact.date) : null,
        time: contact.time || "12:00",
        numOfPeople: contact.numberOfPeople || "",
        addons: contact.addons || "",
        extras: contact.extras || [],
        generatedBill: null,
      });
    }
  }, [contact]);
  // When updating the form data
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "radio" ? value : e.target.value;

    // Update price based on theaterType
    let updatedPrice = formData.generatedBill; // Use existing price as default

    if (name === "theaterType") {
      // Update price based on theaterType selection
      updatedPrice = inputValue === "Mini" ? 1799 : 2999;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
      generatedBill: updatedPrice,
    }));

    // Store the updated form data in local storage
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...formData, [name]: inputValue })
    );
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const handleTimeChange = (time) => {
    setFormData((prevData) => ({ ...prevData, time }));
  };

  const handleExtrasInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedExtras = [...prevData.extras];
      updatedExtras[index] = { ...updatedExtras[index], [name]: value };
      return { ...prevData, extras: updatedExtras };
    });
  };

  const handleAddExtras = () => {
    setFormData((prevData) => ({
      ...prevData,
      extras: [...prevData.extras, { itemName: "", price: "" }],
    }));
  };

  const handleRemoveExtras = (index) => {
    setFormData((prevData) => {
      const updatedExtras = [...prevData.extras];
      updatedExtras.splice(index, 1);
      return { ...prevData, extras: updatedExtras };
    });
  };

  const calculateTotal = () => {
    const addonsTotal = parseFloat(formData.addons) || 0;
    const extrasTotal = formData.extras.reduce(
      (total, extra) => total + (parseFloat(extra.price) || 0),
      0
    );
    return addonsTotal + extrasTotal;
  };

  const generateBill = () => {
    const addonsTotal = parseFloat(formData.addons) || 0;
    const extrasTotal = formData.extras.reduce(
      (total, extra) => total + (parseFloat(extra.price) || 0),
      0
    );

    const theaterTypePrice = formData.theaterType === "Mini" ? 1799 : 2999;
    const totalBill = addonsTotal + extrasTotal + theaterTypePrice;

    const formattedBill = `
      =========================
        Binge-in Bill
      =========================
      Type of Theatre: ${formData.theaterType}
      Name: ${formData.name}
      Contact: ${formData.contact}
      Email: ${formData.email}
      Date: ${formData.date.toLocaleDateString()}
      Time: ${formData.time}
      Number of People: ${formData.numOfPeople}
      Addons: ${formData.addons}
      Extras:
        ${formData.extras
          .map(
            (extra, index) =>
              `  ${index + 1}. ${extra.itemName}: $${extra.price}`
          )
          .join("\n")}
      -------------------------
      Subtotal: $${addonsTotal + extrasTotal}
      Theater Type Price: $${theaterTypePrice}
      -------------------------
      Total: $${totalBill}
      =========================
    `;

    console.log(formattedBill);

    setFormData((prevData) => ({
      ...prevData,
      generatedBill: totalBill,
    }));
    setBillPopup(true);
  };

  const closePopup = () => {
    setBillPopup(false);
    onClose();
  };

  const componentRef = useRef();

  const handleClearForm = () => {
    setFormData({
      name: "",
      contact: "",
      date: null,
      time: "12:00",
      numOfPeople: "",
      addons: "",
      extras: [],
      theaterType: "Mini",
      generatedBill: null, // Reset generatedBill on form clear
    });
  };

  const handlePrint = () => {
    // Open print share mode and pass form data including the generated bill
    setPrintShareMode(true);
  };
  return (
    <div id="popup" className="d-block">
      <div className="card popup-card" ref={componentRef}>
        <div className="card-header text-center">
          <h2>SLOT Details</h2>
          <button
            type="button"
            className="btn-close close-icon"
            aria-label="Close"
            onClick={closePopup}
          ></button>
        </div>
        <div className="card-body">
          <h2 className="text-dark">BILLING</h2>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-dark">Type of Theatre:</label>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-check form-check-inline custom-radio">
                      <input
                        type="radio"
                        id="miniRadio"
                        className="form-check-input"
                        name="theaterType"
                        value="Mini"
                        checked={formData.theaterType === "Mini"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="miniRadio" className="form-check-label">
                        Mini
                      </label>
                    </div>

                    <div className="form-check form-check-inline custom-radio">
                      <input
                        type="radio"
                        id="maxRadio"
                        className="form-check-input"
                        name="theaterType"
                        value="MAX"
                        checked={formData.theaterType === "MAX"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="maxRadio" className="form-check-label">
                        MAX
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-dark">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-dark">Contact:</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-dark">Date:</label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  className="form-control"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select a date"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="time" className="form-label text-dark">
                  Time:
                </label>
                <div className="input-group">
                  <TimePicker
                    id="time"
                    onChange={handleTimeChange}
                    value={formData.time}
                    className="form-control"
                    disableClock={true}
                    clearIcon={null}
                    clockIcon={<FaRegClock />} // Using React Icons
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6" style={{ marginTop: "75px" }}>
              <div className="mb-3">
                <label className="form-label text-dark">
                  Number of People:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="numOfPeople"
                  placeholder="Enter the number of people"
                  value={formData.numOfPeople}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Email:</label>
                <input
                  type="email" // Use 'email' type for email input
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Addons:</label>
                <input
                  type="text"
                  className="form-control"
                  name="addons"
                  placeholder="Enter addons"
                  value={formData.addons}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Extras:</label>
            {formData.extras.map((extra, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="itemName"
                    placeholder="Item Name"
                    value={extra.itemName}
                    onChange={(e) => handleExtrasInputChange(index, e)}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    placeholder="Price"
                    value={extra.price}
                    onChange={(e) => handleExtrasInputChange(index, e)}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveExtras(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button className="btn btn-success" onClick={handleAddExtras}>
              Add Extras
            </button>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={generateBill}>
              Generate Bill
            </button>
            <button
              className="btn btn-secondary ms-2"
              onClick={handleClearForm}
            >
              Clear Form
            </button>
            <button className="btn btn-warning ms-2" onClick={handlePrint}>
              Print
            </button>
            <button className="btn btn-dark ms-2" onClick={closePopup}>
              Close
            </button>
          </div>

          {billPopup && (
            <div className="alert alert-info">
              <p>Bill Details:</p>
              <p>Total: ${calculateTotal()}</p>
              <button className="btn btn-info" onClick={closePopup}>
                Close
              </button>
            </div>
          )}
          {printShareMode && (
            <PrintShare
              userDetails={formData}
              onClose={() => setPrintShareMode(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

UserDetailsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.object, // Add PropTypes for contact object
};

export default UserDetailsForm;
