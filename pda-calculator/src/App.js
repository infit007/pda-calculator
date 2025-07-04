import React from "react";
import Calculator from "./components/Calculator";
import "./styles.css";

function App() {
  return (
    <>
      <header>
        <h1>Proforma Disbursement Account (PDA) Calculator</h1>
      </header>

      <div className="App">
        <Calculator />
      </div>

      <footer>
        © {new Date().getFullYear()} PDA Calculator — Precision Maritime Costing
      </footer>
    </>
  );
}

export default App;
