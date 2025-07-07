import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        padding: "0.5rem 1rem",
        background: isDark ? "#444" : "#eee",
        color: isDark ? "#fff" : "#000",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        zIndex: 999,
      }}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
