import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useLanguage from "../components/useLanguage";

export default function Industries() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const industries = {
    fr: [
      {
        icon: "fas fa-car",
        title: "Automobile",
        description:
          "Amélioration de la résistance à l’usure et de la durabilité des composants.",
        image: "/industry-automotive.jpg",
      },
      {
        icon: "fas fa-rocket",
        title: "Aéronautique",
        description:
          "Respect des exigences de performance et de sécurité les plus strictes.",
        image: "/industry-aerospace.jpg",
      },
      {
        icon: "fas fa-industry",
        title: "Machines lourdes",
        description:
          "Traitement de grandes pièces pour une résistance maximale.",
        image: "/industry-heavy.jpg",
      },
      {
        icon: "fas fa-wrench",
        title: "Fabrication d’outils",
        description:
          "Durcissement et précision pour prolonger la durée de vie des outils.",
        image: "/industry-tools.jpg",
      },
    ],
    en: [
      {
        icon: "fas fa-car",
        title: "Automotive",
        description:
          "Enhanced wear resistance and durability of components.",
        image: "/industry-automotive.jpg",
      },
      {
        icon: "fas fa-rocket",
        title: "Aerospace",
        description:
          "Meeting the highest performance and safety standards.",
        image: "/industry-aerospace.jpg",
      },
      {
        icon: "fas fa-industry",
        title: "Heavy Machinery",
        description:
          "Treating large components for maximum strength.",
        image: "/industry-heavy.jpg",
      },
      {
        icon: "fas fa-wrench",
        title: "Toolmaking",
        description:
          "Hardening and precision to extend tool lifespan.",
        image: "/industry-tools.jpg",
      },
    ],
  };

  const items = industries[language];

  return (
    <section style={{ padding: "2rem", background: "#f9f9f9" }}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1
          data-aos="fade-up"
          style={{
            fontSize: "2.2rem",
            color: "#051d40",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {language === "fr" ? "Industries desservies" : "Industries We Serve"}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {items.map((industry, index) => (
            <div
              key={index}
              data-aos="fade-up"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                overflow: "hidden",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={industry.image}
                alt={industry.title}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <i
                  className={industry.icon}
                  style={{
                    fontSize: "2rem",
                    color: "#d51820",
                    marginBottom: "0.5rem",
                  }}
                ></i>
                <h3 style={{ color: "#051d40", marginBottom: "0.5rem" }}>
                  {industry.title}
                </h3>
                <p style={{ color: "#444", fontSize: "0.95rem" }}>
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
