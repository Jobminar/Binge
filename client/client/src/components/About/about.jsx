import "./about.css";
import gridimage from "../../assets/images/grid.png";
// import { AboutCarousel } from './about-carousel'
import { useNavigate } from "react-router-dom";
import standard from "../../assets/images/mini-theater.jpeg";
import luxi from "../../assets/images/large.jpeg";

const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="aboutus-con">
        <div className="aboutus-main-con">
          <h1>ABOUT US</h1>
          <img
            src={gridimage}
            alt="gridimage"
            onClick={() => {
              navigate("/navbar");
            }}
          />
        </div>
        <p className="company-info">
          Binge in offers an exclusive private theatre and event celebration
          experience. Guests can reserve our theaters for watching their
          favourite movies and shows on a large screen, as well as celebrating
          memorable occasions such as birthdays, anniversaries, dates and many
          more. We offer high-fidelity audio of Dolby Atmos compliant sound
          systems and 4k Video
        </p>
        <div className="react-carousel">
          <div className="standard-img">
            <img src={standard} alt="standard" />
          </div>
          <div className="luxi-img">
            <img src={luxi} alt="luxi" />
          </div>
        </div>
        <p className="company-info">
          At Binge in, we go beyond just offering private theatre and
          exceptional event experiences. We also provide delicious food, cakes
          and flowers along with stunning decorations to enhance your
          celebrations.We believe that every element should come together
          seamlessly to create an unforgettable experience for you and your
          guests. Our dedicated team is committed to ensuring every detail is
          taken care of, so you can relax and fully enjoy your time with us.
        </p>
      </div>
    </>
  );
};
export default Aboutus;
