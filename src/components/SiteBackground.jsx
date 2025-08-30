// src/components/SiteBackground.jsx
export default function SiteBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "url('/bg-metal.jpg') center/cover no-repeat fixed",
          zIndex: -2,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--bg-overlay)", // reacts to dark/light
          zIndex: -1,
        }}
      />
    </>
  );
}
