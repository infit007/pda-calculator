export default function VesselForm({ vesselData, setVesselData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVesselData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold">Vessel Name</label>
        <input
          name="vesselName"
          type="text"
          value={vesselData.vesselName}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Vessel Type</label>
        <select
          name="vesselType"
          value={vesselData.vesselType}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select vessel type</option>
          <option value="Container Vessel">Container Vessel</option>
          <option value="Bulk Carrier">Bulk Carrier</option>
          <option value="Car Carrier">Car Carrier</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Gross Tonnage (GT)</label>
        <input
          name="GRT"
          type="number"
          value={vesselData.GRT}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Deadweight Tonnage (DWT)</label>
        <input
          name="DWT"
          type="number"
          value={vesselData.DWT}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Length Overall (LOA) - meters</label>
        <input
          name="LOA"
          type="number"
          value={vesselData.LOA}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Beam - meters</label>
        <input
          name="beam"
          type="number"
          value={vesselData.beam}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
    </div>
  );
}
