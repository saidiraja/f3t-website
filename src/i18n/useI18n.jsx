// src/i18n/useI18n.jsx
import { createContext, useContext, useEffect, useState } from "react";
import fr from "./fr.json";
import en from "./en.json";

// Available dictionaries (FR is default per brief)
const DICT = { fr, en };

// Shape for the context
const I18nContext = createContext({
  t: fr,
  lang: "fr",
  setLang: () => {},
});

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("fr"); // default: FR

  // keep <html lang> in sync for a11y/SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = DICT[lang] || fr;
  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

// 👇 This is the named hook your build error is complaining about
export function useI18n() {
  return useContext(I18nContext);
}
