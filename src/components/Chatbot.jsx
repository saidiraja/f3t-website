// src/components/Chatbot.jsx
import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/useI18n";
import "./Chatbot.css";

export default function Chatbot() {
  const { lang } = useI18n();

  // floating toggle
  const [open, setOpen] = useState(false);

  // chat state
  const [messages, setMessages] = useState([]); // {role:'user'|'bot', text:string}
  const [typing, setTyping] = useState(false);

  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const scrollerRef = useRef(null);

  // bilingual FAQs
  const faqs = lang === "fr"
    ? [
        { q: "Quels services proposez-vous ?", a: "Nous offrons : trempe sous vide, cémentation, carbonitruration, nitruration gazeuse, induction, zingage alcalin, brunissage, nettoyage." },
        { q: "Travaillez-vous avec l’aéronautique ?", a: "Oui. Nous respectons des exigences strictes de performance et de sécurité, avec procédures qualité documentées." },
        { q: "Quelles industries servez-vous ?", a: "Automobile, aéronautique, machines lourdes et fabrication d’outils." },
        { q: "Êtes-vous certifiés ?", a: "Oui. ISO 9001. D’autres certifications sont en cours." },
        { q: "Comment vous contacter ?", a: "Par téléphone (+216 72 677 013), e-mail (f3t_direction@topnet.tn) ou via la page Contact du site." },
      ]
    : [
        { q: "What services do you offer?", a: "We provide: vacuum hardening, carburizing, carbonitriding, gas nitriding, induction hardening, alkaline zinc plating, bluing, and cleaning." },
        { q: "Do you work with aerospace?", a: "Yes. We meet stringent performance & safety requirements with documented quality procedures." },
        { q: "Which industries do you serve?", a: "Automotive, aerospace, heavy machinery, and toolmaking." },
        { q: "Are you certified?", a: "Yes. ISO 9001. Additional certifications are in progress." },
        { q: "How can I contact you?", a: "By phone (+216 72 677 013), email (f3t_direction@topnet.tn), or through the Contact page." },
      ];

  // When dialog closes, restore focus to the toggle
  useEffect(() => {
    if (!open && openerRef.current) openerRef.current.focus();
    if (!open) {
      // reset chat for a fresh start next time (optional)
      setTyping(false);
      setMessages([]);
    }
  }, [open]);

  // Focus trap + ESC to close when open
  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    const focusables = root.querySelectorAll(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first?.focus();
        }
      }
    }
    first?.focus();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-scroll to bottom on new messages/typing
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, lang]);

  // User clicks one FAQ -> add user message -> typing -> add bot reply
  const ask = (faq) => {
    setMessages((prev) => [...prev, { role: "user", text: faq.q }]);
    setTyping(true);
    // simulate small delay for typing
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: faq.a }]);
      setTyping(false);
    }, 550);
  };

  const t = (key) => {
    const fr = {
      title: "Chatbot / FAQ",
      more: "Plus de questions",
      askAnother: "Voir plus de questions",
      close: "Fermer",
      start: "Choisissez une question pour commencer :",
      typing: "F3T est en train d’écrire…",
      restart: "Recommencer",
    };
    const en = {
      title: "Chatbot / FAQ",
      more: "More questions",
      askAnother: "See more questions",
      close: "Close",
      start: "Pick a question to start:",
      typing: "F3T is typing…",
      restart: "Start over",
    };
    return (lang === "fr" ? fr : en)[key];
  };

  const hasConversation = messages.length > 0;

  return (
    <>
      {/* Floating toggle button (bottom-right) */}
      <button
        ref={openerRef}
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open ? "true" : "false"}
        aria-controls="chatbot-window"
        aria-label={open ? t("close") : t("title")}
        title={t("title")}
      >
        <i className={`fas ${open ? "fa-times" : "fa-comment-dots"}`} aria-hidden="true"></i>
      </button>

      {open && (
        <div
          id="chatbot-window"
          className="chatbot-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          ref={dialogRef}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <i className="fas fa-robot" aria-hidden="true"></i>
              <h3 id="chatbot-title">{t("title")}</h3>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              title={t("close")}
            >
              ✕
            </button>
          </div>

          {/* Messages / FAQ area */}
          <div className="chatbot-body" ref={scrollerRef}>
            {!hasConversation ? (
              <>
                <p className="chatbot-hint">{t("start")}</p>
                <div className="faq-grid">
                  {faqs.map((item, i) => (
                    <button
                      key={i}
                      className="faq-pill"
                      onClick={() => ask(item)}
                      aria-label={item.q}
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {messages.map((m, i) => (
                  <Bubble key={i} role={m.role} text={m.text} />
                ))}
                {typing && <Typing text={t("typing")} />}
              </>
            )}
          </div>

          {/* Footer / Actions */}
          <div className="chatbot-footer">
            {!hasConversation ? (
              <div className="footer-row">
                <span className="footer-tip">F3T</span>
              </div>
            ) : (
              <div className="footer-row">
                <button
                  className="ghost-btn"
                  onClick={() => setMessages([])}
                  aria-label={t("restart")}
                  title={t("restart")}
                >
                  {t("restart")}
                </button>
                <div style={{ flex: 1 }} />
                <div className="more-qs">
                  <span className="muted">{t("askAnother")}:</span>
                  <div className="more-qs-list">
                    {faqs.slice(0, 3).map((item, i) => (
                      <button key={i} className="link-btn" onClick={() => ask(item)}>
                        {item.q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`bubble-row ${isUser ? "right" : "left"}`}>
      <div className={`bubble ${isUser ? "user" : "bot"}`}>
        {!isUser && <i className="fas fa-robot bubble-icon" aria-hidden="true"></i>}
        <p>{text}</p>
      </div>
    </div>
  );
}

function Typing({ text }) {
  return (
    <div className="bubble-row left">
      <div className="bubble bot typing">
        <i className="fas fa-robot bubble-icon" aria-hidden="true"></i>
        <span className="dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
        <span className="typing-label" aria-live="polite">{text}</span>
      </div>
    </div>
  );
}
