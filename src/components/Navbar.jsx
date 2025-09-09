// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import LangSwitch from "./LangSwitch";
import { useAdmin } from "../admin/AdminContext";

const Navbar = () => {
  const location = useLocation();
  const { t, lang } = useI18n();
  const { loggedIn, logout } = useAdmin();
  const navigate = useNavigate();

  const T = (fr, en) => (lang === "fr" ? fr : en);
  const safe = (obj, key, fallback) => (obj && obj[key]) || fallback;

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? "#d51820" : "white",
    textDecoration: "none",
    padding: "0.3rem 0.6rem",
    position: "relative",
    transition: "all 0.2s ease",
    outline: "none",
  });

  const linkUnderline = (path) => ({
    content: '""',
    position: "absolute",
    left: 0,
    bottom: "-4px",
    height: "2px",
    width: isActive(path) ? "100%" : "0%",
    backgroundColor: "#d51820",
    transition: "width 0.2s ease",
  });

  const onLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.8rem 2rem",
        backgroundColor: "#051d40",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
      role="navigation"
      aria-label="Main"
    >
      {/* Logo & brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src="/Nlogo.png"
          alt="F3T"
          style={{ height: "40px", width: "auto" }}
          loading="eager"
        />
        <Link to="/" style={linkStyle("/")} aria-current={isActive("/") ? "page" : undefined}>
          <strong>F3T</strong>
        </Link>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
        {[
          { path: "/", label: safe(t?.nav, "home", T("Accueil", "Home")) },
          { path: "/about", label: safe(t?.nav, "about", T("À propos", "About")) },
          { path: "/services", label: safe(t?.nav, "services", T("Services", "Services")) },
          { path: "/industries", label: safe(t?.nav, "industries", T("Industries", "Industries")) },
          { path: "/certifications", label: safe(t?.nav, "certifications", T("Certifications", "Certifications")) },
          { path: "/clients", label: safe(t?.nav, "clients", T("Clients", "Clients")) },
          { path: "/news", label: T("Actualités", "News") },
          { path: "/contact", label: safe(t?.nav, "contact", T("Contact", "Contact")) },
        ].map(({ path, label }) => (
          <div key={path} style={{ position: "relative" }}>
            <Link to={path} style={linkStyle(path)} aria-current={isActive(path) ? "page" : undefined}>
              {label}
            </Link>
            <span style={linkUnderline(path)}></span>
          </div>
        ))}

        {/* Language switch */}
        <LangSwitch />

        {/* Admin */}
        {!loggedIn ? (
          <div style={{ position: "relative" }}>
            <Link
              to="/admin/login"
              style={linkStyle("/admin/login")}
              aria-current={isActive("/admin/login") ? "page" : undefined}
            >
              Admin
            </Link>
            <span style={linkUnderline("/admin/login")}></span>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <Link to="/admin" style={linkStyle("/admin")} aria-current={isActive("/admin") ? "page" : undefined}>
              {T("Tableau de bord", "Dashboard")}
            </Link>
            <button
              onClick={onLogout}
              style={{
                background: "transparent",
                border: "1px solid #d51820",
                color: "#d51820",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {T("Déconnexion", "Logout")}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
