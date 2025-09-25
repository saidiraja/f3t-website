import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import SEO from "../components/SEO";
import { api } from "../api";
import { pickLang } from "../utils/lang";
import EditBar from "../components/EditBar";
import { asset } from "../utils/asset";

export default function About() {
  const { lang } = useI18n();
  const [about, setAbout] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    api.getAbout().then(setAbout).catch(e => setErr(e.message));
  }, []);

  const title = lang === "fr" ? "À propos de F3T – Traitement thermique & surface" : "About F3T – Heat & Surface Treatment";
  const description = lang === "fr"
    ? "F3T, fondée en 1990, est la référence en Tunisie pour le traitement thermique et de surface."
    : "Founded in 1990, F3T is Tunisia’s reference for heat & surface treatment.";

  const rawValues = about ? pickLang(lang, about.values_fr, about.values_en) : "";
  const values = rawValues
    ? rawValues.split(/\r?\n|,|;|•/).map(s => s.trim()).filter(Boolean)
    : (lang === "fr"
        ? ["Qualité","Innovation","Fiabilité","Engagement client"]
        : ["Quality","Innovation","Reliability","Client Commitment"]);

  const mission = about
    ? pickLang(lang, about.mission_fr, about.mission_en)
    : (lang === "fr"
        ? "Offrir des solutions fiables, précises et innovantes conformes aux normes les plus strictes."
        : "To deliver reliable, precise, and innovative solutions that meet the highest standards.");

  const vision = about
    ? pickLang(lang, about.vision_fr, about.vision_en)
    : (lang === "fr"
        ? "Être et rester la référence du traitement thermique en Tunisie, et développer notre présence à l’international."
        : "To remain the national leader in heat treatment and expand internationally.");

  const highlights = [
    { icon: "fas fa-building", fr: "Siège à Zaghouan", en: "Headquartered in Zaghouan" },
    { icon: "fas fa-users", fr: "30+ employés qualifiés", en: "30+ qualified team members" },
    { icon: "fas fa-certificate", fr: "ISO 9001 certifiée", en: "ISO 9001 certified" },
    { icon: "fas fa-globe", fr: "Clients à l'international", en: "International clients" },
  ];

  return (
    <motion.section initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration: .5 }} style={styles.section}>
      <EditBar manageTo="/admin/about" />
      <SEO title={title} description={description} />

      <div style={styles.container}>
        {err && <p style={{color:'crimson'}}>{err}</p>}

        <div data-aos="fade-up" style={styles.heroImage}>
          <img src={asset("team.jpg")} alt={lang === "fr" ? "Équipe F3T" : "F3T team"} style={{ width:"100%", borderRadius:12, maxHeight:320, objectFit:"cover" }} loading="lazy" />
        </div>

        <div data-aos="fade-up" style={styles.card}>
          <h1 style={styles.title}>{lang === "fr" ? "À propos de F3T" : "About F3T"}</h1>
          <p style={styles.text}>{lang === "fr"
            ? "Créée en 1990 par le groupe européen Bodycote, F3T est devenue une référence du traitement thermique en Tunisie."
            : "Founded in 1990 by the European Bodycote group, F3T became a reference in heat treatment in Tunisia."}
          </p>
        </div>

        <div data-aos="fade-up" style={styles.gridRow}>
          {highlights.map((h, i) => (
            <div key={i} style={styles.highlightBox}>
              <i className={h.icon} style={styles.icon}></i>
              <p>{lang === "fr" ? h.fr : h.en}</p>
            </div>
          ))}
        </div>

        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-bullseye"></i> {lang === "fr" ? "Notre mission" : "Our Mission"}</h2>
          <p style={styles.text}>{mission}</p>
        </div>

        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-eye"></i> {lang === "fr" ? "Notre vision" : "Our Vision"}</h2>
          <p style={styles.text}>{vision}</p>
        </div>

        <div data-aos="fade-up" style={styles.card}>
          <h2 style={styles.subtitle}><i className="fas fa-gem"></i> {lang === "fr" ? "Nos valeurs" : "Our Values"}</h2>
          <ul style={styles.list}>
            {values.map((v, i) => (
              <li key={i}><i className="fas fa-check-circle" style={styles.icon}></i>{v}</li>
            ))}
          </ul>
        </div>

        <div data-aos="fade-up" style={styles.ctaBlock}>
          <h3>{lang === "fr" ? "Envie de collaborer avec nous ?" : "Want to work with us?"}</h3>
          <Link to="/contact" style={styles.ctaLink}>
            {lang === "fr" ? "Prenez contact dès aujourd’hui" : "Get in touch today"}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

const styles = {
  section:{background:"transparent",color:"#333",padding:"4rem 1rem"},
  container:{maxWidth:"1000px",margin:"auto"},
  heroImage:{marginBottom:"2rem"},
  card:{backgroundColor:"rgba(255,255,255,0.85)",backdropFilter:"saturate(120%) blur(2px)",padding:"2rem",borderRadius:"12px",boxShadow:"0 2px 14px rgba(0,0,0,0.06)",marginBottom:"2rem",textAlign:"center"},
  title:{fontSize:"2.2rem",marginBottom:"1rem",color:"#111"},
  subtitle:{fontSize:"1.6rem",color:"#d51820",marginBottom:"0.8rem"},
  text:{fontSize:"1.1rem",color:"#444",lineHeight:"1.7"},
  list:{listStyle:"none",padding:0,lineHeight:"2",fontSize:"1.1rem",color:"#444",textAlign:"center"},
  icon:{color:"#d51820",marginRight:"0.6rem"},
  gridRow:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1.5rem",marginBottom:"2rem"},
  highlightBox:{backgroundColor:"rgba(255,255,255,0.85)",backdropFilter:"saturate(120%) blur(2px)",border:"1px solid #eee",padding:"1.5rem",borderRadius:"10px",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.03)"},
  ctaBlock:{backgroundColor:"#d51820",color:"#fff",padding:"2rem",textAlign:"center",borderRadius:"12px",marginTop:"3rem"},
  ctaLink:{marginTop:"1rem",display:"inline-block",color:"#fff",fontWeight:"bold",fontSize:"1.1rem",textDecoration:"underline"}
};
