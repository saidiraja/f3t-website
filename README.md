# F3T – Excellence in Heat & Surface Treatment

Bilingual (FR/EN) corporate website for **Fraternité Tunisienne de Traitement Thermique (F3T)**, built with Vite + React.  
This project was developed and polished to meet **INT102** internship requirements: clean code, i18n, accessibility, SEO, and deployability.

## Live Demo
<!-- Add your link after deployment -->
**Demo:** https://<your-domain-or-gh-pages-link>

---

## ✨ Features

- **Bilingual** (French default, English): global language switch
- **Pages:** Home, About, Services, Industries, Certifications, Clients, Contact (+ 404)
- **Global background** with frosted glass cards
- **SEO** per page via `<SEO />` component (title, meta)
- **JSON-LD** Organization schema on Contact
- **Accessibility basics:** focus styles, alt text, keyboard-navigable dialog for FAQ chatbot
- **Animations:** AOS + Framer Motion (lightweight, graceful)
- **UI helpers:** Floating WhatsApp (bottom-left), Chatbot/FAQ (bottom-right), Scroll-to-top
- **Responsive** layout with modern CSS

---

## 🧩 Tech Stack

- **Frontend:** React 18, Vite
- **Routing:** react-router-dom
- **Animations:** framer-motion, AOS
- **Icons:** Font Awesome
- **State/i18n:** simple React context hook (`useI18n`)
- **Tooling:** ESLint (via Vite), npm scripts

---

## 📁 Project Structure

f3t-website/ 
├─ public/ 
│ ├─ bg-metal.jpg
│ ├─ logos/
│ │ ├─ sim.png
│ │ ├─ sopem.png
│ │ ├─ defontaine.png
│ │ ├─ decotools.png
│ │ └─ misfat.png
│ ├─ industry-automotive.jpg
│ ├─ industry-aerospace.jpg
│ ├─ industry-heavy.jpg
│ └─ industry-tools.jpg
├─ src/
│ ├─ components/
│ │ ├─ Navbar.jsx
│ │ ├─ Footer.jsx
│ │ ├─ SEO.jsx
│ │ ├─ SiteBackground.jsx
│ │ ├─ LangSwitch.jsx
│ │ ├─ Chatbot.jsx
│ │ ├─ Chatbot.css
│ │ ├─ ScrollToTop.jsx
│ │ ├─ ScrollToTopButton.jsx
│ │ ├─ WhatsAppButton.jsx
│ │ └─ ErrorBoundary.jsx
│ ├─ i18n/
│ │ └─ useI18n.jsx
│ ├─ pages/
│ │ ├─ Home.jsx
│ │ ├─ About.jsx
│ │ ├─ Services.jsx
│ │ ├─ Industries.jsx
│ │ ├─ Certifications.jsx
│ │ ├─ Clients.jsx
│ │ ├─ Contact.jsx
│ │ └─ NotFound.jsx
│ ├─ App.jsx
│ ├─ main.jsx
│ └─ index.css
├─ .gitignore
├─ index.html
├─ package.json
└─ vite.config.js


> **Removed** legacy files: `LanguageContext.jsx`, `useLanguage.jsx`, `LanguageToggle.jsx`.

---

## 🚀 Getting Started

```bash
# install deps
npm install

# dev server
npm run dev

# build for production
npm run build

# preview build locally
npm run preview

🔤 Internationalization

src/i18n/useI18n.jsx provides a tiny context with lang and setLang.

LangSwitch.jsx toggles FR/EN in the Navbar.

Pages read const { lang } = useI18n() and branch strings per language.

🔎 SEO & Schema

Each page includes <SEO title="..." description="..." /> with correct language strings.

Contact page injects Organization JSON-LD (schema.org) with address, phone, email.

404 page sets noindex, nofollow while mounted.

♿ Accessibility Notes

Focusable elements have visible focus rings.

Chatbot dialog is keyboard-trappable and closes with Esc.

All images include meaningful alt text (logos/industries).

🖼️ Assets (must exist in /public)

Global:

/bg-metal.jpg (background)

/Nlogo.png (logo in Navbar/Footer)

Industries:

/industry-automotive.jpg

/industry-aerospace.jpg

/industry-heavy.jpg

/industry-tools.jpg

Clients:

/logos/sim.png

/logos/sopem.png

/logos/defontaine.png

/logos/decotools.png

/logos/misfat.png

(Placeholders are fine during development.)