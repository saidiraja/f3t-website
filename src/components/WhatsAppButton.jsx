// src/components/WhatsAppButton.jsx
export default function WhatsAppButton() {
  return (
    <>
      <style>
        {`
          /* Respect iOS safe-area on very small screens */
          @supports (padding: max(0px)) {
            .wa-fab {
              bottom: max(16px, env(safe-area-inset-bottom));
              left: max(16px, env(safe-area-inset-left));
            }
          }
        `}
      </style>
      <a
        href="https://wa.me/21672677013"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
        className="wa-fab"
        style={{
          position: "fixed",
          left: "16px",        // bottom-left
          bottom: "16px",
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: "9999px",
          width: "56px",
          height: "56px",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,.25)",
          zIndex: 999,         // below scroll-to-top(1001) and Chatbot(1000)
          textDecoration: "none",
          fontSize: "24px",
        }}
      >
        <i className="fab fa-whatsapp" aria-hidden="true"></i>
      </a>
    </>
  );
}
