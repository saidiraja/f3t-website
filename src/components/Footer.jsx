// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import { asset } from "../utils/asset";

export default function Footer() {
  const { lang } = useI18n();

  const t = {
    tagline:
      lang === "fr"
        ? "Leader tunisien du traitement thermique et de surface depuis 1990."
        : "Tunisia’s leader in heat and surface treatment since 1990.",
    links: lang === "fr" ? "Liens utiles" : "Quick Links",
    contact: lang === "fr" ? "Contact" : "Contact",
    rights: lang === "fr" ? "Tous droits réservés." : "All rights reserved.",
    nav: {
      home: lang === "fr" ? "Accueil" : "Home",
      about: lang === "fr" ? "À propos" : "About",
      services: lang === "fr" ? "Services" : "Services",
      industries: lang === "fr" ? "Industries" : "Industries",
      certifications: lang === "fr" ? "Certifications" : "Certifications",
      clients: lang === "fr" ? "Clients" : "Clients",
      contact: lang === "fr" ? "Contact" : "Contact",
    },
  };

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
            src={asset("Nlogo.png")}
            alt="F3T logo"
            style={{ height: "70px", marginBottom: "1rem" }}
          />
          <p style={{ lineHeight: "1.6" }}>{t.tagline}</p>
        </div>

        {/* Column 2 */}
        <div style={{ flex: "1 1 150px" }}>
          <h4 style={{ marginBottom: "1rem" }}>{t.links}</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li><Link to="/" style={footerLink}>{t.nav.home}</Link></li>
            <li><Link to="/about" style={footerLink}>{t.nav.about}</Link></li>
            <li><Link to="/services" style={footerLink}>{t.nav.services}</Link></li>
            <li><Link to="/industries" style={footerLink}>{t.nav.industries}</Link></li>
            <li><Link to="/certifications" style={footerLink}>{t.nav.certifications}</Link></li>
            <li><Link to="/clients" style={footerLink}>{t.nav.clients}</Link></li>
            <li><Link to="/contact" style={footerLink}>{t.nav.contact}</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ marginBottom: "1rem" }}>{t.contact}</h4>
          <p>
            Email:{" "}
            <a href="mailto:f3t_direction@topnet.tn" style={{ color: "#fff" }}>
              f3t_direction@topnet.tn
            </a>
          </p>
          <p>
            <a href="tel:+21672677013" style={{ color: "#fff" }}>
              +216 72 677 013
            </a>
          </p>
          <p>Zriba Zaghouan</p>
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
        © {new Date().getFullYear()} F3T. {t.rights}
      </div>
    </footer>
  );
}

const footerLink = {
  color: "white",
  textDecoration: "none",
};
