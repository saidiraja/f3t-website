import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import SEO from "../components/SEO";
import { asset } from "../utils/asset";
import EditBar from "../components/EditBar";

export default function Industries() {
  const { lang } = useI18n();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const title = lang === "fr" ? "F3T | Industries desservies" : "F3T | Industries served";
  const description =
    lang === "fr"
      ? "Nous accompagnons plusieurs secteurs industriels exigeants : automobile, aéronautique, machines lourdes, fabrication d’outils."
      : "We serve demanding industries: automotive, aerospace, heavy machinery, toolmaking.";

  const industries = {
    fr: [
      {
        icon: "fas fa-car",
        title: "Automobile",
        description: "Amélioration de la résistance à l’usure et de la durabilité des composants.",
        image: asset("industry-automotive.jpg"),
      },
      {
        icon: "fas fa-rocket",
        title: "Aéronautique",
        description: "Respect des exigences de performance et de sécurité les plus strictes.",
        image: asset("industry-aerospace.jpg"),
      },
      {
        icon: "fas fa-industry",
        title: "Machines lourdes",
        description: "Traitement de grandes pièces pour une résistance maximale.",
        image: asset("industry-heavy.jpg"),
      },
      {
        icon: "fas fa-wrench",
        title: "Fabrication d’outils",
        description: "Durcissement et précision pour prolonger la durée de vie des outils.",
        image: asset("industry-tools.jpg"),
      },
    ],
    en: [
      {
        icon: "fas fa-car",
        title: "Automotive",
        description: "Enhanced wear resistance and durability of components.",
        image: asset("industry-automotive.jpg"),
      },
      {
        icon: "fas fa-rocket",
        title: "Aerospace",
        description: "Meeting the highest performance and safety standards.",
        image: asset("industry-aerospace.jpg"),
      },
      {
        icon: "fas fa-industry",
        title: "Heavy Machinery",
        description: "Treating large components for maximum strength.",
        image: asset("industry-heavy.jpg"),
      },
      {
        icon: "fas fa-wrench",
        title: "Toolmaking",
        description: "Hardening and precision to extend tool lifespan.",
        image: asset("industry-tools.jpg"),
      },
    ],
  };

  const items = industries[lang];

  return (
    <section style={{ padding: "3rem 1rem", background: "transparent" }}>
      <EditBar manageTo="/admin/industries" />
      <SEO title={title} description={description} />

      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        <h1
          data-aos="fade-up"
          style={{
            fontSize: "2.4rem",
            color: "#051d40",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          {lang === "fr" ? "Industries desservies" : "Industries We Serve"}
        </h1>

        <p
          data-aos="fade-up"
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
            color: "#666",
            fontSize: "1.05rem",
          }}
        >
          {lang === "fr"
            ? "Nous accompagnons plusieurs secteurs industriels exigeants grâce à notre expertise en traitement thermique et de surface."
            : "We support demanding industrial sectors through our advanced heat and surface treatment expertise."}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {items.map((industry, index) => (
            <div
              key={index}
              data-aos="fade-up"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "saturate(120%) blur(2px)",
                borderRadius: "12px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.06)";
              }}
            >
              <img
                src={industry.image}
                alt={industry.title}
                style={{ width: "100%", height: "170px", objectFit: "cover" }}
                loading="lazy"
              />
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <i
                  className={industry.icon}
                  style={{ fontSize: "2rem", color: "#d51820", marginBottom: "0.5rem" }}
                  aria-hidden="true"
                ></i>
                <h3 style={{ color: "#051d40", marginBottom: "0.5rem" }}>{industry.title}</h3>
                <p style={{ color: "#444", fontSize: "1rem", lineHeight: "1.5" }}>
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

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
          <h2>{lang === "fr" ? "Vous souhaitez en savoir plus ?" : "Want to learn more?"}</h2>
          <Link
            to="/services"
            style={{
              color: "#fff",
              textDecoration: "underline",
              fontWeight: "bold",
              fontSize: "1.05rem",
            }}
          >
            {lang === "fr"
              ? "Découvrez nos services adaptés à votre industrie"
              : "Explore services tailored to your industry"}
          </Link>
        </div>
      </div>
    </section>
  );
}
