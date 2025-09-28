// src/pages/Services.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useI18n } from "../i18n/useI18n";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import EditBar from "../components/EditBar";
import { asset } from "../utils/asset";

// NEW
import { PageContentProvider } from "../cms/PageContentContext";
import EditableText from "../cms/EditableText";

export default function Services() {
  const { lang } = useI18n();

  useEffect(() => { AOS.init({ duration: 1000 }); }, []);

  const services = {
    fr: [
      { icon: "fas fa-fire", key: "srv_vacuum", title: "Unité de traitement sous vide",
        desc: "Trempe des aciers à outils, aciers rapides, aciers de construction moyennement alliés. Mise en solution des superalliages. Traitement des alliages à durcissement structural. Recuits, revenus, brasage.",
        tags: ["Haute précision", "Utilisé en aéronautique"] },
      { icon: "fas fa-temperature-high", key: "srv_atmos", title: "Unité de traitement sous atmosphère",
        desc: "Trempe à l’huile, cémentation, carbonitruration, recuit, revenu." },
      { icon: "fas fa-wind", key: "srv_nitrid", title: "Unité de nitruration gazeuse",
        desc: "Nitruration gazeuse et revenu.", tags: ["Durabilité accrue"] },
      { icon: "fas fa-bolt", key: "srv_induction", title: "Unité de traitement par induction",
        desc: "Trempe localisée pour travail de série." },
      { icon: "fas fa-pump-soap", key: "srv_clean", title: "Unité de nettoyage",
        desc: "Dégraissage à l’huile et au solvant." },
      { icon: "fas fa-flask", key: "srv_zinc", title: "Unité de zingage électrolytique alcalin",
        desc: "Zingage finition blanc, jaune, noir avec passivation et finition finigard." },
      { icon: "fas fa-burn", key: "srv_bluing", title: "Unité de brunissage à chaud",
        desc: "Pour aciers à très faible % de Cr." },
    ],
    en: [
      { icon: "fas fa-fire", key: "srv_vacuum", title: "Vacuum Heat Treatment Unit",
        desc: "Hardening of tool steels, high-speed steels, and medium-alloy structural steels. Solution treatment of superalloys. Annealing, tempering, brazing.",
        tags: ["High precision", "Aerospace certified"] },
      { icon: "fas fa-temperature-high", key: "srv_atmos", title: "Atmosphere Heat Treatment Unit",
        desc: "Oil quenching, carburizing, carbonitriding, annealing, tempering." },
      { icon: "fas fa-wind", key: "srv_nitrid", title: "Gas Nitriding Unit",
        desc: "Gas nitriding and tempering.", tags: ["Extended durability"] },
      { icon: "fas fa-bolt", key: "srv_induction", title: "Induction Heat Treatment Unit",
        desc: "Localized hardening for series production." },
      { icon: "fas fa-pump-soap", key: "srv_clean", title: "Cleaning Unit",
        desc: "Oil and solvent degreasing." },
      { icon: "fas fa-flask", key: "srv_zinc", title: "Alkaline Electrolytic Zinc Plating Unit",
        desc: "Zinc plating with white, yellow, and black finish, with passivation and Finigard finish." },
      { icon: "fas fa-burn", key: "srv_bluing", title: "Hot Bluing Unit",
        desc: "For steels with very low % Cr." },
    ],
  };

  const items = services[lang];

  return (
    <PageContentProvider page="services">
      <section style={{ padding: "3rem 1rem", backgroundColor: "transparent" }}>
        <EditBar manageTo="/admin/services" />
        <SEO
          title={lang === "fr" ? "F3T | Nos services" : "F3T | Our services"}
          description={
            lang === "fr"
              ? "Découvrez nos unités de traitement thermique et de surface : trempe sous vide, atmosphère, nitruration gazeuse, induction, nettoyage, zingage, brunissage."
              : "Explore our heat & surface treatment units: vacuum, atmosphere, gas nitriding, induction, cleaning, zinc plating, hot bluing."
          }
        />

        {/* Header image */}
        <div data-aos="fade-up" style={{ marginBottom: "2rem" }}>
          <img
            src={asset("factory.jpg")}
            alt={lang === "fr" ? "Atelier de traitement thermique" : "Heat treatment factory"}
            style={{ width: "100%", borderRadius: "12px", maxHeight: "300px", objectFit: "cover", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h1 data-aos="fade-up" style={{ fontSize: "2.5rem", color: "#051d40", marginBottom: "1.5rem", textAlign: "center" }}>
          <EditableText k="services_title" fr="Nos Services" en="Our Services" />
        </h1>

        {/* Intro */}
        <div data-aos="fade-up" style={introBox}>
          <h2 style={{ color: "#d51820", marginBottom: "1rem" }}>
            <EditableText k="services_subtitle" fr="Technologie & Excellence" en="Technology & Excellence" />
          </h2>
          <p style={introText}>
            <EditableText
              k="services_intro"
              fr="Nos unités de traitement thermique et de surface sont conçues pour répondre aux exigences les plus strictes des industries modernes."
              en="Our heat and surface treatment units are designed to meet the most demanding industrial standards."
            />
          </p>
        </div>

        {/* Service Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {items.map((s, i) => (
            <div key={i} data-aos="fade-up" style={card} onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-6px)")} onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
              <i className={s.icon} style={{ fontSize: "2.4rem", color: "#d51820", marginBottom: "0.8rem" }} aria-hidden="true"></i>
              <h3 style={{ color: "#051d40", marginBottom: "0.6rem", fontSize: "1.3rem" }}>
                <EditableText k={`${s.key}_title`} fr={s.title} en={s.title} />
              </h3>
              <p style={{ color: "#444", fontSize: "1rem", lineHeight: "1.6" }}>
                <EditableText k={`${s.key}_desc`} fr={s.desc} en={s.desc} />
              </p>
              {s.tags && (
                <div style={{ marginTop: "1rem" }}>
                  {s.tags.map((t, j) => (
                    <span key={j} style={tag}>
                      <i className="fas fa-check" style={{ marginRight: 5 }} aria-hidden="true"></i>
                      <EditableText k={`${s.key}_tag_${j}`} fr={t} en={t} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div data-aos="fade-up" style={cta}>
          <h2>
            <EditableText k="services_cta_title" fr="Besoin d'un service sur mesure ?" en="Need a custom service?" />
          </h2>
          <Link to="/contact" style={{ color: "#fff", textDecoration: "underline", fontWeight: "bold" }}>
            <EditableText k="services_cta_link" fr="Contactez notre équipe dès aujourd'hui" en="Reach out to our team today" />
          </Link>
        </div>
      </section>
    </PageContentProvider>
  );
}

const introBox = { backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "saturate(120%) blur(2px)", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "3rem", textAlign: "center" };
const introText = { color: "#444", maxWidth: "750px", margin: "auto", fontSize: "1.1rem", lineHeight: "1.7" };
const card = { backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "saturate(120%) blur(2px)", padding: "2rem", borderRadius: "16px", boxShadow: "0 6px 16px rgba(0,0,0,0.08)", transition: "transform 0.2s ease", textAlign: "center" };
const tag = { display: "inline-block", backgroundColor: "#d51820", color: "white", padding: "0.4rem 0.8rem", fontSize: "0.8rem", borderRadius: "20px", marginRight: "0.5rem", marginTop: "0.3rem" };
const cta = { marginTop: "4rem", backgroundColor: "#d51820", padding: "2rem", textAlign: "center", borderRadius: "12px", color: "#fff" };
