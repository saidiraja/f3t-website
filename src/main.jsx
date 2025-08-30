// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/useI18n.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Preloader from "./components/Preloader.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <ErrorBoundary>
        <Preloader />
        <App />
      </ErrorBoundary>
    </I18nProvider>
  </React.StrictMode>
);
