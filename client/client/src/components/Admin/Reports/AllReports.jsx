
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReportsChart from "./ReportsChart";
import ReportsTable from "./ReportsTable";
import ReportsData from "./ReportData";
import { MdClose } from "react-icons/md";
import "./AllReports.css"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

const AllReports = ({ initialChartData }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("daily");
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);

  const fetchTableData = () => {
    let filteredData;
    switch (view) {
      case "daily":
        filteredData = ReportsData.map(({ date, ordersDaily }) => ({
          Date: date,
          Orders: ordersDaily,
        }));
        break;
      case "weekly":
        filteredData = ReportsData.map(({ date, ordersWeekly }) => ({
          Date: date,
          Orders: ordersWeekly,
        }));
        break;
      case "monthly":
        filteredData = ReportsData.map(({ date, ordersMonthly }) => ({
          Date: date,
          Orders: ordersMonthly,
        }));
        break;
      default:
        filteredData = ReportsData.map(({ date, allorders }) => ({
          Date: date,
          Orders: allorders,
        }));
        break;
    }
    return filteredData;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      setTableData(fetchTableData());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  const toggleView = (newView) => {
    setView(newView);
  };

  const toggleCardPopup = () => {
    setCardPopupOpen(!isCardPopupOpen);
  };

  return (
    <div className="all-reports-container">
      <div className="inner-container">
        <h1>All Reports</h1>

        <div className="toggle-buttons">
          {["daily", "weekly", "monthly", "all"].map((option) => (
            <button
              key={option}
              onClick={() => toggleView(option)}
              className={`btn btn-outline-danger m-1 ${
                view === option ? "active" : ""
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
          <button
            onClick={toggleCardPopup}
            className={`btn btn-outline-secondary ${
              isCardPopupOpen ? "active" : ""
            }`}
          >
            Graph
          </button>
        </div>

        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        <ReportsTable
          tableData={tableData}
          tableColumns={["Date", "Orders"]} // Adjust as needed
          view={view}
        />
      </div>

      {isCardPopupOpen && (
        <div className="card-popup" id="popup">
          <div className="card">
            <MdClose
              className="close-icon"
              size="1.5em"
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={toggleCardPopup}
            />
            <ReportsChart
              data={initialChartData || ReportsData}
              view={view}
              className="chart"
              onClose={toggleCardPopup} // Pass a function to close the card popup
            />
          </div>
        </div>
      )}
    </div>
  );
};

AllReports.propTypes = {
  initialChartData: PropTypes.array,
};

export default AllReports;
