import { useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { IoMdCheckbox, IoMdRadioButtonOn } from "react-icons/io";
import {
  MdEventSeat,
  MdAccessTime,
  MdAttachMoney,
  MdSend,
  MdClose,
} from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconContext } from "react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "./toastify-styles.css";

const PostSlots = ({ onClose, visible }) => {
  const [slotData, setSlotData] = useState({
    date: new Date(),
    availability: true,
    numberOfPeople: 0,
    time: "",
    price: 0,
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const { date, availability, numberOfPeople, time, price, type } = slotData;

  const handleChange = (name, value) => {
    let updatedPrice = slotData.price;

    if (name === "type") {
      updatedPrice = value === "STANDARD" ? 1799 : value === "LUXI" ? 2999 : 0;
    }

    // Manually adjust the date to account for the time zone offset
    const updatedDate =
      name === "date"
        ? new Date(value.getTime() - value.getTimezoneOffset() * 60000)
        : value;

    setSlotData({
      ...slotData,
      [name]: updatedDate,
      price: updatedPrice,
    });
  };
  //delete ONE YEAR SLOTS_________________________________________________________
  // ... (existing code)
  const deleteAllBatch = async () => {
    try {
      const response = await fetch(
        "https://binge-be.onrender.com/deletealldatetime",
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      toast.success(data.message); // Display success message using Toastify
    } catch (error) {
      console.error("Error deleting all batch data:", error.message);
      toast.error("Failed to delete all batch data. Please try again."); // Display error message using Toastify
    }
  };
  //adding ONE YEAR SLOTS_________________________________________________________
  const addAllSlots = async () => {
    setLoading(true);

    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 365);

    const timeSlots = [
      "10:00 am - 01:00 pm",
      "02:00 pm - 05:00 pm",
      "06:00 pm - 09:00 pm",
      "10:00 pm - 12:00 am",
    ];

    const batchSize = 365; // Adjust the batch size as needed
    const slotsToAdd = [];

    for (
      let date = new Date(currentDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      for (let i = 0; i < timeSlots.length; i++) {
        const timeSlot = timeSlots[i];

        // Add STANDARD slot
        slotsToAdd.push({
          date: new Date(date),
          availability: true,
          numberOfPeople: 6,
          time: timeSlot,
          price: 1799, // Standard price
          type: "STANDARD",
        });

        // Add LUXI slot
        slotsToAdd.push({
          date: new Date(date),
          availability: true,
          numberOfPeople: 12,
          time: timeSlot,
          price: 2999, // Luxi price
          type: "LUXI",
        });
      }
    }

    try {
      const batches = [];
      for (let i = 0; i < slotsToAdd.length; i += batchSize) {
        batches.push(slotsToAdd.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        const response = await fetch(
          "https://binge-be.onrender.com/postdatetime",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ slots: batch }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      // Display success message using Toastify
      toast.success("All slots have been added successfully!");
    } catch (error) {
      console.error("Error posting slots:", error.message);
      // Display error message using Toastify
      toast.error("Failed to add slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ... (existing code)
  //Adding custom Slots____________________________________________________________________
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://binge-be.onrender.com/postdatetime",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(slotData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Slot Posted:", result);

      // Display success message using Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your slot has been added successfully!",
      });
    } catch (error) {
      console.error("Error posting slot:", error.message);

      // Display error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add slot. Please try again.",
      });
    }
  };

  const containerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: visible ? "block" : "none",
    zIndex: "1000",
    overflowX: "hidden",
  };

  return (
    visible && (
      <div style={containerStyle} id="popup">
        <div className="d-flex justify-content-end mb-2">
          <MdClose
            size="1.5em"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className="card-header text-center">
          <h2>Add a Slot</h2>
        </div>
        <div className="card-body">
          <h6>Auto Fill all Slots for 1 month</h6>
          <div className="card m-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={addAllSlots}
              disabled={loading}
            >
              Add All Slots
            </button>
            <button
              type="button"
              className="btn btn-danger mr-2 mt-2"
              onClick={deleteAllBatch}
              disabled={loading}
            >
              Delete All Slots
            </button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastContainerStyle={{
              width: "350px",
            }}
            bodyClassName={(status) => `toast-body ${status}`}
          />
          <form onSubmit={handleSubmit}>
            <IconContext.Provider value={{ color: "black", size: "1.5em" }}>
              <div className="mb-3">
                <label className="form-label">
                  <IoMdRadioButtonOn /> Type:
                </label>
                <div className="custom-radio">
                  <input
                    type="radio"
                    id="standard"
                    name="type"
                    value="STANDARD"
                    checked={type === "STANDARD"}
                    onChange={() => handleChange("type", "STANDARD")}
                  />
                  <label htmlFor="standard">STANDARD</label>
                </div>
                <div className="custom-radio">
                  <input
                    type="radio"
                    id="luxi"
                    name="type"
                    value="LUXI"
                    checked={type === "LUXI"}
                    onChange={() => handleChange("type", "LUXI")}
                  />
                  <label htmlFor="luxi">LUXI</label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date:
                </label>
                <DatePicker
                  id="date"
                  name="date"
                  selected={date}
                  onChange={(date) => handleChange("date", date)}
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className="mb-3 form-check">
                <label htmlFor="availability" className="form-check-label">
                  <IoMdCheckbox /> Availability
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="numberOfPeople" className="form-label">
                  <MdEventSeat /> Number of People:
                </label>
                <input
                  type="number"
                  id="numberOfPeople"
                  name="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) =>
                    handleChange("numberOfPeople", e.target.value)
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">
                  <MdAccessTime /> Time:
                </label>
                <select
                  id="time"
                  name="time"
                  value={time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Time</option>
                  <option value="10:00 am - 01:00 pm">
                    10:00 am - 01:00 pm
                  </option>
                  <option value="02:00 pm - 05:00 pm">
                    02:00 pm - 05:00 pm
                  </option>
                  <option value="06:00 pm - 09:00 pm">
                    06:00 pm - 09:00 pm
                  </option>
                  <option value="10:00 pm - 12:00 am">
                    10:00 pm - 12:00 am
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  <MdAttachMoney /> Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary">
                  <MdSend /> Submit
                </button>
              </div>
            </IconContext.Provider>
          </form>
        </div>
      </div>
    )
  );
};

PostSlots.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PostSlots;
