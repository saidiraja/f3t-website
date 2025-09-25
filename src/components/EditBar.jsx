// src/components/EditBar.jsx
import { useAdmin } from "../admin/AdminContext";
import { Link } from "react-router-dom";

export default function EditBar({ manageTo = "/", extra = null }) {
  const { loggedIn, logout } = useAdmin();
  if (!loggedIn) return null;

  const barStyle = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    padding: "0.5rem 1rem",
    background: "rgba(5,29,64,0.95)",
    color: "#fff",
    borderBottom: "2px solid #d51820",
  };

  const btn = {
    border: "1px solid #d51820",
    background: "#d51820",
    color: "#fff",
    padding: "0.35rem 0.7rem",
    borderRadius: "6px",
    textDecoration: "none",
  };

  return (
    <div style={barStyle} role="region" aria-label="Admin edit bar">
      <strong>Admin Mode</strong>
      <Link to={manageTo} style={btn}>Manage this page</Link>
      {extra}
      <button onClick={logout} style={{ ...btn, background: "#444", borderColor: "#444" }}>
        Logout
      </button>
    </div>
  );
}
