import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Industries from "./pages/Industries";
import Certifications from "./pages/Certifications";
import Clients from "./pages/Clients";
import Preloader from "./components/Preloader";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Chatbot from "./components/Chatbot"; 
import ScrollToTop from "./components/ScrollToTop";
import DarkModeToggle from "./components/DarkModeToggle"; 

function AnimatedRoutes() {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4 }
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
        <Route path="/about" element={<motion.div {...pageTransition}><About /></motion.div>} />
        <Route path="/services" element={<motion.div {...pageTransition}><Services /></motion.div>} />
        <Route path="/industries" element={<motion.div {...pageTransition}><Industries /></motion.div>} />
        <Route path="/certifications" element={<motion.div {...pageTransition}><Certifications /></motion.div>} />
        <Route path="/clients" element={<motion.div {...pageTransition}><Clients /></motion.div>} />
        <Route path="/contact" element={<motion.div {...pageTransition}><Contact /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Preloader /> {/* ✅ Displays loading screen briefly */}
      <Navbar />
      <AnimatedRoutes />
      <ScrollToTopButton />
      <Footer />
      <Chatbot /> 
       <ScrollToTop /> 
        <DarkModeToggle /> 
    </BrowserRouter>
  );
}

export default App;
