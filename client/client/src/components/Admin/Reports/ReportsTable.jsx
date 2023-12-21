import PropTypes from "prop-types";

import SalesData from "./SalesData";
import ReportsData from "./ReportData";

const ReportsTable = ({ view }) => {
  // Define visibleColumns based on the view
  const visibleColumns = (() => {
    switch (view) {
      case "daily":
        return ["Date", "ordersDaily"];
      case "weekly":
        return ["Date", "ordersWeekly"];
      case "monthly":
        return ["Date", "ordersMonthly"];
      default:
        return ["Date", "allorders"];
    }
  })();

  // Define data to use (SalesData or ReportsData)
  const dataToUse = view === "all" ? ReportsData : SalesData;

  return (
    <div className="reports-table-container">
      <div className="card mb-3">
        <div className="card-header">
          <h5>Reports Table</h5>
        </div>
        <div className="card-body">
          <table className="table table-responsive striped bordered">
            <thead>
              <tr>
                {visibleColumns.map((column, index) => (
                  <th key={index} className="text-center">
                    {column}
                  </th>
                ))}
                {/* Include sub-columns for Theatre Sales and Addon Sales by default */}
                <th className="text-center">Theatre Sales</th>
                <th className="text-center">Max Theatre Sales</th>
                <th className="text-center">Addon Sales</th>
                <th className="text-center">
                  {view === "all" ? "Cumulative Sales" : "Total Sales"}
                </th>
                {/* Enhance the "Orders" column */}
                {view === "all" && (
                  <>
                    <th className="text-center">Orders Daily</th>
                    <th className="text-center">Orders Weekly</th>
                    <th className="text-center">Orders Monthly</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {dataToUse.map((row, rowIndex) => (
                <tr key={row.date || rowIndex}>
                  {visibleColumns.map((column, colIndex) => (
                    <td key={colIndex} className="text-center">
                      {column === "Date" ? row.date : row[column]}
                    </td>
                  ))}
                  {/* Render sub-columns for Theatre Sales and Addon Sales by default */}
                  <td className="text-center">
                    {row.miniTheatreSales || row.ordersDaily}
                  </td>
                  <td className="text-center">
                    {row.maxTheatreSales || row.ordersWeekly}
                  </td>
                  <td className="text-center">
                    {row.addOnSales || row.ordersMonthly}
                  </td>
                  <td className="text-center">
                    {row.cumulativeSales || row.allorders}
                  </td>
                  {/* Enhance the "Orders" column */}
                  {view === "all" && (
                    <>
                      <td className="text-center">
                        {row.ordersDaily !== undefined ? row.ordersDaily : ""}
                      </td>
                      <td className="text-center">
                        {row.ordersWeekly !== undefined ? row.ordersWeekly : ""}
                      </td>
                      <td className="text-center">
                        {row.ordersMonthly !== undefined
                          ? row.ordersMonthly
                          : ""}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ReportsTable.propTypes = {
  view: PropTypes.string.isRequired,
};

export default ReportsTable;
