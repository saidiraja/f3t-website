import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#d51820" : "white",
    textDecoration: "none",
    padding: "0.3rem 0.6rem",
    position: "relative",
    transition: "all 0.3s",
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
    >
      {/* Logo & name */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src="/Nlogo.png" alt="F3T Logo" style={{ height: "40px" }} />
        <Link to="/" style={{ ...linkStyle("/") }}>
          <strong>F3T</strong>
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/about" style={linkStyle("/about")}>About</Link>
        <Link to="/services" style={linkStyle("/services")}>Services</Link>
        <Link to="/industries" style={linkStyle("/industries")}>Industries</Link>
        <Link to="/certifications" style={linkStyle("/certifications")}>Certifications</Link>
        <Link to="/clients" style={linkStyle("/clients")}>Clients</Link>
        <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
        <LanguageToggle />
      </div>
    </nav>
  );
};

export default Navbar;
