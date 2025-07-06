import React, { useState, useEffect } from "react";
import PortSelector from "./PortSelector";
import VesselForm from "./VesselForm";
import CargoForm from "./CargoForm";
import StayForm from "./StayForm";
import ChargesForm from "./ChargesForm";
import SummaryTable from "./SummaryTable";
import tariffsData from "../data/defaultTariffs.json";

function Calculator() {
  const [selectedPort, setSelectedPort] = useState("");
  const [vesselData, setVesselData] = useState({
    vesselName: "",
    vesselType: "",
    GRT: 0,
    DWT: 0,
    LOA: 0,
    beam: 0,
    isCoastal: false,
    cargoType: "",
    cargoQuantity: 0,
    containerSize: "",
    containerCount: 0,
    reeferHoursPerContainer: 0,
    demurrageType: "",
    demurrageDays: 0,
    freshWaterMT: 0,
    berthHours: 0,
    anchorageHours: 0,
    shiftingRequired: false,
    arrivalDate: "",
    departureDate: "",
    berthType: ""
  });
  const [editableRates, setEditableRates] = useState({});
  const [result, setResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (selectedPort) {
      setEditableRates(tariffsData[selectedPort] || {});
    }
  }, [selectedPort]);

  const validate = () => {
    const errors = [];
    if (!selectedPort) errors.push("Select an Indian port");
    if (!vesselData.vesselName) errors.push("Enter vessel name");
    if (!vesselData.vesselType) errors.push("Select vessel type");
    if (vesselData.GRT <= 0) errors.push("Enter gross tonnage (GT)");
    if (!vesselData.arrivalDate || !vesselData.departureDate)
      errors.push("Set arrival and departure dates");
    return errors;
  };

  const calculate = () => {
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setResult(null);
      return;
    }
    setValidationErrors([]);
    setResult({
      PortDues: 5000,
      Pilotage: 7000,
      Subtotal: 12000,
      Tax: 1200,
      Total: 13200
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="flex-1 space-y-4">
        <div className="bg-white rounded shadow p-4">
          <PortSelector
            ports={Object.keys(tariffsData)}
            selectedPort={selectedPort}
            setSelectedPort={setSelectedPort}
          />
        </div>
        <div className="bg-white rounded shadow p-4">
          <VesselForm vesselData={vesselData} setVesselData={setVesselData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <CargoForm vesselData={vesselData} setVesselData={setVesselData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <StayForm vesselData={vesselData} setVesselData={setVesselData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <ChargesForm editableRates={editableRates} setEditableRates={setEditableRates} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <button
            onClick={calculate}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Calculate PDA
          </button>
          {validationErrors.length > 0 && (
            <div className="mt-2 p-3 bg-yellow-100 text-yellow-800 rounded">
              <p className="font-semibold mb-1">Required Information Missing:</p>
              <ul className="list-disc list-inside">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <div className="bg-white rounded shadow p-4">
          {result ? (
            <SummaryTable result={result} />
          ) : (
            <div className="text-gray-500 text-center">
              <p className="text-lg font-semibold">PDA Calculation Results</p>
              <p className="mt-2">Fill in the details and click Calculate PDA.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
