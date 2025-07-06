export default function SummaryTable({ result }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Calculation Summary</h3>
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(result).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="py-1">{key}</td>
              <td className="text-right py-1">₹ {value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
