// src/pages/Services.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useI18n } from "../i18n/useI18n";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import EditBar from "../components/EditBar";
import { asset } from "../utils/asset";

export default function Services() {
  const { lang } = useI18n();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const title = lang === "fr" ? "F3T | Nos services" : "F3T | Our services";
  const description =
    lang === "fr"
      ? "Découvrez nos unités de traitement thermique et de surface : trempe sous vide, atmosphère, nitruration gazeuse, induction, nettoyage, zingage, brunissage."
      : "Explore our heat & surface treatment units: vacuum, atmosphere, gas nitriding, induction, cleaning, zinc plating, hot bluing.";

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
          "Hardening of tool steels, high-speed steels, and medium-alloy structural steels. Solution treatment of superalloys. Annealing, tempering, brazing.",
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

  const currentServices = services[lang];

  return (
    <section style={{ padding: "3rem 1rem", backgroundColor:  "transparent" }}>
      <EditBar manageTo="/admin/services" />
      <SEO title={title} description={description} />

      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        {/* Header image */}
        <div data-aos="fade-up" style={{ marginBottom: "2rem" }}>
          <img
            src={asset("factory.jpg")}
            alt={lang === "fr" ? "Atelier de traitement thermique" : "Heat treatment factory"}
            style={{
              width: "100%",
              borderRadius: "12px",
              maxHeight: "300px",
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h1
          data-aos="fade-up"
          style={{
            fontSize: "2.5rem",
            color: "#051d40",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {lang === "fr" ? "Nos Services" : "Our Services"}
        </h1>

        {/* Intro */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "saturate(120%) blur(2px)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#d51820", marginBottom: "1rem" }}>
            {lang === "fr" ? "Technologie & Excellence" : "Technology & Excellence"}
          </h2>
          <p
            style={{
              color: "#444",
              maxWidth: "750px",
              margin: "auto",
              fontSize: "1.1rem",
              lineHeight: "1.7",
            }}
          >
            {lang === "fr"
              ? "Nos unités de traitement thermique et de surface sont conçues pour répondre aux exigences les plus strictes des industries modernes."
              : "Our heat and surface treatment units are designed to meet the most demanding industrial standards."}
          </p>
        </div>

        {/* Service Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {currentServices.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "saturate(120%) blur(2px)",
                padding: "2rem",
                borderRadius: "16px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease",
                textAlign: "center",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <i
                className={service.icon}
                style={{
                  fontSize: "2.4rem",
                  color: "#d51820",
                  marginBottom: "0.8rem",
                }}
                aria-hidden="true"
              ></i>
              <h3 style={{ color: "#051d40", marginBottom: "0.6rem", fontSize: "1.3rem" }}>
                {service.title}
              </h3>
              <p style={{ color: "#444", fontSize: "1rem", lineHeight: "1.6" }}>
                {service.description}
              </p>

              {/* Tags */}
              {service.tags && (
                <div style={{ marginTop: "1rem" }}>
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#d51820",
                        color: "white",
                        padding: "0.4rem 0.8rem",
                        fontSize: "0.8rem",
                        borderRadius: "20px",
                        marginRight: "0.5rem",
                        marginTop: "0.3rem",
                      }}
                    >
                      <i className="fas fa-check" style={{ marginRight: "5px" }} aria-hidden="true"></i>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          data-aos="fade-up"
          style={{
            marginTop: "4rem",
            backgroundColor: "#d51820",
            padding: "2rem",
            textAlign: "center",
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          <h2>{lang === "fr" ? "Besoin d'un service sur mesure ?" : "Need a custom service?"}</h2>
          <Link
            to="/contact"
            style={{ color: "#fff", textDecoration: "underline", fontWeight: "bold" }}
          >
            {lang === "fr"
              ? "Contactez notre équipe dès aujourd'hui"
              : "Reach out to our team today"}
          </Link>
        </div>
      </div>
    </section>
  );
}
