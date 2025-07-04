import React from "react";

function PortSelector({ ports, selectedPort, setSelectedPort }) {
  return (
    <div>
      <label>Port: </label>
      <select
        value={selectedPort}
        onChange={(e) => setSelectedPort(e.target.value)}
      >
        <option value="">Select Port</option>
        {ports.map((port) => (
          <option key={port} value={port}>
            {port}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PortSelector;
