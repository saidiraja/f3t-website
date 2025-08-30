// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import LangSwitch from "./LangSwitch";

const Navbar = () => {
  const location = useLocation();
  const { t } = useI18n();

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
        <div style={{ position: "relative" }}>
          <Link to="/" style={linkStyle("/")} aria-current={isActive("/") ? "page" : undefined}>
            {t.nav.home}
          </Link>
          <span style={linkUnderline("/")}></span>
        </div>

        <div style={{ position: "relative" }}>
          <Link
            to="/about"
            style={linkStyle("/about")}
            aria-current={isActive("/about") ? "page" : undefined}
          >
            {t.nav.about}
          </Link>
          <span style={linkUnderline("/about")}></span>
        </div>

        <div style={{ position: "relative" }}>
          <Link
            to="/services"
            style={linkStyle("/services")}
            aria-current={isActive("/services") ? "page" : undefined}
          >
            {t.nav.services}
          </Link>
          <span style={linkUnderline("/services")}></span>
        </div>

        <div style={{ position: "relative" }}>
          <Link
            to="/industries"
            style={linkStyle("/industries")}
            aria-current={isActive("/industries") ? "page" : undefined}
          >
            {t.nav.industries}
          </Link>
          <span style={linkUnderline("/industries")}></span>
        </div>

        <div style={{ position: "relative" }}>
          <Link
            to="/certifications"
            style={linkStyle("/certifications")}
            aria-current={isActive("/certifications") ? "page" : undefined}
          >
            {t.nav.certifications}
          </Link>
          <span style={linkUnderline("/certifications")}></span>
        </div>

        <div style={{ position: "relative" }}>
          <Link
            to="/clients"
            style={linkStyle("/clients")}
            aria-current={isActive("/clients") ? "page" : undefined}
          >
            {t.nav.clients}
          </Link>
          <span style={linkUnderline("/clients")}></span>
        </div>

        <div style={{ position: "relative" }}>
          <Link
            to="/contact"
            style={linkStyle("/contact")}
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            {t.nav.contact}
          </Link>
          <span style={linkUnderline("/contact")}></span>
        </div>

        {/* Language switch */}
        <LangSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
