import { useEffect, useState } from "react";
import { FaTrash, FaPhone, FaEnvelope } from "react-icons/fa";

const Getbookings = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://binge-be.onrender.com/getorders?page=${currentPage}&limit=${recordsPerPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.message || "An error occurred while fetching data."
      );
    }
  };

  const handleDeleteContactUs = async (contactId) => {
    try {
      const response = await fetch(
        `https://binge-be.onrender.com/deleteorders/${contactId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the deletion is successful, fetch the updated data
        fetchData();
      } else {
        console.error(
          `Failed to delete Contact Us entry with ID ${contactId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        "Error deleting Contact Us entry:",
        error.message || "An error occurred while deleting Contact Us entry."
      );
    }
  };

  const handlePhoneCall = (phone) => {
    // Implement phone call functionality here
    console.log(`Calling ${phone}`);
  };

  const handleSendEmail = (email) => {
    // Implement email sending functionality here
    console.log(`Sending email to ${email}`);
  };

  const totalPages = Math.ceil(data.total / recordsPerPage);

  return (
    <div style={{ minHeight: "300px" }}>
      <h2>Enquiries</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(data.results ?? []).map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>
                <button
                  onClick={() => handleDeleteContactUs(contact._id)}
                  style={{ background: "none", border: "none" }}
                >
                  <FaTrash style={{ color: "red" }} />
                </button>
                <button
                  onClick={() => handlePhoneCall(contact.phone)}
                  style={{ background: "none", border: "none" }}
                >
                  <FaPhone style={{ color: "red" }} />
                </button>
                <button
                  onClick={() => handleSendEmail(contact.mailID)}
                  style={{ background: "none", border: "none" }}
                >
                  <FaEnvelope style={{ color: "red" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Getbookings;
