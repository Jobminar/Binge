import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./payment.css";
import LogoImg from "../../assets/images/logo.png";

const generateRandomPaymentID = () => {
  return `PAY-${Math.random().toString(36).substring(7).toUpperCase()}`;
};

const Paymentstep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    numOfPeople: "",
  });

  useEffect(() => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("formData"));
      if (storedUserData) {
        setFormData(storedUserData);
      }
    } catch (e) {
      setError(e.message);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleProceed = async () => {
    const { date, numOfPeople, finalamount } = location.state;
    const paymentID = generateRandomPaymentID();

    const orderData = {
      date: date || "N/A",
      numOfPeople: numOfPeople || "N/A",
      name: formData.name || "N/A",
      email: formData.email || "N/A",
      mobile: formData.mobile || "N/A",
      totalAmount: finalamount || 0,
    };

    try {
      const response = await fetch("https://binge-be.onrender.com/postorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentID,
          totalPrice: orderData.totalAmount,
          dateTime: new Date(),
          name: orderData.name,
          phoneNumber: orderData.mobile,
          numberOfPeople: orderData.numOfPeople,
          email: orderData.email,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      navigate("/whatsapp", {
        state: {
          ...orderData,
          paymentID,
          price: finalamount,
        },
      });
    } catch (error) {
      console.error("Error posting order:", error);
    }
  };

  const selectedCake = sessionStorage.getItem("selectedCakeName");
  const selectedDecoration = sessionStorage.getItem("selectedDecoration");

  const generatePaymentData = () => {
    return {
      date: location.state.date || "N/A",
      numOfPeople: location.state.numOfPeople || "N/A",
      name: formData.name || "N/A",
      email: formData.email || "N/A",
      mobile: formData.mobile || "N/A",
      totalAmount: location.state.finalamount || 0,
    };
  };

  return (
    <div className="container-fluid sub-container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <img
                  src={LogoImg}
                  alt="Logo"
                  className="logo m-auto ms-lg-1 reduced-logo"
                  onClick={() => navigate("/")}
                />
              </div>

              {loading && (
                <p className="text-light text-center">
                  <i className="fas fa-spinner fa-spin"></i> Loading...
                </p>
              )}
              {error && (
                <p className="text-danger text-center">
                  Error: {error}. Please refresh the page or try again later.
                </p>
              )}

              {!loading && !error && (
                <div className="details-section mt-2 mb-0 p-0">
                  <ul className="payment-list">
                    <li className="d-flex">
                      <h4 className="dt">Date:</h4>
                      <h5>{generatePaymentData().date}</h5>
                    </li>
                    <li className="d-flex">
                      <h4 className="dt">Number of People:</h4>
                      <h5>{generatePaymentData().numOfPeople}</h5>
                    </li>
                    <li className="d-flex">
                      <h4 className="dt">Name:</h4>
                      <h5>{generatePaymentData().name}</h5>
                    </li>
                    <li className="d-flex">
                      <h4 className="dt">Email:</h4>
                      <h5>{generatePaymentData().email}</h5>
                    </li>
                    <li className="d-flex">
                      <h4 className="dt">Phone Number:</h4>
                      <h5>{generatePaymentData().mobile}</h5>
                    </li>
                    <li className="d-flex">
                      <h4 className="dt">Cake:</h4>
                      <h5>{selectedCake}</h5>
                    </li>
                    <li className="d-flex">
                      <h4 className="dt">Decoration:</h4>
                      <h5>{selectedDecoration}</h5>
                    </li>
                    <li className="d-flex">
                      <h4 className="dt">Total Amount:</h4>
                      <h5>
                        <strong>${generatePaymentData().totalAmount}</strong>
                      </h5>
                    </li>
                  </ul>
                </div>
              )}

              <button
                className="btn btn-primary btn-block mt-2"
                onClick={handleProceed}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymentstep;
