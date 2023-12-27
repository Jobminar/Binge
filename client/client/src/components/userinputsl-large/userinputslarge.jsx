import "../userinputs/userinputs.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";
import calender from "../../assets/images/calender-logo.png";
import time from "../../assets/images/time-logo.png";
import nextstep from "../../assets/images/Frame 12.png";
import FormComponentlarge from "../userinputs/formlarge";

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
const Userinputslarge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    numOfPeople: "",
  });
  //setting total cost__________________________________
  const [Total, setTotal] = useState(0);
  const [extraCost, setExtraCost] = useState(0);
  useEffect(() => {
    const calculateTotal = () => {
      let basePrice = 2999;

      const additionalPeople = Math.max(0, formData.numOfPeople - 6);
      const additionalPeopleCost =
        additionalPeople > 0 ? additionalPeople * 399 : 0;

      const total = basePrice + extraCost + additionalPeopleCost;
      setTotal(total);
    };

    calculateTotal(); // Initial calculation
  }, [extraCost, formData]);
  // Trigger useEffect when getLocalStorage changes

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

  // gettime and date

  // get time and date
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
          <div className="headding-cake">
            <h1>LUXI</h1>
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
          {/* Render the form component with form data and setter function */}
          <FormComponentlarge formData={formData} setFormData={setFormData} />
        </div>

        <div>
          <div className="nextstep-result-con">
            <div className="result-con">
              <h1 className="result-input">Total: ₹ {Total}/-</h1>
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

export default Userinputslarge;
