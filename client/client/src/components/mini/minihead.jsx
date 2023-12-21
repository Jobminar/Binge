import grid from "../../assets/images/grid.png";
import "./mini-head.css";
import { useNavigate } from "react-router-dom";

const Minihead = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mini-head">
        <h1>
          STANDARD<span>THEATRE</span>
        </h1>
        <div
          className="mini-head-img"
          onClick={() => {
            navigate("/navbar");
          }}
        >
          <img src={grid} alt="mini-img" />
        </div>
      </div>
    </>
  );
};
export default Minihead;
