export default function PortSelector({ ports, selectedPort, setSelectedPort }) {
  return (
    <div>
      <label className="block font-semibold mb-1">Select Indian Port</label>
      <select
        className="w-full border rounded p-2"
        value={selectedPort}
        onChange={(e) => setSelectedPort(e.target.value)}
      >
        <option value="">Select a port</option>
        {ports.map((port) => (
          <option key={port} value={port}>
            {port}
          </option>
        ))}
      </select>
    </div>
  );
}
