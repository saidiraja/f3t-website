import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useLanguage from "../components/useLanguage";

export default function Certifications() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section style={{ padding: "2rem", background: "#f9f9f9" }}>
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
          {language === "fr" ? "Certifications" : "Certifications"}
        </h1>

        {/* ISO 9001 */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "#ffffff",
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
          ></i>
          <div>
            <h3 style={{ color: "#051d40", marginBottom: "0.5rem" }}>
              ISO 9001:2015
            </h3>
            <p style={{ color: "#444" }}>
              {language === "fr"
                ? "F3T est certifiée ISO 9001:2015 pour la qualité de ses services en traitement thermique et de surface."
                : "F3T is ISO 9001:2015 certified for the quality of its heat and surface treatment services."}
            </p>
          </div>
        </div>

        {/* Placeholder for more */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            textAlign: "center",
          }}
        >
          <i
            className="fas fa-clock"
            style={{ fontSize: "2.5rem", color: "#ccc", marginBottom: "1rem" }}
          ></i>
          <p style={{ color: "#777", fontStyle: "italic" }}>
            {language === "fr"
              ? "D'autres certifications sont en cours d'acquisition."
              : "Other certifications are currently in progress."}
          </p>
        </div>
      </div>
    </section>
  );
}
