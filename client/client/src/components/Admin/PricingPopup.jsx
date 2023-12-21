import { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const PricingPopup = ({
  show,
  handleClose,
  handleIncreasePricing,
  handleDecreasePricing,
  handlePricingInputClick,
  newPricing,
  setNewPricing,
  handleIncreaseNoOfPeople,
  handleDecreaseNoOfPeople,
  handleNoOfPeopleInputClick,
  noOfPeople,
  setNoOfPeople,
  selectedInput,
  
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPricingType, setSelectedPricingType] = useState("MINI");

  const handleSubmit = () => {
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      handleClose();
    }, 2000);
  };

  const inputValidationMessages = {
    newPricing: "Enter a valid pricing value",
    noOfPeople: "Enter a valid number of people",
  };

  const getInputValidationMessage = (input) => {
    return inputValidationMessages[input] || "";
  };

  return (
    <div id="popup" className={`${show ? "d-block" : "d-none"}`}>
      <div className="card popup-card">
        <div className="card-header text-center">
          <h2>Set Theatre Pricing</h2>
          <button
            type="button"
            className="btn-close close-icon"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="card-body">
          {isSuccess ? (
            <div className="alert alert-success" role="alert">
              Submitted successfully!
            </div>
          ) : (
            <>
              <div className="mb-3">
                <label htmlFor="newPricing" className="form-label">
                  New Pricing
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    selectedInput === "newPricing" ? "selected" : ""
                  }`}
                  id="newPricing"
                  value={newPricing}
                  onChange={(e) => setNewPricing(Number(e.target.value))}
                  onClick={() => handlePricingInputClick("newPricing")}
                  placeholder={getInputValidationMessage("newPricing")}
                />
                {selectedInput === "newPricing" && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={handleIncreasePricing}
                    >
                      Increase
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDecreasePricing}
                    >
                      Decrease
                    </button>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="noOfPeople" className="form-label">
                  No of People
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    selectedInput === "noOfPeople" ? "selected" : ""
                  }`}
                  id="noOfPeople"
                  value={noOfPeople}
                  onChange={(e) => setNoOfPeople(Number(e.target.value))}
                  onClick={() => handleNoOfPeopleInputClick("noOfPeople")}
                  placeholder={getInputValidationMessage("noOfPeople")}
                />
                {selectedInput === "noOfPeople" && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={handleIncreaseNoOfPeople}
                    >
                      Increase
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDecreaseNoOfPeople}
                    >
                      Decrease
                    </button>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Select Pricing Type</label>

                <div className="custom-radio mx-2">
                  <input
                    type="radio"
                    id="mini"
                    value="MINI"
                    checked={selectedPricingType === "MINI"}
                    onChange={() => setSelectedPricingType("MINI")}
                  />
                  <label
                    htmlFor="mini"
                    className="form-check-label"
                    style={{
                      color:
                        selectedPricingType === "MINI" ? "blue" : "initial",
                    }}
                  >
                    MINI
                  </label>
                </div>
                <div className="custom-radio mx-2">
                  <input
                    type="radio"
                    id="max"
                    value="MAX"
                    checked={selectedPricingType === "MAX"}
                    onChange={() => setSelectedPricingType("MAX")}
                  />
                  <label
                    htmlFor="max"
                    className="form-check-label"
                    style={{
                      color: selectedPricingType === "MAX" ? "blue" : "initial",
                    }}
                  >
                    MAX
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="card-footer">
          {!isSuccess && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PricingPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleIncreasePricing: PropTypes.func.isRequired,
  handleDecreasePricing: PropTypes.func.isRequired,
  handlePricingInputClick: PropTypes.func.isRequired,
  newPricing: PropTypes.number.isRequired,
  setNewPricing: PropTypes.func.isRequired,
  handleIncreaseNoOfPeople: PropTypes.func.isRequired,
  handleDecreaseNoOfPeople: PropTypes.func.isRequired,
  handleNoOfPeopleInputClick: PropTypes.func.isRequired,
  noOfPeople: PropTypes.number.isRequired,
  setNoOfPeople: PropTypes.func.isRequired,
  pricingType: PropTypes.oneOf(["MINI", "MAX"]).isRequired,
  setPricingType: PropTypes.func.isRequired,
  selectedInput: PropTypes.string.isRequired,
  setSelectedInput: PropTypes.func.isRequired,
};

export default PricingPopup;
