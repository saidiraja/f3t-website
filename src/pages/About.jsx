import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useLanguage from "../components/useLanguage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const values = [
    { icon: "fas fa-check-circle", fr: "Qualité", en: "Quality" },
    { icon: "fas fa-lightbulb", fr: "Innovation", en: "Innovation" },
    { icon: "fas fa-lock", fr: "Fiabilité", en: "Reliability" },
    { icon: "fas fa-handshake", fr: "Engagement client", en: "Client Commitment" },
  ];

  const timeline = [
    { year: "1990", fr: "Création par le groupe Bodycote", en: "Founded by Bodycote group" },
    { year: "2000", fr: "Investissements majeurs en équipements", en: "Major investments in equipment" },
    { year: "2010", fr: "Croissance sur le marché national", en: "Growth in national market" },
    { year: "2020", fr: "Développement à l'international", en: "International expansion" },
  ];

  const highlights = [
    { icon: "fas fa-building", fr: "Siège à Zaghouan", en: "Headquartered in Zaghouan" },
    { icon: "fas fa-users", fr: "30+ employés qualifiés", en: "30+ qualified team members" },
    { icon: "fas fa-certificate", fr: "ISO 9001 certifiée", en: "ISO 9001 certified" },
    { icon: "fas fa-globe", fr: "Clients à l'international", en: "International clients" },
  ];

  const team = [
    { name: "Chokri Mbarek", role: "CEO" },
    { name: "Mohamed Amine Talmoudi", role: "Technical Director" },
    { name: "Souhail Labidi", role: "Sales Representative" },
    { name: "Souha Mbarek", role: "Finance & HR" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.section}
    >
      <div style={styles.container}>
        {/* Hero Image */}
        <div data-aos="fade-up" style={styles.heroImage}>
          <img src="/team.jpg" alt="Team" style={{ width: "100%", borderRadius: "12px", maxHeight: "320px", objectFit: "cover" }} />
        </div>

        {/* Intro */}
        <div data-aos="fade-up" style={styles.card}>
          <h1 style={styles.title}>{language === "fr" ? "À propos de F3T" : "About F3T"}</h1>
          <p style={styles.text}>
            {language === "fr"
              ? "Créée en 1990 par le groupe européen Bodycote, F3T est devenue une référence du traitement thermique en Tunisie."
              : "Founded in 1990 by the European Bodycote group, F3T became a reference in heat treatment in Tunisia."}
          </p>
        </div>

        {/* Highlights */}
        <div data-aos="fade-up" style={styles.gridRow}>
          {highlights.map((h, i) => (
            <div key={i} style={styles.highlightBox}>
              <i className={h.icon} style={styles.icon}></i>
              <p>{language === "fr" ? h.fr : h.en}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-bullseye"></i> {language === "fr" ? "Notre mission" : "Our Mission"}</h2>
          <p style={styles.text}>
            {language === "fr"
              ? "Offrir des solutions fiables, précises et innovantes conformes aux normes les plus strictes."
              : "To deliver reliable, precise, and innovative solutions that meet the highest standards."}
          </p>
        </div>

        {/* Vision */}
        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-eye"></i> {language === "fr" ? "Notre vision" : "Our Vision"}</h2>
          <p style={styles.text}>
            {language === "fr"
              ? "Être et rester la référence du traitement thermique en Tunisie, et développer notre présence à l’international."
              : "To remain the national leader in heat treatment and expand internationally."}
          </p>
        </div>

        {/* Values */}
        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-gem"></i> {language === "fr" ? "Nos valeurs" : "Our Values"}</h2>
          <ul style={styles.list}>
            {values.map((val, i) => (
              <li key={i}><i className={val.icon} style={styles.icon}></i>{language === "fr" ? val.fr : val.en}</li>
            ))}
          </ul>
        </div>

        {/* Quality Standards */}
        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-check-double"></i> {language === "fr" ? "Normes de qualité" : "Quality Standards"}</h2>
          <p style={styles.text}>
            {language === "fr"
              ? "Nous suivons un système qualité rigoureux conforme à la norme ISO 9001 et aux exigences spécifiques de chaque client."
              : "We follow a rigorous quality management system certified under ISO 9001 and tailored to client-specific requirements."}
          </p>
        </div>

        {/* Timeline */}
        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-history"></i> {language === "fr" ? "Historique" : "Company Timeline"}</h2>
          <ul style={styles.timeline}>
            {timeline.map((item, i) => (
              <li key={i}><strong>{item.year}</strong> – {language === "fr" ? item.fr : item.en}</li>
            ))}
          </ul>
        </div>

        {/* Team */}
        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-users"></i> {language === "fr" ? "Équipe dirigeante" : "Leadership Team"}</h2>
          <ul style={styles.list}>
            {team.map((t, i) => (
              <li key={i}><i className="fas fa-user" style={styles.icon}></i>{t.name} – {t.role}</li>
            ))}
          </ul>
        </div>

        {/* CEO Quote */}
        <div data-aos="fade-up" style={{ ...styles.card, textAlign: "center" }}>
          <img src="/ceo.jpg" alt="CEO" style={{
            width: "120px", height: "120px", borderRadius: "100%",
            objectFit: "cover", marginBottom: "1rem", border: "3px solid #d51820"
          }} />
          <h2 style={styles.subtitle}><i className="fas fa-quote-left"></i> {language === "fr" ? "Message du CEO" : "CEO Message"}</h2>
          <p style={{ ...styles.text, fontStyle: "italic" }}>
            {language === "fr"
              ? "Chez F3T, nous croyons que la qualité est une culture et non une option."
              : "At F3T, we believe quality is a culture — not a choice."}
          </p>
          <p style={{ ...styles.text, fontWeight: "bold", marginTop: "1rem" }}>— Chokri Mbarek</p>
        </div>

        {/* CTA */}
        <div data-aos="fade-up" style={styles.ctaBlock}>
          <h3>{language === "fr" ? "Envie de collaborer avec nous ?" : "Want to work with us?"}</h3>
          <Link to="/contact" style={styles.ctaLink}>
            {language === "fr" ? "Prenez contact dès aujourd’hui" : "Get in touch today"}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

const styles = {
  section: {
    background: "#f7f7f7",
    color: "#333",
    padding: "4rem 1rem",
  },
  container: {
    maxWidth: "1000px",
    margin: "auto",
  },
  heroImage: {
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
    marginBottom: "2rem",
     textAlign: "center",
  },
  title: {
    fontSize: "2.2rem",
    marginBottom: "1rem",
    color: "#111",
  },
  subtitle: {
    fontSize: "1.6rem",
    color: "#d51820",
    marginBottom: "0.8rem",
  },
  text: {
    fontSize: "1.1rem",
    color: "#444",
    lineHeight: "1.7",
  },
  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2",
    fontSize: "1.1rem",
    color: "#444",
    textAlign: "center",
  },
  icon: {
    color: "#d51820",
    marginRight: "0.6rem",
  },
  timeline: {
    listStyle: "none",
    paddingLeft: 0,
    fontSize: "1.1rem",
    color: "#444",
    textAlign: "center",
  },
  gridRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  highlightBox: {
    backgroundColor: "#fff",
    border: "1px solid #eee",
    padding: "1.5rem",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  },
  ctaBlock: {
    backgroundColor: "#d51820",
    color: "#fff",
    padding: "2rem",
    textAlign: "center",
    borderRadius: "12px",
    marginTop: "3rem",
  },
  ctaLink: {
    marginTop: "1rem",
    display: "inline-block",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    textDecoration: "underline",
  },
};
