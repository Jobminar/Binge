// PopupComponent.js
import { useState } from "react";
import Modal from "react-modal";

const PopupComponent = ({ isOpen, onRequestClose, onSave }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleSave = () => {
    if (!inputValue.trim()) {
      setError("Input is required");
      return;
    }

    onSave(inputValue);
    setInputValue("");
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Popup Component</h2>
      <div>
        <label>Input:</label>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        {error && <span className="error">{error}</span>}
      </div>
      <button onClick={handleSave}>Save</button>
    </Modal>
  );
};

export default PopupComponent;
