// LabelComponent.js
import { useState } from "react";
import PopupComponent from "./PopupComponent";

const LabelComponent = () => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [labelData, setLabelData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    numOfPeople: "",
    address: "",
    extras: [],
  });

  const handleOpenPopup = () => {
    setPopupIsOpen(true);
  };

  const handleSavePopup = (data) => {
    setLabelData({ ...labelData, ...data });
  };

  const handleClosePopup = () => {
    setPopupIsOpen(false);
  };

  const handleAddExtras = (extrasData) => {
    setLabelData({
      ...labelData,
      extras: [...labelData.extras, extrasData],
    });
  };

  return (
    <div>
      <h1>Label Component</h1>
      <p>
        <strong>Name:</strong> {labelData.name}
      </p>
      <p>
        <strong>Contact:</strong> {labelData.contact}
      </p>
      <p>
        <strong>Date:</strong> {labelData.date}
      </p>
      <p>
        <strong>Time:</strong> {labelData.time}
      </p>
      <p>
        <strong>No of People:</strong> {labelData.numOfPeople}
      </p>
      <p>
        <strong>Address:</strong> {labelData.address}
      </p>
      <button onClick={handleOpenPopup}>Add Extras</button>
      {/* Render the PopupComponent for adding extras */}
      <PopupComponent
        isOpen={popupIsOpen}
        onRequestClose={handleClosePopup}
        onSave={handleAddExtras}
      />
    </div>
  );
};

export default LabelComponent;
