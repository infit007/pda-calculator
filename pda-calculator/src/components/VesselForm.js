import React from "react";

function VesselForm({ vesselData, setVesselData }) {
  const handleChange = e => {
    const { name, value } = e.target;
    setVesselData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h3>Vessel Details</h3>
      <input name="vesselName" placeholder="Vessel Name" onChange={handleChange} />
      <input name="vesselType" placeholder="Vessel Type" onChange={handleChange} />
      <input name="GT" type="number" placeholder="Gross Tonnage" onChange={handleChange} />
      <input name="DWT" type="number" placeholder="Deadweight" onChange={handleChange} />
      <input name="LOA" type="number" placeholder="Length Overall" onChange={handleChange} />
    </div>
  );
}

export default VesselForm;
