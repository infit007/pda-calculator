export default function CargoForm({ vesselData, setVesselData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVesselData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold">Cargo Type</label>
        <select
          name="cargoType"
          value={vesselData.cargoType}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select cargo type</option>
          <option value="Coal">Coal</option>
          <option value="Iron Ore (IOHP)">Iron Ore (IOHP)</option>
          <option value="Fertilizers">Fertilizers</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Quantity (Metric Tons)</label>
        <input
          name="cargoQuantity"
          type="number"
          value={vesselData.cargoQuantity}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
    </div>
  );
}
