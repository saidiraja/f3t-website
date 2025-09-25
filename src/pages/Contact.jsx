// src/pages/Contact.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useI18n } from "../i18n/useI18n";
import SEO from "../components/SEO";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const { lang } = useI18n();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // --- URLs that work on GitHub Pages (repo base is /f3t-website/)
  const base = (import.meta.env.BASE_URL || "/");
  const siteOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const siteUrl = siteOrigin + base; // e.g. https://<user>.github.io/f3t-website/
  const canonical = siteUrl + "#/contact";
  const logoAbs = new URL(base + "Nlogo.png", siteOrigin).href;

  const title = lang === "fr" ? "F3T | Contact" : "F3T | Contact";
  const description =
    lang === "fr"
      ? "Contactez F3T : Lot N°23+54 Zone Industrielle 1152 Hammem Zriba Zaghouan, +216 72 677 013, f3t_direction@topnet.tn."
      : "Contact F3T: Lot N°23+54 Industrial Zone 1152 Hammem Zriba Zaghouan, +216 72 677 013, f3t_direction@topnet.tn.";

  // Organization JSON-LD (kept inline because your SEO.jsx doesn’t take jsonLd props)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fraternité Tunisienne de Traitement Thermique (F3T)",
    url: siteUrl,
    logo: logoAbs,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lot: N°23+54 Zone Industrielle 1152 Hammem Zriba",
      addressLocality: "Zaghouan",
      addressCountry: "TN",
    },
    telephone: "+21672677013",
    email: "f3t_direction@topnet.tn",
  };

  // --- Formspree (real submissions)
  // 1) npm i @formspree/react
  // 2) Replace YOUR_FORMSPREE_ID below
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID");

  return (
    <section style={{ padding: "2rem", background: "transparent" }}>
      <SEO title={title} description={description} canonical={canonical} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

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
          {lang === "fr" ? "Contactez-nous" : "Contact Us"}
        </h1>

        {/* Contact Info */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "saturate(120%) blur(2px)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            marginBottom: "2rem",
          }}
        >
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:f3t_direction@topnet.tn">f3t_direction@topnet.tn</a>
          </p>
          <p>
            <strong>Téléphone / Phone:</strong>{" "}
            <a href="tel:+21672677013">+216 72 677 013</a>
          </p>
          <p>
            <strong>{lang === "fr" ? "Adresse" : "Address"}:</strong> Lot: N°23+54 Zone Industrielle 1152 Hammem Zriba
            Zaghouan Tunisie
          </p>
        </div>

        {/* Google Map */}
        <div data-aos="fade-up" style={{ marginBottom: "2rem" }}>
          <iframe
            title={lang === "fr" ? "Carte – F3T" : "Map – F3T"}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Lot:%20N%C2%B023%2B54%20Zone%20Industrielle%201152%20Hammem%20Zriba%20Zaghouan%20Tunisie&output=embed"
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
          />
        </div>

        {/* Contact Form (Formspree) */}
        <div
          data-aos="fade-up"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "saturate(120%) blur(2px)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          {state.succeeded ? (
            <p role="status">
              {lang === "fr" ? "✅ Merci, votre message a été envoyé." : "✅ Thanks, your message has been sent."}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: ".35rem", color: "#051d40" }}>
                  {lang === "fr" ? "Nom" : "Name"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  style={inputStyle}
                  placeholder={lang === "fr" ? "Votre nom" : "Your name"}
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: ".35rem", color: "#051d40" }}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  style={inputStyle}
                  placeholder="email@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="message" style={{ display: "block", marginBottom: ".35rem", color: "#051d40" }}>
                  {lang === "fr" ? "Message" : "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  aria-required="true"
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder={lang === "fr" ? "Votre message…" : "Your message…"}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                style={{
                  backgroundColor: "#d51820",
                  color: "white",
                  padding: "0.6rem 1.5rem",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                aria-label={lang === "fr" ? "Envoyer le message" : "Send the message"}
              >
                {lang === "fr" ? "Envoyer" : "Send"}
              </button>
            </form>
          )}
        </div>

        {/* WhatsApp CTA */}
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
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <i className="fab fa-whatsapp" style={{ marginRight: "0.5rem" }} aria-hidden="true"></i>
            {lang === "fr" ? "Contacter via WhatsApp" : "Contact via WhatsApp"}
          </a>
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
