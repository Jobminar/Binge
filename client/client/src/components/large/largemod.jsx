
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../mini/mini-home.css";
import grid from "../../assets/images/grid.png";
import Booknow from "../../assets/images/Frame 11.png";
import { Button } from "@mui/material";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
const Minihome = () => {
  // slot selection usestate
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [fetchedSlotData, setFetchedSlotData] = useState([]);
  const storedEvent = sessionStorage.getItem("selectedEvent") || ""
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    date: "",
    numberOfPeople: "",
    hours: "",
    event: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          https://binge-be.onrender.com/getslots?date=${inputValues.date}
        );

        if (!response.ok) {
          throw new Error(HTTP error! Status: ${response.status});
        }

        const result = await response.json();

        // Filter slots for the selected date and price === 1799
        const filteredSlots = result.filter(
          (slot) =>
            formatDate(slot.date) === formatDate(inputValues.date) &&
            slot.price === 1799
        );

        // Update your state or perform any necessary processing
        setFetchedSlotData(filteredSlots);
        console.log("Fetched Slots:", filteredSlots);
      } catch (error) {
        console.error("Error fetching slots:", error.message);
      }
    };

    // Fetch data when the date changes
    if (inputValues.date) {
      fetchData();
    } else {
      // If no date is selected, reset the slot data
      setFetchedSlotData([]);
    }
  }, [inputValues.date]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const today = new Date().toISOString().split("T")[0];

  //  Date update
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB", options);
  };

  const [date, setDate] = useState(
    formatDate(new Date().toISOString().split("T")[0])
  );

  useEffect(() => {
    // Update date state with inputValues.date
    setDate(
      inputValues.date
        ? formatDate(inputValues.date)
        : formatDate(new Date().toISOString().split("T")[0])
    );
  }, [inputValues.date]);

  // local storage and slot selction
// Store the selected event in sessionStorage


const handleSlotSelection = (event, time) => {
  if (event.target.checked) {
    if (!selectedSlot) {
      setSelectedSlot(time);
      sessionStorage.setItem("selectedSlot", JSON.stringify({ date, time }));
    } else {
      event.target.checked = false; // Unchecks the checkbox if already selected
      alert("You can only select one slot.");
    }
  } else {
    setSelectedSlot(null);
    sessionStorage.removeItem("selectedSlot"); // Remove the selectedSlot data when unchecked
  }
};
  // Function to handle the "Book Now" button click

  //functionality to go to next page
  const navigateToNextPage = () => {
    navigate("/userinputs");
  };



  // Function to handle the "Book Now" button click
  const handleNextPage = () => {
    const selectedSlot = sessionStorage.getItem("selectedSlot");
    const storedEvent = sessionStorage.getItem("selectedEvent");
  
    if (!inputValues.date || !inputValues.event) {
      // If the date or event is not selected, show an alert
      alert("Please select both date and event before proceeding.");
    } else if (!selectedSlot) {
      // If no slot is selected, show an alert
      alert("Please select a slot before proceeding...");
    } else {
      // Store the selected event in sessionStorage
      sessionStorage.setItem("selectedEvent", inputValues.event);
  
      // If all conditions met, navigate to the next page
      navigateToNextPage();
    }
  };
  
  
 
  return (
    <div className="mini-home-con">
      <div className="mini-head">
        <h1>
          STANDARD<span>THEATER</span>
        </h1>
        <Button onClick={()=>navigate("/")} variant="contained" sx={{position:"fixed",left:"40px",top:"120px",background:"white",color:"black"}}><SubdirectoryArrowLeftIcon /></Button>
       
        <img
          src={grid}
          alt="grid"
          onClick={() => {
            navigate("/navbar");
          }}
        />
      </div>
      {/* input title section */}
      <div className="input-head">
        <p className="input1tittle">Check slot availability</p>
        <p className="input1tittle">Event</p>
      </div>
      <div className="input-section">
        {/* date input */}
        <div className="input-sub">
          <input
            type="date"
            className="input1"
            name="date"
            value={inputValues.date}
            onChange={handleInputChange}
            min={today}

          />
        </div>
        {/* Event */}
        <div className="input-sub">
       <select
  className="input4"
  name="event"
  value={inputValues.event || storedEvent} // Using storedEvent value in the input value
  onChange={handleInputChange}
  required
>
  <option value="" disabled>
    Select an event
  </option>
  <option value="Birthday">Birthday</option>
  <option value="Anniversary">Anniversary</option>
  <option value="Other parties">Others</option>
</select>


        </div>
      </div>

      {/* table section */}
      <div className="table-section">
        <h2 className="slots">Slots</h2>
        <table>
          <thead>
            <tr>
              <th className="thead">Date</th>
              <th className="thead">Time</th>
              <th className="thead">Price</th>
            </tr>
          </thead>
          <tbody>
            {fetchedSlotData.map((slot) => (
              <tr key={slot._id}>
                <td>{formatDate(slot.date)}</td>
                <td>{slot.time}</td>
                <td>{slot.price}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) => handleSlotSelection(event, slot.time)}
                    disabled={selectedSlot && selectedSlot !== slot.time}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="book-now"
          onClick={() => {
            handleNextPage();
          }}
        >
          <img src={Booknow} alt="book-now" />
        </div>
      </div>
     
    </div>
  );
};

export default Minihome;

