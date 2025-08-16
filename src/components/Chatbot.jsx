import { useState } from "react";
import useLanguage from "./useLanguage";
import "./Chatbot.css";

export default function Chatbot() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  const faqs = {
    fr: [
      { q: "Quels services proposez-vous ?", a: "Nous offrons des traitements thermiques, de surface, de nettoyage, de brunissage, et plus encore." },
      { q: "Êtes-vous certifiés ?", a: "Oui, nous sommes certifiés ISO 9001 et d'autres certifications sont en cours." },
      { q: "Dans quels secteurs intervenez-vous ?", a: "Nous desservons l’automobile, l’aéronautique, les machines lourdes et la fabrication d’outils." },
      { q: "Comment vous contacter ?", a: "Vous pouvez utiliser notre page de contact, appeler ou nous envoyer un email." },
      { q: "Livrez-vous à l'international ?", a: "Oui, nous développons activement notre présence à l'international." },
    ],
    en: [
      { q: "What services do you offer?", a: "We provide heat treatments, surface processing, cleaning, bluing, and more." },
      { q: "Are you certified?", a: "Yes, we are ISO 9001 certified and additional certifications are in progress." },
      { q: "Which industries do you serve?", a: "We serve automotive, aerospace, heavy machinery, and toolmaking sectors." },
      { q: "How can I contact you?", a: "You can use our contact page, call us, or send an email." },
      { q: "Do you operate internationally?", a: "Yes, we are actively expanding into international markets." },
    ],
  };

  const currentFaqs = faqs[language];

  return (
    <>
      {/* Chat Button */}
      <div className="chatbot-toggle" onClick={() => setOpen(!open)}>
        <i className={`fas ${open ? "fa-times" : "fa-comment-dots"}`}></i>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          <h3>{language === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}</h3>
          <div className="chatbot-faqs">
            {currentFaqs.map((item, index) => (
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
