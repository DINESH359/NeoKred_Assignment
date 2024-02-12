import React from 'react';
import './ConversionSelector.css';

function ConversionSelector({ onMethodChange }) {
  const handleToggleChange = (e) => {
    const conversionMethod = e.target.value;
    onMethodChange(conversionMethod);
  };

  return (
    <div className="ConversionSelector">
      <h1>Select Conversion Method</h1>
      <div className="toggleContainer">
        <div className="toggleOption">
          <label>
            <input
              type="radio"
              name="conversionMethod"
              value="client"
              onChange={handleToggleChange}
            />
            Convert using Client
          </label>
        </div>
        <div className="toggleOption">
          <label>
            <input
              type="radio"
              name="conversionMethod"
              value="server"
              onChange={handleToggleChange}
            />
            Convert using Server
          </label>
        </div>
      </div>
    </div>
  );
}

export default ConversionSelector;
