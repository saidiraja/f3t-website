import { useEffect, useState } from "react";
import "./DarkModeToggle.css";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      className="dark-toggle"
      onClick={() => setDark(!dark)}
      title={dark ? "Light Mode" : "Dark Mode"}
    >
      <i className={`fas ${dark ? "fa-sun" : "fa-moon"}`}></i>
    </button>
  );
}
