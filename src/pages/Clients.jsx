import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useLanguage from "../components/useLanguage";

export default function Clients() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const clients = [
    {
      name: "SIM Ben Arous",
      logo: "/logos/sim.png",
      description: {
        en: "Leader in automotive and mechanical components manufacturing in Tunisia.",
        fr: "Leader dans la fabrication de composants automobiles et mécaniques en Tunisie.",
      },
    },
    {
      name: "SOPEM",
      logo: "/logos/sopem.png",
      description: {
        en: "Part of the SOMFY group, SOPEM manufactures high-precision motors and automation systems.",
        fr: "Filiale du groupe SOMFY, SOPEM fabrique des moteurs de précision et systèmes d'automatisation.",
      },
    },
    {
      name: "Defontaine",
      logo: "/logos/defontaine.png",
      description: {
        en: "A French industrial group specializing in forged rings and mechanical assemblies, serving aerospace and energy sectors.",
        fr: "Groupe industriel français spécialisé dans les couronnes forgées pour l'aéronautique et l’énergie.",
      },
    },
    {
      name: "Decotools",
      logo: "/logos/decotools.png",
      description: {
        en: "Decotools designs and manufactures high-performance cutting tools for the automotive and industrial markets.",
        fr: "Decotools conçoit et fabrique des outils de coupe pour les secteurs automobile et industriel.",
      },
    },
    {
      name: "MISFAT",
      logo: "/logos/misfat.png",
      description: {
        en: "MISFAT is a Tunisian leader in automotive filtration, exporting to over 50 countries.",
        fr: "MISFAT est un leader tunisien des systèmes de filtration automobile, exportant dans plus de 50 pays.",
      },
    },
  ];

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
          {language === "fr" ? "Nos Clients" : "Our Clients"}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {clients.map((client, index) => (
            <div
              key={index}
              data-aos="fade-up"
              style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={client.logo}
                alt={client.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  marginBottom: "1rem",
                }}
              />
              <h3 style={{ color: "#d51820", marginBottom: "0.5rem" }}>
                {client.name}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#444" }}>
                {language === "fr"
                  ? client.description.fr
                  : client.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
