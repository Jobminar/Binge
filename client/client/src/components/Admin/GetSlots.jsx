//GetSlots.jsx

import React from "react";
import { useEffect, useState } from "react";
import PostSlot from "./PostSlot";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";
const GetSlots = () => {
  const [isPostSlotsVisible, setIsPostSlotsVisible] = useState(true);
  const [data, setData] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const determineTypeFromPrice = (price) => {
    return price === 1799 ? "STANDARD" : price === 2999 ? "LUXI" : "";
  };

  useEffect(() => {
    fetchData();
  }, [availabilityFilter, selectedDate]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://binge-be.onrender.com/getdatetime");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      let filteredData =
        availabilityFilter === "all"
          ? jsonData
          : jsonData.filter((item) => item.availability === availabilityFilter);

      const dateFilteredData =
        selectedDate === null
          ? filteredData
          : filteredData.filter(
              (item) =>
                new Date(item.date).toDateString() ===
                selectedDate.toDateString()
            );

      const sortedData = dateFilteredData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setData(sortedData);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.message || "An error occurred while fetching data."
      );
    }
  };

  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.value);
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const response = await fetch(
        `https://binge-be.onrender.com/deletedatetime/${slotId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted slot from the state
        setData((prevSlot) => prevSlot.filter((slot) => slot._id !== slotId));

        // Show success notification
        Swal.fire({
          icon: "success",
          title: "Slot Deleted!",
          showConfirmButton: false,
          timer: 1500, // Adjust as needed
        });
      } else {
        // Show error notification if deletion fails
        console.error(
          `Failed to delete slot with ID ${slotId}. Status: ${response.status}`
        );
        Swal.fire({
          icon: "error",
          title: "Deletion Failed",
          text: `Failed to delete slot with ID ${slotId}. Status: ${response.status}`,
        });
      }
    } catch (error) {
      // Show error notification if an exception occurs
      console.error("Error deleting slot:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error deleting slot: ${error.message}`,
      });
    }
  };

  const handleShowModal = () => {
    setIsPostSlotsVisible(true);
    setShowModal(true);
  };

  const handleClosePostSlots = () => {
    setIsPostSlotsVisible(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (slot) => {
    const type = slot.type;

    console.log("Clicked slot type:", type);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">SLOTS</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="mx-2">Filter by Availability:</label>
          <div className="custom-radio mx-2">
            <input
              type="radio"
              id="allRadio"
              value="all"
              checked={availabilityFilter === "all"}
              onChange={handleAvailabilityChange}
            />
            <label htmlFor="allRadio">AVAILABLE</label>
          </div>
          <div className="custom-radio mx-2">
            <input
              type="radio"
              id="availableRadio"
              value="available"
              checked={availabilityFilter === "available"}
              onChange={handleAvailabilityChange}
            />
            <label htmlFor="availableRadio">SOLD</label>
          </div>
        </div>

        <div className="col-md-6">
          <label className="mx-2">Filter by Date:</label>
          <div className="input-group">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              isClearable
              showYearDropdown
              scrollableYearDropdown
              className="form-control p-0 text-dark"
              style={{
                fontFamily: "Arial, sans-serif",
                color: "#333", // Set your desired text color
              }}
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                style={{
                  backgroundColor: "rgb(179,108,108)", // Set your desired pink color
                  borderColor: "rgb(179,108,108)", // Set the border color to match the background color
                  color: "#fff", // Set the text color to white or a contrasting color
                  cursor: "pointer", // Add pointer cursor for better UX
                }}
              >
                <FaCalendarAlt />
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary mb-3 custom-button"
        onClick={handleShowModal}
      >
        Add Slot
      </button>
      <div
        className="table-responsive-sm overflow-auto"
        style={{ minHeight: "200px", minWidth: "230px" }}
      >
        <table className="table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Price</th>
              <th scope="col">Number of People</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((slot, index) => (
              <tr className="overflow-scroll" key={index}>
                <td>
                  <a href="#" onClick={() => handleSlotClick(slot)}>
                    {new Date(slot.date).toLocaleDateString("en-GB")}
                  </a>
                </td>

                <td>{slot.type || determineTypeFromPrice(slot.price)}</td>
                <td>{slot.price}</td>
                <td>{slot.numberOfPeople}</td>
                <td>{slot.time}</td>
                <td>
                  <button
                    onClick={() => handleDeleteSlot(slot._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <PostSlot onClose={handleClosePostSlots} visible={isPostSlotsVisible} />
      </div>
    </div>
  );
};

export default GetSlots;
