// Whatsapp.js

import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaHome, FaPhone, FaClipboard, FaMoneyBillWave } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import BgImage from "../../assets/images/Home-bg-img.jpeg";
import LogoImg from "../../assets/images/logo.png";
import QRCodeImage1 from "../../assets/images/phonepe.jpeg";
import QRCodeImage2 from "../../assets/images/Googlepay.jpeg";
import "./Whatsapp.css"; // External CSS file for additional styling

const Whatsappbeingin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handleShareViaWhatsapp = () => {
    const { date, numOfPeople, name, email, mobile, totalAmount, paymentID } =
      location.state;

    const message = `Payment Details:
      Date: ${date}
      Number of People: ${numOfPeople}
      Name: ${name}
      Email: ${email}
      Mobile: ${mobile}
      Total Amount: ${totalAmount}
      Payment ID: ${paymentID}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const phoneNumbers = ["+91996382771", "+918074020058"];

  const handleDialNumber = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  const handleCopyNumber = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber);
  };

  const handlePayment = () => {
    const paymentMessage =
      "To confirm the booking, transfer 700Rs as booking amount to 996382771.";

    const paymentLinkPhonePe = `https://phon.pe/${encodeURIComponent(
      paymentMessage
    )}`;
    const paymentLinkGooglePay = `https://pay.google.com/gp/v/${encodeURIComponent(
      paymentMessage
    )}`;

    window.open(paymentLinkPhonePe, "_blank");
    window.open(paymentLinkGooglePay, "_blank");
  };

  const generatePaymentData = () => {
    return {
      date: location.state.date || "N/A",
      numOfPeople: location.state.numOfPeople || "N/A",
      name: location.state.name || "N/A",
      email: location.state.email || "N/A",
      mobile: location.state.mobile || "N/A",
      totalAmount: location.state.totalAmount || 0,
      paymentID: location.state.paymentID || "N/A",
    };
  };
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link
          className="navbar-brand p-1 ml-1"
          to="/"
          style={{ marginLeft: "50px" }}
        >
          <img
            src={LogoImg}
            alt="Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </Link>
      </nav>

      {/* Main Content */}
      <main className="container mt-3">
        {/* Share via WhatsApp Button */}
        <div className="row">
          <div className="col">
            <h2 className="navbar-text dynamic-effect">
              To confirm the booking, transfer Rs 700/- as booking amount to
              displayed QR codes
            </h2>
          </div>
        </div>

        {/* Phone and QR Code Section */}
        <div className="row mt-3 d-flex justify-content-center">
          <div className="col-md-6 mb-3">
            <div className="mb-3 p-3">
              <img
                src={QRCodeImage1}
                alt="QR Code 1"
                className="img-fluid animated-image img-equal-height"
                style={{ margin: "0 10px" }}
              />
              {/* UPI ID (PhonePe) */}
              <p>
                <strong>UPI ID (PhonePe):</strong> sandeepgandi.2-2@okhdfcbank
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary btn-equal-size btn-copy-upi"
                  id="Phonepe-but"
                  onClick={() =>
                    navigator.clipboard.writeText("sandeepgandi.2-2@okhdfcbank")
                  }
                >
                  <FaClipboard /> Copy UPI ID
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-5 mb-3">
            <div className="mb-3 p-3">
              <img
                src={QRCodeImage2}
                alt="QR Code 2"
                className="img-fluid animated-image img-equal-height"
                style={{ margin: "0 10px" }}
              />
              {/* UPI ID (Google Pay) */}
              <p>
                <strong>UPI ID (Google Pay):</strong> 9963715817-2@axl
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary btn-equal-size btn-copy-upi"
                  onClick={() =>
                    navigator.clipboard.writeText("9963715817-2@axl")
                  }
                >
                  <FaClipboard /> Copy UPI ID
                </button>
              </div>
            </div>
          </div>
          <h3 className="mt-2">
            Kindly share screenshots of your successful payment with the
            following numbers.
          </h3>
        </div>

        {/* Phone Numbers */}
        <div className="row">
          {phoneNumbers.map((phoneNumber, index) => (
            <div
              key={index}
              className="col-md-6 mb-3 d-flex align-items-center justify-content-center"
            >
              <div className="mb-3 p-3 text-center">
                <p>
                  <strong>Phone Number:</strong> {phoneNumber}
                </p>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-success btn-equal-size"
                    onClick={() => handleDialNumber(phoneNumber)}
                  >
                    <FaPhone /> Dial
                  </button>
                  <button
                    className="btn btn-primary btn-equal-size"
                    onClick={() => handleCopyNumber(phoneNumber)}
                  >
                    <FaClipboard /> Copy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer mt-3">
        <ul>
          <h4 className="mb-0" style={{ color: "rgb(233,150,122)" }}>
            NOTE:
          </h4>
          <li style={{ marginLeft: "1.2rem" }}>
            We collect an advance amount of 700/- towards the confirmation of
            your booking. Partial advance amount (Rs 500/-) is refundable if you
            cancel the slot 72 hours prior to your booking...
            <h4
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => navigate("/refund")}
            >
              know more..
            </h4>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Whatsappbeingin;
