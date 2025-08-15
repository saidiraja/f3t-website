import useLanguage from "../components/useLanguage";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: `url('/bg-metal.jpg') center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        padding: "4rem 2rem",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Main content */}
      <div style={{ maxWidth: "900px", zIndex: 2 }} data-aos="fade-up">
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            fontWeight: "bold",
            lineHeight: "1.3",
          }}
        >
          {language === "fr"
            ? "F3T – Excellence dans le traitement thermique et de surface"
            : "F3T – Excellence in Heat and Surface Treatment"}
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "auto",
            color: "#ddd",
          }}
        >
          {language === "fr"
            ? "Depuis 1990, nous accompagnons l’industrie tunisienne et internationale avec des solutions de traitement thermique et de surface à haute valeur ajoutée."
            : "Since 1990, we’ve been delivering high-value heat and surface treatment solutions to the Tunisian and international industry."}
        </p>

        <a href="/services">
          <button
            style={{
              marginTop: "2.5rem",
              padding: "0.9rem 2.2rem",
              backgroundColor: "#d51820",
              color: "white",
              border: "none",
              borderRadius: "30px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            {language === "fr" ? "Découvrir nos services" : "Explore Our Services"}
          </button>
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <i
          className="fas fa-angle-down"
          style={{
            fontSize: "1.8rem",
            color: "#fff",
            animation: "bounce 2s infinite",
          }}
        ></i>
      </div>

      {/* Smooth scroll animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
        `}
      </style>
    </section>
  );
}
