// src/components/LangSwitch.jsx
import { useI18n } from "../i18n/useI18n";

export default function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      className="px-3 py-1 rounded-md border"
      aria-label="Toggle language"
    >
      {lang === "fr" ? "EN" : "FR"}
    </button>
  );
}
