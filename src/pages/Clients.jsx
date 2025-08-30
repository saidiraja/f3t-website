// src/pages/Clients.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useI18n } from "../i18n/useI18n";
import SEO from "../components/SEO";

export default function Clients() {
  const { lang } = useI18n();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const title = lang === "fr" ? "F3T | Nos clients" : "F3T | Our clients";
  const description =
    lang === "fr"
      ? "Quelques partenaires de confiance : SIM Ben Arous, SOPEM, Defontaine, Decotools, MISFAT."
      : "A few trusted partners: SIM Ben Arous, SOPEM, Defontaine, Decotools, MISFAT.";

  const heading = lang === "fr" ? "Nos Clients" : "Our Clients";
  const sub =
    lang === "fr"
      ? "Quelques partenaires de confiance dans l’automobile, l’aéronautique et l’industrie."
      : "A few trusted partners in automotive, aerospace and industry.";

  // Keep these logo files in /public/logos with these exact names
  const logos = [
    { src: "/logos/sim.jpg", alt: "SIM Ben Arous logo" },
    { src: "/logos/sopem.jpg", alt: "SOPEM logo" },
    { src: "/logos/defontaine.png", alt: "Defontaine logo" },
    { src: "/logos/decotools.jpg", alt: "Decotools logo" },
    { src: "/logos/misfat.png", alt: "MISFAT logo" }
  ];

  const clients = [
    {
      name: "SIM Ben Arous",
      logo: "/logos/sim.jpg",
      description: {
        en: "Leader in automotive and mechanical components manufacturing in Tunisia.",
        fr: "Leader dans la fabrication de composants automobiles et mécaniques en Tunisie."
      }
    },
    {
      name: "SOPEM",
      logo: "/logos/sopem.jpg",
      description: {
        en: "Part of the SOMFY group, SOPEM manufactures high-precision motors and automation systems.",
        fr: "Filiale du groupe SOMFY, SOPEM fabrique des moteurs de précision et des systèmes d’automatisation."
      }
    },
    {
      name: "Defontaine",
      logo: "/logos/defontaine.png",
      description: {
        en: "French industrial group specializing in forged rings and mechanical assemblies for aerospace and energy.",
        fr: "Groupe industriel français spécialisé dans les couronnes forgées et ensembles mécaniques pour l’aéronautique et l’énergie."
      }
    },
    {
      name: "Decotools",
      logo: "/logos/decotools.jpg",
      description: {
        en: "Designs and manufactures high-performance cutting tools for automotive and industrial markets.",
        fr: "Conçoit et fabrique des outils de coupe haute performance pour les secteurs automobile et industriel."
      }
    },
    {
      name: "MISFAT",
      logo: "/logos/misfat.png",
      description: {
        en: "Tunisian leader in automotive filtration, exporting to 50+ countries.",
        fr: "Leader tunisien de la filtration automobile, exportant vers plus de 50 pays."
      }
    }
  ];

  return (
    <section style={{ padding: "2rem", background:  "transparent" }}>
      <SEO title={title} description={description} />

      <style>{`
        /* Pure-CSS infinite logo carousel */
        .logo-belt { position: relative; overflow: hidden; }
        .logo-track {
          display: flex; align-items: center; gap: 3rem;
          width: max-content; animation: scroll-x 18s linear infinite;
          will-change: transform;
        }
        @keyframes scroll-x { 0% {transform: translateX(0);} 100% {transform: translateX(-50%);} }
        .logo-img {
          height: 56px; width: auto; object-fit: contain;
          filter: grayscale(0.1) contrast(1.05);
          transition: transform .2s ease, filter .2s ease;
        }
        .logo-img:hover { transform: scale(1.06); filter: none; }
        @media (max-width: 640px){ .logo-img { height: 44px; } }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <header data-aos="fade-up" style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <h1 style={{ fontSize: "2.2rem", color: "#051d40", marginBottom: "0.5rem" }}>{heading}</h1>
          <p style={{ color: "#475569" }}>{sub}</p>
        </header>

        {/* Logos carousel */}
        <div
          className="logo-belt"
          data-aos="fade-up"
          style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,.06)", padding: "1.25rem", marginBottom: "2rem" }}
        >
          <div className="logo-track" aria-label={lang === "fr" ? "Logos des clients" : "Client logos"}>
            {/* duplicate for seamless loop */}
            {[...logos, ...logos].map((l, i) => (
              <img key={i} src={l.src} alt={l.alt} className="logo-img" loading="lazy" />
            ))}
          </div>
        </div>

        {/* Detailed cards */}
        <div
          data-aos="fade-up"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem" }}
        >
          {clients.map((client, idx) => (
            <article
              key={idx}
              style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "saturate(120%) blur(2px)",
                padding: "1.25rem",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                textAlign: "center",
                transition: "transform 0.3s ease"
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                style={{ width: 80, height: 80, objectFit: "contain", marginBottom: "0.75rem" }}
                loading="lazy"
              />
              <h3 style={{ color: "#d51820", marginBottom: "0.4rem", fontSize: "1.05rem" }}>{client.name}</h3>
              <p style={{ fontSize: ".95rem", color: "#444" }}>
                {lang === "fr" ? client.description.fr : client.description.en}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
