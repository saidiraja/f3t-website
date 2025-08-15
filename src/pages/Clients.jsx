import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useLanguage from "../components/useLanguage";

export default function Clients() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const clientList = ["SIM Ben Arous", "SOPEM", "Defontaine", "Decotools", "MISFAT"];

  return (
    <section style={{ padding: "2rem", background: "#f9f9f9" }}>
      <div style={{ maxWidth: "900px", margin: "auto" }}>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          {clientList.map((client, index) => (
            <div
              key={index}
              data-aos="fade-up"
              style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                fontWeight: "bold",
                color: "#d51820",
              }}
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
