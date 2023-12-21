import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { FaWhatsapp, FaEnvelope, FaPrint } from "react-icons/fa";
import logoImg from "../../assets/images/logo.png";
import emailjs from "emailjs-com";

const generateEmailContent = async (userDetails) => {
  const {
    name,
    email,
    theaterType,
    date,
    time,
    numOfPeople,
    addons,
    generatedBill,
    dueAmount,
  } = userDetails;

  // Create a plain text message
  const message = `
Hello ${name},

You have a new booking from Binge-in:

Booking details:
- Email: ${email}
- Theater Type: ${theaterType || "N/A"}
- Booking Date: ${date || "N/A"}
- Booking Time: ${time}
- Number of People: ${numOfPeople || "N/A"}
- Add-ons: ${addons || "None"}
- Total Amount: ${generatedBill || "N/A"}
- Due Amount: ${dueAmount || "N/A"}

${
  isEmpty(userDetails)
    ? "Please update the missing information and confirm the booking."
    : ""
}

Best regards,

Binge-in Team
`;

  const data = {
    service_id: "service_zuzw9ng",
    template_id: "template_xr6lnsn",
    user_id: "DCG4wsBcgrfnSESqp",
    template_params: {
      to_name: name,
      from: "Binge-in",
      to: email, // Use the recipient's email from userDetails
      message: message,
      reply_to: email,
      Bcc: "jobminarinfo@gmail.com",
      cc: "sameerg1810@gmail.com", // Use the plain text message
    },
  };

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("Email sent successfully!");
    } else {
      const error = await response.text();
      console.error(error);
      alert("Error sending email. Please try again later.");
    }
  } catch (error) {
    console.error(error);
    alert("Error sending email. Please try again later.");
  }
};

function isEmpty(object) {
  return Object.keys(object).length === 0;
}

const PrintShare = ({ userDetails }) => {
  const componentRef = useRef();

  const customLabels = {
    theaterType: "Theatre Type",
    name: "Customer Name",
    contact: "Contact Number",
    date: "Booking Date",
    time: "Booking Time",
    numOfPeople: "Number of People",
    addons: "Add-ons",
    CGST: "CGST",
    SGST: "SGST",
    generatedBill: "TOTAL AMOUNT",
    dueAmount: "Due Amount",
  };

  const handlePrint = () => {
    const invoiceNumber = Math.floor(Math.random() * 100000);
    const paymentId = Math.floor(Math.random() * 100000);

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            /* Your styles here */
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="header">
              <img src="${logoImg}" alt="Logo"/>
            </div>
            <h2>Binge-inn Invoice</h2>
            <div class="details">
              ${Object.keys(userDetails)
                .map(
                  (key) =>
                    `<p><strong>${
                      customLabels[key] || key
                    }:</strong> <span style="float:right;">${
                      userDetails[key]
                    }</span></p>`
                )
                .join("")}
              <p><strong>Invoice Number:</strong> <span style="float:right;">${invoiceNumber}</span></p>
              <p><strong>Payment ID:</strong> <span style="float:right;">${paymentId}</span></p>
            </div>
            <div class="footer">
              <p><strong>Terms and Conditions:</strong></p>
              <p>This is a sample invoice. Payment is due within 30 days. Late payments are subject to a 10% fee.</p>
            </div>
            <div class="actions">
              <span class="close-button" onclick="window.close()">Powered BY SANJO-INFOTECH & JOBMINAR</span>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleShareWhatsApp = () => {
    let whatsappMessage = "🎉 Binge-inn Invoice 🎉\n\n";
    Object.keys(userDetails).forEach((key) => {
      const label = customLabels[key] || key;
      const value = userDetails[key];
      whatsappMessage += `*${label}:* ${value}\n`;
    });
    whatsappMessage += "\n*Terms and Conditions:*\n";
    whatsappMessage +=
      "This is a sample invoice. Payment is due within 30 days. Late payments are subject to a 10% fee.\n";
    whatsappMessage += "\nThank you for choosing Binge-inn! 🍿🎬";
    whatsappMessage = encodeURIComponent(whatsappMessage);
    const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;
    window.open(whatsappLink, "_blank");
  };

  const handleShareEmail = () => {
    generateEmailContent(userDetails);
  };

  return (
    <div className="print-share-container">
      <div className="print-share-template" ref={componentRef}>
        <div className="actions">
          <Button className="print-button" onClick={handlePrint}>
            <FaPrint className="me-2" />
            Print Invoice
          </Button>
          <div className="share-dropdown ms-2 mt-1">
            <DropdownButton
              id="share-dropdown"
              title="Share"
              variant="secondary"
              className="share-dropdown"
            >
              <Dropdown.Item onClick={handleShareWhatsApp}>
                <FaWhatsapp className="me-2" />
                Share via WhatsApp
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShareEmail}>
                <FaEnvelope className="me-2" />
                Share via Email
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
};

PrintShare.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

export default PrintShare;
