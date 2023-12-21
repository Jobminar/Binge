/* eslint-disable react/no-unescaped-entities */
import "./cake.css";
// import sampleData from "./cakedata.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import timelogo from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";
import { useState } from "react";
import Swal from "sweetalert2";
// import CakeList from "./getcake.jsx";

const Cake = () => {
  const location = useLocation();
  const { date, numOfPeople, time, price } = location.state || {};
  const [cakes, setCakes] = useState([]);
  const [Total, setTotal] = useState(0);
  const [priceFromState, setPriceFromState] = useState(price);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const timeinput = "1:00 pm to 3:00 pm";

  // amountcount
  const [count, setCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const loaderStyle = {
    position: "fixed",
    top: "auto", // Set top to auto
    bottom: 0, // Position at the bottom
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    background: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  };
  const textStyles = {
    textAlign: "center",
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.5rem", // You can adjust the size accordingly
  };
  useEffect(() => {
    // Initialize priceFromState when price changes
    setPriceFromState(price || 0);
  }, [price]);

  const calculateCount = (cakeprice, index, cakeName) => {
    const updatedCheckedItems = {};
    const isAlreadyChecked = checkedItems[index];

    if (isAlreadyChecked) {
      setCheckedItems({});
      sessionStorage.removeItem("selectedCakeName");
    } else {
      updatedCheckedItems[index] = true;
      setCheckedItems(updatedCheckedItems);
      setCount((prevCount) => prevCount + cakeprice);
      sessionStorage.setItem("selectedCakeName", cakeName);
    }
  };

  //   skip button functionality
  const isSkipButtonVisible = Object.values(checkedItems).every(
    (value) => !value
  );

  const handleSkip = () => {
    handlecakeandtheater();
  };
  // data send
  const sendamountcake = priceFromState + count;
  const handlecakeandtheater = () => {
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("noofpeople:", numOfPeople);
    console.log("Send Amount Cake:", sendamountcake);

    // Navigate to the next page without the confirmation popup
    navigate("/decoration", {
      state: {
        date,
        numOfPeople,
        time,
        sendamountcake: Total,
      },
    });
  };

  useEffect(() => {
    console.log("count:", count);
    console.log("priceFromState:", priceFromState);
    console.log("Total:", count + priceFromState);
    setTotal(count + priceFromState);
  }, [count, priceFromState]);
  // get cake----------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data with a timeout of 10 seconds (adjust as needed)
        const timeout = setTimeout(async () => {
          const response = await fetch(
            "https://binge-be.onrender.com/getcakes",
            {
              headers: {
                // Your headers here if needed
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setCakes(data);
          setLoading(false); // Set loading to false on successful response
        }, 5000); // 5 seconds timeout

        // Clear the timeout if the fetch is successful
        return () => clearTimeout(timeout);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
        // setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="cake-con">
        {loading && (
          <div style={loaderStyle} className="loader-container">
            <div>
              <h6 style={textStyles}>
                Satisfy your cravings! Now, let's spice things up with some
                delightful Cakes. 🍔🍰✨"
              </h6>
              <CircularProgress color="primary" size={60} thickness={4} />
            </div>
          </div>
        )}
        <div className="main-cake-con">
          <div
            className="logo-img"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo" id="logo-img" />
          </div>

          {/* <div className="headding-cake">
            <h1>MINI</h1>
            <p>Theater</p>
          </div> */}
          <img
            src={grid}
            alt="grid"
            className="grid-img-beigein"
            onClick={() => {
              navigate("/navbar");
            }}
          />
        </div>
        <div className="dateandtime">
          <img src={calender} alt="calender" />
          <p>{date}</p>
          <img src={timelogo} alt="time" />
          <p>{timeinput}</p>
        </div>
        <h1 className="cake-headding">CAKE & FOOD</h1>
        <div className="cake-shop">
          {cakes.map((cake, index) => (
            <div key={index}>
              <div className="cake-box">
                <img
                  className="cake-image"
                  src={`data:image/jpeg;base64,${cake.image}`}
                  alt={cake.cakeName}
                />

                <p className="cakename">{cake.cakeName}</p>
                <p className="price">{cake.price}</p>
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  onClick={() =>
                    calculateCount(parseInt(cake.price), index, cake.cakeName)
                  }
                  checked={checkedItems[index]}
                />
              </div>
            </div>
          ))}
        </div>

        <h1 className="result">
          <h1 className="result">
            Total : <span>{Total}</span>
          </h1>
        </h1>
        <div>
          {isSkipButtonVisible && (
            <div className="skipp-button" onClick={handleSkip}>
              <h1 style={{ color: "#895D5F" }}>SKIP</h1>
            </div>
          )}
          <div
            className="nextstep"
            onClick={() => {
              handlecakeandtheater();
            }}
          >
            <img
              src={nextstep}
              alt="nextstep"
              onClick={() => {
                navigate("/decoration");
              }}
            />
          </div>
        </div>

        {/* <h1 className='final'>{sendamountcake}</h1> */}
      </div>
    </>
  );
};
export default Cake;
