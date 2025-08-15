import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useLanguage from "../components/useLanguage";

export default function Contact() {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section style={{ padding: "2rem", background: "#f9f9f9" }}>
      <div style={{ maxWidth: "900px", margin: "auto" }}>

        {/* Title */}
        <h1
          data-aos="fade-up"
          style={{
            fontSize: "2.2rem",
            color: "#051d40",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {language === "fr" ? "Contactez-nous" : "Contact Us"}
        </h1>

        {/* Contact Info */}
        <div
          data-aos="fade-up"
          style={{
            background: "#ffffff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            marginBottom: "2rem",
          }}
        >
          <p><strong>Email:</strong> f3t_direction@topnet.tn</p>
          <p><strong>Téléphone / Phone:</strong> +216 72 677 013</p>
          <p><strong>
            {language === "fr" ? "Adresse" : "Address"}:
          </strong> Lot: N°23+54 Zone Industrielle 1152 Hammem Zriba Zaghouan Tunisie</p>
        </div>

        {/* Google Map */}
        <div data-aos="fade-up" style={{ marginBottom: "2rem" }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.5783791488697!2d10.130188!3d36.376628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd5cd90b50fef3%3A0x96e65b0aa0decb52!2sZriba%20Zaghouan!5e0!3m2!1sfr!2stn!4v1694457100000!5m2!1sfr!2stn"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div data-aos="fade-up" style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <form>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder={language === "fr" ? "Nom" : "Name"}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <textarea
                placeholder={language === "fr" ? "Message" : "Message"}
                rows="4"
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#d51820",
                color: "white",
                padding: "0.6rem 1.5rem",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                alert("✅ Message envoyé (non connecté à un backend).");
              }}
            >
              {language === "fr" ? "Envoyer" : "Send"}
            </button>
          </form>
        </div>

        {/* WhatsApp Button */}
        <div data-aos="fade-up" style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="https://wa.me/21672677013"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#25d366",
              color: "white",
              padding: "0.8rem 1.5rem",
              borderRadius: "30px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <i className="fab fa-whatsapp" style={{ marginRight: "0.5rem" }}></i>
            {language === "fr" ? "Contacter via WhatsApp" : "Contact via WhatsApp"}
          </a>
        </div>

        {/* Chatbot Placeholder */}
        <div
          data-aos="fade-up"
          style={{
            marginTop: "3rem",
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "#eeeeee",
            borderRadius: "8px",
            fontStyle: "italic",
            color: "#666",
          }}
        >
          🤖 {language === "fr"
            ? "Zone de chatbot (FAQ) à venir bientôt."
            : "Chatbot FAQ zone coming soon."}
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "1rem",
};
