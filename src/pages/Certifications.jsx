// src/pages/Certifications.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useI18n } from "../i18n/useI18n";
import SEO from "../components/SEO";
import EditBar from "../components/EditBar";

export default function Certifications() {
  const { lang } = useI18n();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const title = lang === "fr" ? "F3T | Certifications" : "F3T | Certifications";
  const description =
    lang === "fr"
      ? "F3T est certifiée ISO 9001:2015 pour la qualité de ses services en traitement thermique et de surface. D’autres certifications sont en cours."
      : "F3T is ISO 9001:2015 certified for the quality of its heat and surface treatment services. Additional certifications are in progress.";

  return (
    <section style={{ padding: "2rem", background:  "transparent" }}>
      <EditBar manageTo="/admin/certifications" />
      <SEO title={title} description={description} />

      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h1
          data-aos="fade-up"
          style={{
            fontSize: "2.2rem",
            color: "#051d40",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {lang === "fr" ? "Certifications" : "Certifications"}
        </h1>

        {/* ISO 9001 */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "saturate(120%) blur(2px)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <i
            className="fas fa-certificate"
            style={{ fontSize: "2.5rem", color: "#d51820" }}
            aria-hidden="true"
          ></i>
          <div>
            <h3 style={{ color: "#051d40", marginBottom: "0.5rem" }}>
              ISO 9001:2015
            </h3>
            <p style={{ color: "#444", marginBottom: "0.75rem" }}>
              {lang === "fr"
                ? "F3T est certifiée ISO 9001:2015 pour la qualité de ses services en traitement thermique et de surface."
                : "F3T is ISO 9001:2015 certified for the quality of its heat and surface treatment services."}
            </p>
            {/* Optional assets for later */}
            {/* <img src={asset("iso-9001-badge.png")} alt="ISO 9001:2015 badge" style={{ height: 48 }} loading="lazy" /> */}
            {/* <a href={asset("certificates/iso9001.pdf")} target="_blank" rel="noopener noreferrer">
                {lang==="fr" ? "Voir le certificat" : "View certificate"}
              </a> */}
          </div>
        </div>

        {/* Placeholder for more */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "saturate(120%) blur(2px)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            textAlign: "center",
          }}
        >
          <i
            className="fas fa-clock"
            style={{ fontSize: "2.5rem", color: "#ccc", marginBottom: "1rem" }}
            aria-hidden="true"
          ></i>
          <p style={{ color: "#777", fontStyle: "italic" }}>
            {lang === "fr"
              ? "D'autres certifications sont en cours d'acquisition."
              : "Other certifications are currently in progress."}
          </p>
        </div>
      </div>
    </section>
  );
}
