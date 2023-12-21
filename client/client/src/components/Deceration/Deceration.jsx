/* eslint-disable react/no-unescaped-entities */
import "./Deceration.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import time from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";

const Deceration = () => {
  const [decorations, setDecorations] = useState([]);
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
  const navigate = useNavigate();
  const location = useLocation();

  const timeinput = "1:00 pm to 3:00 pm";
  const date = "20 November 2023";

  const [count, setCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const calculateCount = (decorationPrice, decorationName, index) => {
    const updatedCheckedItems = {};
    updatedCheckedItems[index] = true;

    setCheckedItems(updatedCheckedItems);

    // Increment count by decorationPrice
    setCount((prevCount) => prevCount + decorationPrice);

    // Store decorationName in sessionStorage
    sessionStorage.setItem("selectedDecoration", decorationName);
  };
  const [loading, setLoading] = useState(false);
  const pricedecoration = location.state && location.state.sendamountcake;
  const pricetotalbefore = parseInt(pricedecoration) || 0;

  const finalamount = count + pricetotalbefore;

  const handleDecoration = () => {
    console.log("Date:", location.state.date);
    console.log("Number of People:", location.state.numOfPeople);
    console.log("Time:", location.state.time);
    console.log("Final Amount:", finalamount);

    navigate("/payment", {
      state: {
        date: location.state.date,
        numOfPeople: location.state.numOfPeople,
        time: location.state.time,
        finalamount,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data with a timeout of 10 seconds (adjust as needed)
        const timeout = setTimeout(async () => {
          const response = await fetch(
            "https://binge-be.onrender.com/getdecorations",
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
          setDecorations(data);
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
      <div className="deceration-con">
        {loading && (
          <div style={loaderStyle} className="loader-container">
            <div>
              <h6 style={textStyles}>
                Satisfy your cravings! Now, let's spice things up with some
                delightful Decorations.✨
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
          <img src={time} alt="time" />
          <p>{timeinput}</p>
        </div>
        <h1 className="cake-headding">DECORATION</h1>
        <div className="deceration-shop">
          {decorations.map((deceration, index) => (
            <div key={index}>
              <div className="cake-box">
                <img
                  className="cake-image"
                  src={`data:image/jpeg;base64,${deceration.image}`}
                  alt={deceration.decorationName}
                />

                <p className="cakename">{deceration.decorationName}</p>
                {/* <p className="price">{deceration.price}</p> */}
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  onClick={() =>
                    calculateCount(
                      parseInt(deceration.price),
                      deceration.decorationName,
                      index
                    )
                  }
                  checked={checkedItems[index]}
                />
              </div>
            </div>
          ))}
        </div>
        <h1 className="result">
          Total : <span>{count + pricetotalbefore}</span>
        </h1>
        <div
          className="nextstep"
          onClick={() => {
            handleDecoration();
          }}
        >
          <img
            src={nextstep}
            alt="nextstep"
            // onClick={() => {
            //   navigate("/payment");
            // }}
          />
        </div>
        {/* <h1 className='final'>{finalamount}</h1> */}
      </div>
    </>
  );
};
export default Deceration;
