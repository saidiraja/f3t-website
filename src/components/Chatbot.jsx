// src/components/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { useI18n } from "../i18n/useI18n";
import "./Chatbot.css";

export default function Chatbot() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);

  // FAQ content (bilingual)
  const faqs =
    lang === "fr"
      ? [
          { q: "Quels services proposez-vous ?", a: "Nous offrons des traitements thermiques, de surface, de nettoyage, de brunissage, et plus encore." },
          { q: "Êtes-vous certifiés ?", a: "Oui, nous sommes certifiés ISO 9001 et d'autres certifications sont en cours." },
          { q: "Dans quels secteurs intervenez-vous ?", a: "Nous desservons l’automobile, l’aéronautique, les machines lourdes et la fabrication d’outils." },
          { q: "Comment vous contacter ?", a: "Vous pouvez utiliser notre page de contact, appeler ou nous envoyer un email." },
          { q: "Livrez-vous à l'international ?", a: "Oui, nous développons activement notre présence à l'international." }
        ]
      : [
          { q: "What services do you offer?", a: "We provide heat treatments, surface processing, cleaning, bluing, and more." },
          { q: "Are you certified?", a: "Yes, we are ISO 9001 certified and additional certifications are in progress." },
          { q: "Which industries do you serve?", a: "We serve automotive, aerospace, heavy machinery, and toolmaking sectors." },
          { q: "How can I contact you?", a: "You can use our contact page, call us, or send an email." },
          { q: "Do you operate internationally?", a: "Yes, we are actively expanding into international markets." }
        ];

  // return focus to launcher
  useEffect(() => {
    if (!open && openerRef.current) openerRef.current.focus();
  }, [open]);

  // simple focus trap + ESC to close
  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    const nodes = root.querySelectorAll(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    first?.focus();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Chat Button */}
      <button
        ref={openerRef}
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open ? "true" : "false"}
        aria-controls="chatbot-window"
        aria-label={open ? (lang === "fr" ? "Fermer le chatbot" : "Close chatbot") : (lang === "fr" ? "Ouvrir le chatbot" : "Open chatbot")}
        title={lang === "fr" ? "Chatbot / FAQ" : "Chatbot / FAQ"}
      >
        <i className={`fas ${open ? "fa-times" : "fa-comment-dots"}`} aria-hidden="true"></i>
      </button>

      {/* Chat Window */}
      {open && (
        <div
          id="chatbot-window"
          className="chatbot-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          ref={dialogRef}
        >
          <h3 id="chatbot-title">{lang === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}</h3>
          <div className="chatbot-faqs">
            {faqs.map((item, index) => (
              <div key={index} className="faq-item">
                <p className="faq-q">Q: {item.q}</p>
                <p className="faq-a">A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
