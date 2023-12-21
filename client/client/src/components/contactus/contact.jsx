import "./contact.css";
import { useNavigate } from "react-router-dom";
import call from "../../assets/images/call.png";
import insta from "../../assets/images/icon _instagram with circle icon_insta.png";
import mail from "../../assets/images/icon _Mail_.png";
import location from "../../assets/images/location-logo.png";
import facebook from "../../assets/images/icon _facebook_facebook.png";
import youtube from "../../assets/images/icon _youtube with circle_youtube.png";
import grid from "../../assets/images/grid.png";
import Minsta from "../../assets/images/M-insta.png";
import Mfacebook from "../../assets/images/M-facebook.png";
import Myoutube from "../../assets/images/M-youtube.png";
import sendmessage from "../../assets/images/Frame 13.png";
import followus from "../../assets/images/Frame 14.png";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="contact-con">
        <div className="main-contact">
          <div className="main-head">
            <p>CONTACT US</p>
          </div>

          <div className="form">
            <p>
              Feel free to contact us anytime. We will get back to you as soon
              as we can !{" "}
            </p>
            <form>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Mail ID" />
              <input type="text" placeholder="Phone" />
              <input type="text" placeholder="Message" />
            </form>
            <div className="sendmessage">
              <img src={sendmessage} alt="send message" />
            </div>
          </div>
          <div className="contact-grid">
            <img
              src={grid}
              alt="grid"
              onClick={() => {
                navigate("/navbar");
              }}
            />
          </div>
        </div>
        <div className="footer-con">
          <div className="contact-info">
            <div>
              <img src={call} alt="call" />
              <span>+91 8618976974</span>
            </div>
            <div>
              <img src={insta} alt="call" />
              <span></span>
            </div>
            <div>
              <img src={mail} alt="call" />
              <span>thebingein90@gmail.com</span>
            </div>
          </div>
          <div className="address">
            <div>
              <img src={location} alt="call" />
              <span>
                Official Address
                <br />
                2nd floor, Plot # 67, Vivekananda Nagar Rd,
                <br />
                Chitraseema Nagar, Mansoorabad Rd,
                <br />
                Mansoorabad,Telangana,500070
              </span>
            </div>
          </div>
          <div className="socialmedia">
            <img src={facebook} alt="socialmedia" />
            <img src={insta} alt="socialmedia" />
            <img src={youtube} alt="socialmedia" />
          </div>
          <div className="mobile-socialmedia">
            <img src={Mfacebook} alt="socialmedia" />
            <img src={Minsta} alt="socialmedia" />
            <img src={Myoutube} alt="socialmedia" />
          </div>
          <div className="followus">
            <img src={followus} alt="send message" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
