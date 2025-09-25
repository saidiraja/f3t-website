export function pickLang(lang, fr, en) {
  return lang === 'fr'
    ? (fr && fr.trim()) || en || ''
    : (en && en.trim()) || fr || '';
}
