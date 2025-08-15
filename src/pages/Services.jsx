import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useLanguage from "../components/useLanguage";

export default function Services() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = {
    fr: [
      {
        icon: "fas fa-fire",
        title: "Unité de traitement sous vide",
        description:
          "Trempe des aciers à outils, aciers rapides, aciers de construction moyennement alliés. Mise en solution des superalliages. Traitement des alliages à durcissement structural. Recuits, revenus, brasage.",
        tags: ["Haute précision", "Utilisé en aéronautique"],
      },
      {
        icon: "fas fa-temperature-high",
        title: "Unité de traitement sous atmosphère",
        description:
          "Trempe à l’huile, cémentation, carbonitruration, recuit, revenu.",
      },
      {
        icon: "fas fa-wind",
        title: "Unité de nitruration gazeuse",
        description: "Nitruration gazeuse et revenu.",
        tags: ["Durabilité accrue"],
      },
      {
        icon: "fas fa-bolt",
        title: "Unité de traitement par induction",
        description: "Trempe localisée pour travail de série.",
      },
      {
        icon: "fas fa-pump-soap",
        title: "Unité de nettoyage",
        description: "Dégraissage à l’huile et au solvant.",
      },
      {
        icon: "fas fa-flask",
        title: "Unité de zingage électrolytique alcalin",
        description:
          "Zingage finition blanc, jaune, noir avec passivation et finition finigard.",
      },
      {
        icon: "fas fa-burn",
        title: "Unité de brunissage à chaud",
        description: "Pour aciers à très faible % de Cr.",
      },
    ],
    en: [
      {
        icon: "fas fa-fire",
        title: "Vacuum Heat Treatment Unit",
        description:
          "Hardening of tool steels, high-speed steels, and medium‑alloy structural steels. Solution treatment of superalloys. Annealing, tempering, brazing.",
        tags: ["High precision", "Aerospace certified"],
      },
      {
        icon: "fas fa-temperature-high",
        title: "Atmosphere Heat Treatment Unit",
        description:
          "Oil quenching, carburizing, carbonitriding, annealing, tempering.",
      },
      {
        icon: "fas fa-wind",
        title: "Gas Nitriding Unit",
        description: "Gas nitriding and tempering.",
        tags: ["Extended durability"],
      },
      {
        icon: "fas fa-bolt",
        title: "Induction Heat Treatment Unit",
        description: "Localized hardening for series production.",
      },
      {
        icon: "fas fa-pump-soap",
        title: "Cleaning Unit",
        description: "Oil and solvent degreasing.",
      },
      {
        icon: "fas fa-flask",
        title: "Alkaline Electrolytic Zinc Plating Unit",
        description:
          "Zinc plating with white, yellow, and black finish, with passivation and Finigard finish.",
      },
      {
        icon: "fas fa-burn",
        title: "Hot Bluing Unit",
        description: "For steels with very low % Cr.",
      },
    ],
  };

  const currentServices = services[language];

  return (
    <section style={{ padding: "2rem", backgroundColor: "#f7f7f7" }}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>

        {/* Header image */}
        <div data-aos="fade-up" style={{ marginBottom: "2rem" }}>
          <img
            src="/factory.jpg"
            alt="Service factory"
            style={{
              width: "100%",
              borderRadius: "12px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Title */}
        <h1
          data-aos="fade-up"
          style={{
            fontSize: "2.2rem",
            color: "#051d40",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {language === "fr" ? "Nos Services" : "Our Services"}
        </h1>

        {/* Section intro */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#d51820", marginBottom: "1rem" }}>
            {language === "fr"
              ? "Technologie & Excellence"
              : "Technology & Excellence"}
          </h2>
          <p
            style={{
              color: "#444",
              maxWidth: "750px",
              margin: "auto",
              fontSize: "1rem",
            }}
          >
            {language === "fr"
              ? "Nos unités de traitement thermique et de surface sont conçues pour répondre aux exigences les plus strictes des industries modernes."
              : "Our heat and surface treatment units are designed to meet the most demanding industrial standards."}
          </p>
        </div>

        {/* Service grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {currentServices.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease",
                textAlign: "center",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <i
                className={`${service.icon} service-icon`}
                style={{
                  fontSize: "2rem",
                  color: "#d51820",
                  marginBottom: "0.8rem",
                  transition: "transform 0.3s ease",
                }}
              ></i>
              <h3 style={{ color: "#051d40", marginBottom: "0.5rem" }}>
                {service.title}
              </h3>
              <p
                style={{
                  color: "#444",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                }}
              >
                {service.description}
              </p>

              {/* Feature tags */}
              {service.tags && (
                <div style={{ marginTop: "1rem" }}>
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#d51820",
                        color: "white",
                        padding: "0.3rem 0.7rem",
                        fontSize: "0.75rem",
                        borderRadius: "20px",
                        marginRight: "0.5rem",
                        marginTop: "0.3rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
