import { useNavigate } from "react-router-dom";
import "../mini/mini-home.css";
import grid from "../../assets/images/grid.png";
const Largehead = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mini-head">
        <h1>
          LUXI<span>THEATRE</span>
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
export default Largehead;
