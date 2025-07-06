export default function StayForm({ vesselData, setVesselData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVesselData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold">Arrival Date</label>
        <input
          name="arrivalDate"
          type="datetime-local"
          value={vesselData.arrivalDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Departure Date</label>
        <input
          name="departureDate"
          type="datetime-local"
          value={vesselData.departureDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Berth Type</label>
        <select
          name="berthType"
          value={vesselData.berthType}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select berth type</option>
          <option value="Alongside">Alongside</option>
          <option value="Anchorage">Anchorage</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Anchorage Required</label>
        <div className="flex gap-4 mt-1">
          <label>
            <input
              type="radio"
              name="anchorageRequired"
              checked={vesselData.anchorageRequired === "Yes"}
              onChange={() =>
                setVesselData({ ...vesselData, anchorageRequired: "Yes" })
              }
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="anchorageRequired"
              checked={vesselData.anchorageRequired === "No"}
              onChange={() =>
                setVesselData({ ...vesselData, anchorageRequired: "No" })
              }
            />
            No
          </label>
        </div>
      </div>
    </div>
  );
}
