// src/pages/Home.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import SEO from "../components/SEO";
import EditBar from "../components/EditBar";
import { asset } from "../utils/asset";

export default function Home() {
  const { lang } = useI18n();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const title =
    lang === "fr"
      ? "F3T – Excellence dans le traitement thermique et de surface"
      : "F3T – Excellence in Heat and Surface Treatment";
  const description =
    lang === "fr"
      ? "Depuis 1990, F3T accompagne l’industrie avec des solutions de traitement thermique et de surface à haute valeur ajoutée."
      : "Since 1990, F3T has delivered high-value heat and surface treatment solutions to industry.";

  const stats = [
    { number: "30+", label: lang === "fr" ? "Années d'expérience" : "Years of Experience" },
    { number: "100+", label: lang === "fr" ? "Clients satisfaits" : "Happy Clients" },
    { number: "200K+", label: lang === "fr" ? "Pièces traitées/an" : "Parts Treated/Year" },
    { number: "4", label: lang === "fr" ? "Industries servies" : "Industries Served" }
  ];

  const industries = [
    { icon: "fas fa-car", fr: "Automobile", en: "Automotive" },
    { icon: "fas fa-plane", fr: "Aéronautique", en: "Aerospace" },
    { icon: "fas fa-industry", fr: "Machines lourdes", en: "Heavy Machinery" },
    { icon: "fas fa-tools", fr: "Fabrication d’outils", en: "Toolmaking" }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={styles.section}
    >
      <EditBar manageTo="/admin/home" />
      <SEO title={title} description={description} />

      {/* Background Overlay */}
      <div style={styles.overlay} aria-hidden="true"></div>

      {/* HERO */}
      <div style={styles.heroContainer} data-aos="fade-up">
        <h1 style={styles.title}>
          {lang === "fr"
            ? "F3T – Excellence dans le traitement thermique et de surface"
            : "F3T – Excellence in Heat and Surface Treatment"}
        </h1>

        <p style={styles.description}>
          {lang === "fr"
            ? "Depuis 1990, nous accompagnons l’industrie tunisienne et internationale avec des solutions de traitement thermique et de surface à haute valeur ajoutée."
            : "Since 1990, we’ve been delivering high-value heat and surface treatment solutions to the Tunisian and international industry."}
        </p>

        <Link to="/services">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={styles.button}
            aria-label={lang === "fr" ? "Découvrir nos services" : "Explore our services"}
          >
            {lang === "fr" ? "Découvrir nos services" : "Explore Our Services"}
          </motion.button>
        </Link>
      </div>

      {/* SCROLL INDICATOR */}
      <div style={styles.scrollIndicator} aria-hidden="true">
        <i className="fas fa-angle-down" style={styles.scrollIcon}></i>
      </div>

      {/* STATS */}
      <div style={styles.statsWrapper}>
        {stats.map((item, i) => (
          <div key={i} data-aos="zoom-in" style={styles.statBox}>
            <h3 style={styles.statNumber}>{item.number}</h3>
            <p style={styles.statLabel}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* INDUSTRIES */}
      <div style={styles.industryWrapper}>
        <h2 style={styles.subtitle}>{lang === "fr" ? "Secteurs d’activité" : "Industries We Serve"}</h2>
        <div style={styles.industryGrid}>
          {industries.map((item, i) => (
            <div key={i} style={styles.industryCard} data-aos="fade-up">
              <i className={item.icon} style={styles.industryIcon} aria-hidden="true"></i>
              <p style={{ color: "#f1f1f1", marginTop: "0.5rem" }}>
                {lang === "fr" ? item.fr : item.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div style={styles.featuresSection}>
        <h2 style={styles.subtitle}>{lang === "fr" ? "Pourquoi F3T ?" : "Why Choose F3T?"}</h2>
        <ul style={styles.featuresList}>
          <li>
            <i className="fas fa-check-circle" style={styles.icon} aria-hidden="true"></i>{" "}
            {lang === "fr" ? "Équipements de pointe" : "Cutting-edge equipment"}
          </li>
          <li>
            <i className="fas fa-check-circle" style={styles.icon} aria-hidden="true"></i>{" "}
            {lang === "fr" ? "Équipe expérimentée" : "Experienced team"}
          </li>
          <li>
            <i className="fas fa-check-circle" style={styles.icon} aria-hidden="true"></i>{" "}
            {lang === "fr" ? "Normes strictes de qualité" : "Strict quality standards"}
          </li>
          <li>
            <i className="fas fa-check-circle" style={styles.icon} aria-hidden="true"></i>{" "}
            {lang === "fr" ? "Engagement client" : "Client-focused approach"}
          </li>
        </ul>
      </div>

      {/* CONTACT BAR */}
      <div style={styles.ctaBar}>
        <h3 style={styles.ctaTitle}>
          {lang === "fr" ? "Prêt à collaborer avec nous ?" : "Ready to work with us?"}
        </h3>
        <Link to="/contact" style={styles.ctaLink}>
          {lang === "fr" ? "Contactez-nous dès maintenant" : "Contact us now"}
        </Link>
      </div>

      {/* Bounce animation CSS */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
        `}
      </style>
    </motion.section>
  );
}

// STYLES (only change: use asset() for the background url)
const styles = {
  section: {
    background: `url('${asset("bg-metal.jpg")}') center/cover no-repeat`,
    color: "#fff",
    paddingBottom: "6rem",
    position: "relative",
    overflowX: "hidden"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 0
  },
  heroContainer: {
    paddingTop: "6rem",
    maxWidth: "900px",
    margin: "auto",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
    padding: "2rem"
  },
  title: {
    fontSize: "3.2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    lineHeight: "1.3",
    color: "#ffffff"
  },
  description: {
    fontSize: "1.25rem",
    color: "#f1f1f1",
    maxWidth: "700px",
    margin: "auto"
  },
  button: {
    marginTop: "2rem",
    padding: "0.9rem 2.2rem",
    backgroundColor: "#d51820",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2
  },
  scrollIcon: {
    fontSize: "1.8rem",
    color: "#fff",
    animation: "bounce 2s infinite"
  },
  statsWrapper: {
    marginTop: "6rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "2rem",
    maxWidth: "1000px",
    marginInline: "auto",
    textAlign: "center",
    zIndex: 2,
    position: "relative"
  },
  statBox: {
    background: "rgba(255,255,255,0.08)",
    padding: "2rem",
    borderRadius: "12px",
    backdropFilter: "blur(3px)",
    border: "1px solid rgba(255,255,255,0.2)"
  },
  statNumber: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    color: "#ffffff"
  },
  statLabel: {
    color: "#eaeaea",
    marginTop: "0.5rem"
  },
  industryWrapper: {
    marginTop: "5rem",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "1.8rem",
    marginBottom: "2rem",
    fontWeight: "bold"
  },
  industryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "2rem",
    maxWidth: "800px",
    margin: "auto"
  },
  industryCard: {
    background: "rgba(255,255,255,0.08)",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)"
  },
  industryIcon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
    color: "#d51820"
  },
  featuresSection: {
    marginTop: "5rem",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: "2rem",
    borderRadius: "12px",
    maxWidth: "800px",
    marginInline: "auto",
    backdropFilter: "blur(3px)"
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    color: "#fff",
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "auto",
    lineHeight: "2"
  },
  ctaBar: {
    marginTop: "5rem",
    backgroundColor: "#d51820",
    padding: "2.5rem",
    textAlign: "center",
    borderRadius: "12px",
    maxWidth: "800px",
    marginInline: "auto"
  },
  ctaTitle: {
    color: "#fff",
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "0.5rem"
  },
  ctaLink: {
    color: "#fff",
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: "1.1rem"
  }
};
