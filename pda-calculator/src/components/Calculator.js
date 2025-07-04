import React, { useState, useEffect } from "react";
import PortSelector from "./PortSelector";
import VesselForm from "./VesselForm";
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
  });
  const [editableRates, setEditableRates] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (selectedPort) {
      setEditableRates(tariffsData[selectedPort] || {});
    }
  }, [selectedPort]);

  const calculate = () => {
    const GRT = parseFloat(vesselData.GRT) || 0;
    const cargoQuantity = parseFloat(vesselData.cargoQuantity) || 0;
    const containerCount = parseInt(vesselData.containerCount) || 0;
    const freshWaterMT = parseFloat(vesselData.freshWaterMT) || 0;
    const berthHours = parseFloat(vesselData.berthHours) || 0;
    const anchorageHours = parseFloat(vesselData.anchorageHours) || 0;
    const reeferHours = parseFloat(vesselData.reeferHoursPerContainer) || 0;
    const demurrageDays = parseFloat(vesselData.demurrageDays) || 0;
    const isCoastal = vesselData.isCoastal;
    const coastalFactor = isCoastal ? 0.6 : 1;

    let portDues = 0;
    let pilotage = 0;
    let berthHire = 0;
    let anchorage = 0;
    let garbage = 0;
    let freshWater = 0;
    let containerHandling = 0;
    let wharfage = 0;
    let shiftingCharges = 0;

    if (selectedPort === "Paradip Port") {
      const wharfageRate = editableRates.wharfageRatesPerMT?.[vesselData.cargoType] || 0;
      wharfage = wharfageRate * cargoQuantity * coastalFactor;

      const containerWharfageRate = editableRates.containerWharfagePerContainer?.[vesselData.containerSize] || 0;
      containerHandling = containerCount * containerWharfageRate * coastalFactor;

      const reeferRate = editableRates.reeferElectricityPer4Hours?.[vesselData.containerSize] || 0;
      const reeferBlocks = Math.ceil(reeferHours / 4);
      freshWater = containerCount * reeferBlocks * reeferRate * coastalFactor;

      const demurrageRate = editableRates.demurragePerMTPerDay?.[vesselData.demurrageType] || 0;
      shiftingCharges = cargoQuantity * demurrageDays * demurrageRate * coastalFactor;
    } else {
      // JNPT and other ports
      const portDuesRate = editableRates.portDuesPerGRT?.ContainerVessel || 0;
      portDues = portDuesRate * GRT * coastalFactor;

      if (GRT <= 30000) {
        pilotage = GRT * (editableRates.pilotagePerGRT?.UpTo30000 || 0);
      } else if (GRT <= 60000) {
        const fixed = editableRates.pilotagePerGRT?.["30001to60000"]?.fixed || 0;
        const addPerGRT = editableRates.pilotagePerGRT?.["30001to60000"]?.additionalPerGRT || 0;
        pilotage = fixed + (GRT - 30000) * addPerGRT;
      } else {
        const fixed = editableRates.pilotagePerGRT?.Above60000?.fixed || 0;
        const addPerGRT = editableRates.pilotagePerGRT?.Above60000?.additionalPerGRT || 0;
        pilotage = fixed + (GRT - 60000) * addPerGRT;
      }
      pilotage *= coastalFactor;

      const pilotageMin = editableRates.pilotageMinimumPerVisit || 0;
      if (pilotage < pilotageMin) pilotage = pilotageMin;

      berthHire = (editableRates.berthHirePerGRTPerHour || 0) * GRT * berthHours * coastalFactor;
      anchorage = (editableRates.berthHireAnchoragePerGRTPerHour || 0) * GRT * anchorageHours * coastalFactor;
      garbage = (editableRates.garbageCollectionPerVisit || 0) * coastalFactor;
      freshWater = freshWaterMT * (editableRates.freshWaterPerMT || 0);

      const containerRate = editableRates.containerHandlingPerTEU?.["20ftLoaded"] || 0;
      containerHandling = containerCount * containerRate;

      if (vesselData.shiftingRequired && editableRates.shiftingChargesPerGRT) {
        if (GRT <= 30000) {
          shiftingCharges = (editableRates.shiftingChargesPerGRT.SameTerminalUpTo30000 || 0) * GRT * coastalFactor;
        } else if (GRT <= 60000) {
          const fixed = editableRates.shiftingChargesPerGRT["SameTerminal30001to60000"]?.fixed || 0;
          const addPerGRT = editableRates.shiftingChargesPerGRT["SameTerminal30001to60000"]?.additionalPerGRT || 0;
          shiftingCharges = (fixed + (GRT - 30000) * addPerGRT) * coastalFactor;
        } else {
          const fixed = editableRates.shiftingChargesPerGRT["SameTerminalAbove60000"]?.fixed || 0;
          const addPerGRT = editableRates.shiftingChargesPerGRT["SameTerminalAbove60000"]?.additionalPerGRT || 0;
          shiftingCharges = (fixed + (GRT - 60000) * addPerGRT) * coastalFactor;
        }
      }
    }

    const subtotal = portDues + pilotage + berthHire + anchorage + garbage + freshWater + containerHandling + wharfage + shiftingCharges;
    const taxRate = editableRates.taxRate || 0;
    const tax = (taxRate / 100) * subtotal;
    const total = subtotal + tax;

    setResult({
      PortDues: portDues,
      Pilotage: pilotage,
      BerthHire: berthHire,
      Anchorage: anchorage,
      Garbage: garbage,
      FreshWater: freshWater,
      ContainerHandling: containerHandling,
      Wharfage: wharfage,
      ShiftingCharges: shiftingCharges,
      Subtotal: subtotal,
      Tax: tax,
      Total: total,
    });
  };

  return (
    <div>
      <PortSelector
        ports={Object.keys(tariffsData)}
        selectedPort={selectedPort}
        setSelectedPort={setSelectedPort}
      />
      <VesselForm vesselData={vesselData} setVesselData={setVesselData} />
      <ChargesForm
        editableRates={editableRates}
        setEditableRates={setEditableRates}
      />
      <button onClick={calculate}>Calculate</button>
      {result && <SummaryTable result={result} />}
    </div>
  );
}

export default Calculator;
