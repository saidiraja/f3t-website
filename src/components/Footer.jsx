import { Link } from "react-router-dom";
import useLanguage from "./useLanguage";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer
      style={{
        backgroundColor: "#051d40",
        color: "white",
        padding: "3rem 2rem",
        marginTop: "4rem",
        fontSize: "0.95rem",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* Column 1 */}
        <div style={{ flex: "1 1 250px" }}>
          <img
            src="/Nlogo.png"
            alt="F3T Logo"
            style={{ height: "70px", marginBottom: "1rem" }} // ⬅ Bigger logo here
          />
          <p style={{ lineHeight: "1.6" }}>
            {language === "fr"
              ? "Leader tunisien du traitement thermique et de surface depuis 1990."
              : "Tunisia’s leader in heat and surface treatment since 1990."}
          </p>
        </div>

        {/* Column 2 */}
        <div style={{ flex: "1 1 150px" }}>
          <h4 style={{ marginBottom: "1rem" }}>{language === "fr" ? "Liens utiles" : "Quick Links"}</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li><Link to="/" style={footerLink}>Home</Link></li>
            <li><Link to="/about" style={footerLink}>About</Link></li>
            <li><Link to="/services" style={footerLink}>Services</Link></li>
            <li><Link to="/industries" style={footerLink}>Industries</Link></li>
            <li><Link to="/certifications" style={footerLink}>Certifications</Link></li>
            <li><Link to="/clients" style={footerLink}>Clients</Link></li>
            <li><Link to="/contact" style={footerLink}>Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ marginBottom: "1rem" }}>{language === "fr" ? "Contact" : "Contact"}</h4>
          <p>Email: f3t_direction@topnet.tn</p>
          <p>+216 72 677 013</p>
          <p>{language === "fr" ? "Zriba Zaghouan" : "Zriba Zaghouan"}</p>
        </div>
      </div>

      {/* Bottom line */}
      <div
        style={{
          textAlign: "center",
          borderTop: "1px solid #ffffff33",
          marginTop: "2rem",
          paddingTop: "1rem",
          fontSize: "0.85rem",
          color: "#aaa",
        }}
      >
        © {new Date().getFullYear()} F3T.{" "}
        {language === "fr" ? "Tous droits réservés." : "All rights reserved."}
      </div>
    </footer>
  );
}

const footerLink = {
  color: "white",
  textDecoration: "none",
};
