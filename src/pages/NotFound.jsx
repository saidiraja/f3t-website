// src/pages/NotFound.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";

export default function NotFound() {
  const { lang } = useI18n();

  useEffect(() => {
    // Set page title
    document.title = lang === "fr" ? "Page introuvable – F3T" : "Page not found – F3T";

    // Add/Update a temporary robots noindex for this page
    let robots = document.querySelector('meta[name="robots"]');
    const previous = robots ? robots.getAttribute("content") : null;

    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");

    // Cleanup: restore previous robots when navigating away
    return () => {
      if (previous) {
        robots.setAttribute("content", previous);
      } else {
        robots.parentNode?.removeChild(robots);
      }
    };
  }, [lang]);

  const heading = lang === "fr" ? "404 – Page introuvable" : "404 – Page not found";
  const text =
    lang === "fr"
      ? "Désolé, la page que vous recherchez n’existe pas ou a été déplacée."
      : "Sorry, the page you’re looking for doesn’t exist or has been moved.";
  const backHome = lang === "fr" ? "Retour à l’accueil" : "Back to Home";
  const browseServices = lang === "fr" ? "Voir nos services" : "Browse Services";

  return (
    <section style={styles.section} aria-labelledby="nf-title">
      <div style={styles.card}>
        <div style={styles.badge} aria-hidden="true">404</div>
        <h1 id="nf-title" style={styles.title}>{heading}</h1>
        <p style={styles.text}>{text}</p>
        <div style={styles.actions}>
          <Link to="/" style={{ ...styles.btn, ...styles.primary }}>{backHome}</Link>
          <Link to="/services" style={{ ...styles.btn, ...styles.ghost }}>
            {browseServices}
          </Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "60vh",
    display: "grid",
    placeItems: "center",
    padding: "3rem 1rem",
    background: "#f7f7f7",
  },
  card: {
    width: "100%",
    maxWidth: "720px",
    background: "#fff",
    borderRadius: "14px",
    padding: "2.25rem",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
  },
  badge: {
    display: "inline-block",
    background: "#d51820",
    color: "#fff",
    fontWeight: 800,
    borderRadius: "9999px",
    padding: "0.35rem 0.9rem",
    marginBottom: "0.75rem",
    letterSpacing: "0.08em",
  },
  title: {
    fontSize: "1.9rem",
    color: "#051d40",
    marginBottom: "0.5rem",
  },
  text: {
    color: "#475569",
    marginBottom: "1.5rem",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  btn: {
    display: "inline-block",
    padding: "0.7rem 1.1rem",
    borderRadius: "10px",
    fontWeight: 600,
    textDecoration: "none",
    border: "1px solid transparent",
  },
  primary: {
    background: "#d51820",
    color: "#fff",
    borderColor: "#d51820",
  },
  ghost: {
    background: "#fff",
    color: "#051d40",
    borderColor: "#cbd5e1",
  },
};
