import useLanguage from "./useLanguage";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button className="toggle-btn" onClick={toggleLanguage}>
      {language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
    </button>
  );
}
