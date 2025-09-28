// src/pages/Industries.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import SEO from "../components/SEO";
import { asset } from "../utils/asset";
import EditBar from "../components/EditBar";

// NEW
import { PageContentProvider } from "../cms/PageContentContext";
import EditableText from "../cms/EditableText";

export default function Industries() {
  const { lang } = useI18n();
  useEffect(() => { AOS.init({ duration: 1000 }); }, []);

  const data = {
    fr: [
      { icon: "fas fa-car", key: "ind_auto", title: "Automobile", description: "Amélioration de la résistance à l’usure et de la durabilité des composants.", image: asset("industry-automotive.jpg") },
      { icon: "fas fa-rocket", key: "ind_aero", title: "Aéronautique", description: "Respect des exigences de performance et de sécurité les plus strictes.", image: asset("industry-aerospace.jpg") },
      { icon: "fas fa-industry", key: "ind_heavy", title: "Machines lourdes", description: "Traitement de grandes pièces pour une résistance maximale.", image: asset("industry-heavy.jpg") },
      { icon: "fas fa-wrench", key: "ind_tools", title: "Fabrication d’outils", description: "Durcissement et précision pour prolonger la durée de vie des outils.", image: asset("industry-tools.jpg") },
    ],
    en: [
      { icon: "fas fa-car", key: "ind_auto", title: "Automotive", description: "Enhanced wear resistance and durability of components.", image: asset("industry-automotive.jpg") },
      { icon: "fas fa-rocket", key: "ind_aero", title: "Aerospace", description: "Meeting the highest performance and safety standards.", image: asset("industry-aerospace.jpg") },
      { icon: "fas fa-industry", key: "ind_heavy", title: "Heavy Machinery", description: "Treating large components for maximum strength.", image: asset("industry-heavy.jpg") },
      { icon: "fas fa-wrench", key: "ind_tools", title: "Toolmaking", description: "Hardening and precision to extend tool lifespan.", image: asset("industry-tools.jpg") },
    ],
  };

  const items = data[lang];

  return (
    <PageContentProvider page="industries">
      <section style={{ padding: "3rem 1rem", background: "transparent" }}>
        <EditBar manageTo="/admin/industries" />
        <SEO
          title={lang === "fr" ? "F3T | Industries desservies" : "F3T | Industries served"}
          description={
            lang === "fr"
              ? "Nous accompagnons plusieurs secteurs industriels exigeants : automobile, aéronautique, machines lourdes, fabrication d’outils."
              : "We serve demanding industries: automotive, aerospace, heavy machinery, toolmaking."
          }
        />

        <div style={{ maxWidth: "1100px", margin: "auto" }}>
          <h1 data-aos="fade-up" style={{ fontSize: "2.4rem", color: "#051d40", marginBottom: "0.5rem", textAlign: "center" }}>
            <EditableText k="industries_title" fr="Industries desservies" en="Industries We Serve" />
          </h1>

          <p data-aos="fade-up" style={{ textAlign: "center", marginBottom: "2.5rem", color: "#666", fontSize: "1.05rem" }}>
            <EditableText
              k="industries_intro"
              fr="Nous accompagnons plusieurs secteurs industriels exigeants grâce à notre expertise en traitement thermique et de surface."
              en="We support demanding industrial sectors through our advanced heat and surface treatment expertise."
            />
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {items.map((ind, i) => (
              <div
                key={i}
                data-aos="fade-up"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "saturate(120%) blur(2px)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.06)"; }}
              >
                <img src={ind.image} alt={ind.title} style={{ width: "100%", height: "170px", objectFit: "cover" }} loading="lazy" />
                <div style={{ padding: "1.5rem", textAlign: "center" }}>
                  <i className={ind.icon} style={{ fontSize: "2rem", color: "#d51820", marginBottom: "0.5rem" }} aria-hidden="true"></i>
                  <h3 style={{ color: "#051d40", marginBottom: "0.5rem" }}>
                    <EditableText k={`${ind.key}_title`} fr={ind.title} en={ind.title} />
                  </h3>
                  <p style={{ color: "#444", fontSize: "1rem", lineHeight: "1.5" }}>
                    <EditableText k={`${ind.key}_desc`} fr={ind.description} en={ind.description} />
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div data-aos="fade-up" style={{ marginTop: "4rem", backgroundColor: "#d51820", padding: "2rem", textAlign: "center", borderRadius: "12px", color: "#fff" }}>
            <h2>
              <EditableText k="industries_cta_title" fr="Vous souhaitez en savoir plus ?" en="Want to learn more?" />
            </h2>
            <Link to="/services" style={{ color: "#fff", textDecoration: "underline", fontWeight: "bold", fontSize: "1.05rem" }}>
              <EditableText
                k="industries_cta_link"
                fr="Découvrez nos services adaptés à votre industrie"
                en="Explore services tailored to your industry"
              />
            </Link>
          </div>
        </div>
      </section>
    </PageContentProvider>
  );
}
