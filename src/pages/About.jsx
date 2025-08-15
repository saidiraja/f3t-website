import useLanguage from "../components/useLanguage";

export default function About() {
  const { language } = useLanguage();

  return (
    <section style={{ padding: "2rem", background: "#f9f9f9" }}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1 style={{ fontSize: "2rem", color: "#051d40", marginBottom: "1rem" }}>
          {language === "fr" ? "À propos de F3T" : "About F3T"}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#444" }}>
          {language === "fr"
            ? "F3T est un leader tunisien dans le traitement thermique et de surface."
            : "F3T is a Tunisian leader in heat and surface treatment."}
        </p>
      </div>
    </section>
  );
}
