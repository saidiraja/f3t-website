// src/App.jsx
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Utilities / UI helpers
import ScrollToTopButton from "./components/ScrollToTopButton";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import SiteBackground from "./components/SiteBackground";

// --- Admin auth context
import AdminProvider, { useAdmin } from "./admin/AdminContext";

// --- Lazy-loaded public pages (code-splitting)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Industries = lazy(() => import("./pages/Industries"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Clients = lazy(() => import("./pages/Clients"));
const News = lazy(() => import("./pages/News"));

// --- Lazy-loaded Admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageHome = lazy(() => import("./pages/admin/ManageHome"));
const ManageAbout = lazy(() => import("./pages/admin/ManageAbout"));
const ManageServices = lazy(() => import("./pages/admin/ManageServices"));
const ManageIndustries = lazy(() => import("./pages/admin/ManageIndustries"));
const ManageCertifications = lazy(() => import("./pages/admin/ManageCertifications"));
const ManageClients = lazy(() => import("./pages/admin/ManageClients"));
const ManageNews = lazy(() => import("./pages/admin/ManageNews"));

// Simple 404 component (kept inline)
const NotFound = () => (
  <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
    <h1 style={{ marginBottom: "0.5rem" }}>404</h1>
    <p>Page not found</p>
  </div>
);

// Guard for protected admin routes
function Protected({ children }) {
  const { loggedIn } = useAdmin();
  return loggedIn ? children : <Navigate to="/admin/login" replace />;
}

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
        {/* Public routes */}
        <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
        <Route path="/about" element={<motion.div {...pageTransition}><About /></motion.div>} />
        <Route path="/services" element={<motion.div {...pageTransition}><Services /></motion.div>} />
        <Route path="/industries" element={<motion.div {...pageTransition}><Industries /></motion.div>} />
        <Route path="/certifications" element={<motion.div {...pageTransition}><Certifications /></motion.div>} />
        <Route path="/clients" element={<motion.div {...pageTransition}><Clients /></motion.div>} />
        <Route path="/news" element={<motion.div {...pageTransition}><News /></motion.div>} />
        <Route path="/contact" element={<motion.div {...pageTransition}><Contact /></motion.div>} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<motion.div {...pageTransition}><AdminLogin /></motion.div>} />
        <Route
          path="/admin"
          element={
            <Protected>
              <motion.div {...pageTransition}><AdminDashboard /></motion.div>
            </Protected>
          }
        >
          <Route path="home" element={<motion.div {...pageTransition}><ManageHome /></motion.div>} />
          <Route path="about" element={<motion.div {...pageTransition}><ManageAbout /></motion.div>} />
          <Route path="services" element={<motion.div {...pageTransition}><ManageServices /></motion.div>} />
          <Route path="industries" element={<motion.div {...pageTransition}><ManageIndustries /></motion.div>} />
          <Route path="certifications" element={<motion.div {...pageTransition}><ManageCertifications /></motion.div>} />
          <Route path="clients" element={<motion.div {...pageTransition}><ManageClients /></motion.div>} />
          <Route path="news" element={<motion.div {...pageTransition}><ManageNews /></motion.div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<motion.div {...pageTransition}><NotFound /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <AdminProvider>
      <Router>
        {/* Preloader is mounted in main.jsx; not here */}
        <SiteBackground />
        <Navbar />
        <Suspense fallback={<div style={{ padding: "2rem" }}>Loading…</div>}>
          <AnimatedRoutes />
        </Suspense>
        <ScrollToTopButton />
        <Footer />
        {/* Floating helpers / widgets */}
        <Chatbot />
        <ScrollToTop />
        <WhatsAppButton />
      </Router>
    </AdminProvider>
  );
}
