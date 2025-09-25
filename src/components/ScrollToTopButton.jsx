// src/components/ScrollToTopButton.jsx
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{`
        .scrolltop-fab {
          position: fixed;
          right: 16px;
          bottom: 16px; /* sits above Chatbot at bottom-right */
          z-index: 1001; /* above Chatbot(1000) and WhatsApp(999) */
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        }
        @media (max-width: 640px){
          .scrolltop-fab {
            right: auto;
            left: 50%;
            transform: translateX(-50%);
            bottom: 16px; /* bottom-center on small screens */
          }
        }
        /* Respect iOS safe areas */
        @supports (padding: max(0px)) {
          .scrolltop-fab {
            bottom: max(96px, env(safe-area-inset-bottom)); /* desktop: still clears Chatbot */
          }
          @media (max-width: 640px){
            .scrolltop-fab {
              bottom: max(16px, env(safe-area-inset-bottom));
              left: calc(50% + env(safe-area-inset-left)/2);
            }
          }
        }
      `}</style>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="scrolltop-fab"
        style={{
          background:"#d51820",
          color: "#fff",
          border: "none",
          padding: "0.6rem 0.9rem",
          borderRadius: "10px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        ↑
      </button>
    </>
  );
}
