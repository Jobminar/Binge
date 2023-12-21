import "./refund.css";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import grid from "../../assets/images/grid.png";

const Refund = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="refund-con">
        <div className="main-cake-con">
          <img
            src={logo}
            alt="logo"
            className="logo-img"
            onClick={() => {
              navigate("/");
            }}
          />
          {/* <div className='headding-cake'>
                            <h1>MINI</h1>
                            <p>Theater</p>
                        </div> */}
          <img
            src={grid}
            alt="grid"
            className="grid-img"
            onClick={() => {
              navigate("/navbar");
            }}
          />
        </div>
        <div className="refund-sub">
          <h1>Refund Policy</h1>
          <div>
            <ul>
              <li>
                We collect an advance amount of 700/- towards the confirmation
                of your booking. Partial advance amount (Rs 500/-) is refundable
                if you cancel the slot 72 hours prior to your booking.
              </li>
              <li>
                Please note that we do not offer refunds for any cancellations
                made after the 72-hour window. We also do not offer refunds for
                no-shows or late arrivals.
              </li>
              <li>
                If you need to cancel your booking, please contact us as soon as
                possible throughWhatsApp (9948954545), so that we can make
                arrangements for your refund. We will process your refund within
                7 business days of receiving your cancellation request.
              </li>
            </ul>
          </div>
          <h2>
            If you have any questions or concerns about our refund policy,
            please do not hesitate to contact us.
            <span>We are always happy to help!</span>{" "}
          </h2>
        </div>
      </div>
    </>
  );
};
export default Refund;
