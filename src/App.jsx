// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Utilities / UI helpers
import ScrollToTopButton from "./components/ScrollToTopButton";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton"; // ✅ add
import SiteBackground from "./components/SiteBackground";


// --- Lazy-loaded pages (code-splitting) ---
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Industries = lazy(() => import("./pages/Industries"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Clients = lazy(() => import("./pages/Clients"));

// Simple 404 component (kept inline to avoid another file)
const NotFound = () => (
  <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
    <h1 style={{ marginBottom: "0.5rem" }}>404</h1>
    <p>Page not found</p>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4 },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div {...pageTransition}>
              <About />
            </motion.div>
          }
        />
        <Route
          path="/services"
          element={
            <motion.div {...pageTransition}>
              <Services />
            </motion.div>
          }
        />
        <Route
          path="/industries"
          element={
            <motion.div {...pageTransition}>
              <Industries />
            </motion.div>
          }
        />
        <Route
          path="/certifications"
          element={
            <motion.div {...pageTransition}>
              <Certifications />
            </motion.div>
          }
        />
        <Route
          path="/clients"
          element={
            <motion.div {...pageTransition}>
              <Clients />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div {...pageTransition}>
              <Contact />
            </motion.div>
          }
        />
        {/* Fallback route */}
        <Route
          path="*"
          element={
            <motion.div {...pageTransition}>
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* We mount Preloader once in main.jsx — not here */}
        <SiteBackground /> 
      <Navbar />

      {/* Suspense boundary for lazy routes */}
      <Suspense fallback={<div style={{ padding: "2rem" }}>Loading…</div>}>
        <AnimatedRoutes />
      </Suspense>

      <ScrollToTopButton />
      <Footer />

      {/* Floating helpers / widgets */}
      <Chatbot />
      <ScrollToTop />
       <WhatsAppButton />
    </BrowserRouter>
  );
}