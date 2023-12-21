import "../userinputs/userinputs.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import time from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";
import FormComponentmini from "../userinputs/form";

const getLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      console.log(`No data found for key '${key}' in local storage.`);
      return null;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error("Error getting data from local storage:", error);
    return null;
  }
};
const Userinputs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    numOfPeople: "",
  });

  const [extraCost, setExtraCost] = useState(0);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      let basePrice = 1799;

      const additionalPeople = Math.max(0, formData.numOfPeople - 4);
      const additionalPeopleCost =
        additionalPeople > 0 ? additionalPeople * 399 : 0;

      const total = basePrice + extraCost + additionalPeopleCost;
      setTotal(total);
    };

    calculateTotal(); // Initial calculation
  }, [extraCost, formData]);

  // No need for the interval and cleanup
  // Include formData in the dependency array

  const handleNextButtonClick = () => {
    if (!formData.name || !formData.mobile) {
      alert("Please fill out the form completely before proceeding.");
      return;
    }

    localStorage.setItem("formData", JSON.stringify(formData));

    navigate("/cakemain", {
      state: {
        date,
        numOfPeople: formData.numOfPeople,
        time,
        price: Total,
      },
    });

    // alert("Form details submitted successfully!");
  };
  var sessionData = sessionStorage.getItem("selectedSlot");
  if (sessionData) {
    var slotselctionData = JSON.parse(sessionData);
    console.log(slotselctionData);
  } else {
    console.log('No data found in sessionStorage for key "slotselction"');
  }
  const date = slotselctionData.date;
  const timeinput = slotselctionData.time;

  return (
    <>
      <div className="miniinput-con">
        <div className="main-cake-con">
          <div className="logo-img">
            <img src={logo} alt="logo" id="logo-img" />
          </div>

          <div className="headding-cake">
            <h1>STANDARD</h1>
            <p>Theater</p>
          </div>
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
        <div className="inputs-con">
          <FormComponentmini formData={formData} setFormData={setFormData} />
        </div>

        <div>
          <div className="nextstep-result-con">
            <div className="result-con">
              <h1 className="result-input">Total: {Total}</h1>
              <p className="taxes">(All tax Included)</p>
            </div>
            <div className="nextstep">
              <img
                src={nextstep}
                alt="nextstep"
                onClick={handleNextButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userinputs;
