import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "#051d40",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <h1 style={{ fontSize: "2rem", animation: "fadeIn 1s ease-in-out infinite alternate" }}>
        Loading F3T...
      </h1>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0.3; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
