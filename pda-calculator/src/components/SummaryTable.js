import React from "react";

function SummaryTable({ result }) {
  if (!result) return null;

  return (
    <div>
      <h3>Calculation Summary</h3>
      <table>
        <tbody>
          {Object.entries(result).map(([key, value]) => (
            <tr key={key}>
              <td>{key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, s => s.toUpperCase())}
              </td>
              <td>
                {typeof value === "number"
                  ? value.toFixed(2)
                  : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
