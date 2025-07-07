import React from "react";
import Calculator from "./components/Calculator";
import "./styles.css";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <>
      <ThemeToggle />

      <header>
        <h1>🛳️ Proforma Disbursement Account (PDA) Calculator</h1>
        <p className="subtitle">
          Estimate your port call costs with confidence
        </p>
      </header>

      <main className="App">
        <Calculator />
      </main>

      <footer>
        © {new Date().getFullYear()} PDA Calculator — Precision Maritime Costing
      </footer>
    </>
  );
}

export default App;
