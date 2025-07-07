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
        <label className="block font-semibold mb-1">Anchorage Required</label>
        <div className="flex items-center gap-8 p-2 border rounded">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium mb-1 cursor-pointer">Yes</label>
            <input
              type="radio"
              name="anchorageRequired"
              value="Yes"
              checked={vesselData.anchorageRequired === "Yes"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium mb-1 cursor-pointer">No</label>
            <input
              type="radio"
              name="anchorageRequired"
              value="No"
              checked={vesselData.anchorageRequired === "No"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}