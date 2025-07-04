import React from "react";

function ChargesForm({ editableRates, setEditableRates }) {
  // Recursively flatten nested objects into dot-notation keys
  const flattenObject = (obj, parentKey = "") => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        return { ...acc, ...flattenObject(value, newKey) };
      } else {
        return { ...acc, [newKey]: value };
      }
    }, {});
  };

  const flattenedRates = flattenObject(editableRates);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Update nested state safely
    setEditableRates((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop();
      let nested = { ...prev };

      let pointer = nested;
      for (const k of keys) {
        pointer[k] = { ...pointer[k] }; // clone each nested level
        pointer = pointer[k];
      }

      pointer[lastKey] = type === "number" ? parseFloat(value) || 0 : value;
      return nested;
    });
  };

  return (
    <div>
      <h3>Charges</h3>
      {Object.entries(flattenedRates).map(([key, value]) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            name={key}
            type={typeof value === "string" ? "text" : "number"}
            value={value}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}

export default ChargesForm;
