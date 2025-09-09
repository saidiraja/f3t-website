// server/seed.js
import 'dotenv/config';
import { initDB, db, ensureAdminSeed, nextId } from './db.js';

async function run() {
  await initDB();

  // 1) Admin user (from .env)
  await ensureAdminSeed({
    email: process.env.ADMIN_EMAIL || 'admin@f3t.tn',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  });

  // 2) Home
  db.data.home = {
    id: 1,
    title_fr: 'F3T – Excellence dans le traitement thermique et de surface',
    title_en: 'F3T – Excellence in Heat and Surface Treatment',
    intro_fr:
      "Fondée en 1990, la Fraternité Tunisienne de Traitement Thermique (F3T) est le leader et la référence nationale en matière de traitement thermique et de surface. Nous servons des secteurs exigeants tels que l’automobile, l’aéronautique, les machines lourdes et la fabrication d’outils.\nForts de plus de trois décennies d’expérience, d’équipements à la pointe de la technologie et d’une équipe hautement qualifiée, nous garantissons des résultats optimaux qui améliorent la durabilité, la performance et la fiabilité de vos pièces.\nAujourd’hui, F3T renforce son leadership national tout en développant sa présence sur les marchés internationaux.",
    intro_en:
      "Founded in 1990, Fraternité Tunisienne de Traitement Thermique (F3T) is Tunisia’s market leader and the national reference in heat and surface treatment services. We serve demanding sectors such as automotive, aerospace, heavy machinery, and toolmaking.\nWith over three decades of expertise, state-of-the-art equipment, and a highly skilled team, we deliver optimal results that enhance the durability, performance, and reliability of your components.\nToday, F3T is strengthening its national leadership while expanding into international markets.",
    updated_at: new Date().toISOString(),
  };

  // 3) About
  db.data.about = {
    id: 1,
    mission_fr:
      "Offrir des solutions de traitement thermique et de surface fiables, précises et innovantes, conformes aux normes les plus strictes, tout en construisant des partenariats durables avec nos clients.",
    mission_en:
      "To deliver reliable, precise, and innovative heat and surface treatment solutions that meet the highest standards while building long-term partnerships with our clients.",
    vision_fr:
      "Être et rester la référence du traitement thermique en Tunisie, leader du marché national, et développer notre présence à l’international.",
    vision_en:
      "To remain the reference in heat treatment services in Tunisia, lead the national market, and expand our presence internationally.",
    values_fr: "Qualité • Innovation • Fiabilité • Engagement client",
    values_en: "Quality • Innovation • Reliability • Client Commitment",
    updated_at: new Date().toISOString(),
  };

  // 4) Services (units + items)
  db.data.services = [
    // Vacuum Heat Treatment Unit
    {
      id: nextId('services'),
      unit: 'Vacuum Heat Treatment Unit',
      name_fr: "Trempe des aciers à outils, aciers rapides, aciers de construction moyennement alliés",
      name_en: "Hardening of tool steels, high-speed steels, and medium-alloy structural steels",
      description_fr: "",
      description_en: "",
    },
    {
      id: nextId('services'),
      unit: 'Vacuum Heat Treatment Unit',
      name_fr: "Mise en solution des superalliages",
      name_en: "Solution treatment of superalloys",
      description_fr: "",
      description_en: "",
    },
    {
      id: nextId('services'),
      unit: 'Vacuum Heat Treatment Unit',
      name_fr: "Traitement des alliages à durcissement structural",
      name_en: "Structural hardening alloys treatment",
      description_fr: "",
      description_en: "",
    },
    {
      id: nextId('services'),
      unit: 'Vacuum Heat Treatment Unit',
      name_fr: "Recuits, revenus, brasage",
      name_en: "Annealing, tempering, brazing",
      description_fr: "",
      description_en: "",
    },

    // Atmosphere Heat Treatment Unit
    { id: nextId('services'), unit: 'Atmosphere Heat Treatment Unit', name_fr: "Trempe à l’huile", name_en: "Oil quenching", description_fr: "", description_en: "" },
    { id: nextId('services'), unit: 'Atmosphere Heat Treatment Unit', name_fr: "Cémentation", name_en: "Carburizing", description_fr: "", description_en: "" },
    { id: nextId('services'), unit: 'Atmosphere Heat Treatment Unit', name_fr: "Carbonitruration", name_en: "Carbonitriding", description_fr: "", description_en: "" },
    { id: nextId('services'), unit: 'Atmosphere Heat Treatment Unit', name_fr: "Recuit", name_en: "Annealing", description_fr: "", description_en: "" },
    { id: nextId('services'), unit: 'Atmosphere Heat Treatment Unit', name_fr: "Revenu", name_en: "Tempering", description_fr: "", description_en: "" },

    // Gas Nitriding Unit
    { id: nextId('services'), unit: 'Gas Nitriding Unit', name_fr: "Nitruration gazeuse", name_en: "Gas nitriding", description_fr: "", description_en: "" },
    { id: nextId('services'), unit: 'Gas Nitriding Unit', name_fr: "Revenu", name_en: "Tempering", description_fr: "", description_en: "" },

    // Induction
    { id: nextId('services'), unit: 'Induction Heat Treatment Unit', name_fr: "Trempe localisée pour travail de série", name_en: "Localized hardening for series production", description_fr: "", description_en: "" },

    // Cleaning
    { id: nextId('services'), unit: 'Cleaning Unit', name_fr: "Dégraissage à l’huile et au solvant", name_en: "Oil and solvent degreasing", description_fr: "", description_en: "" },

    // Zinc plating
    {
      id: nextId('services'),
      unit: 'Alkaline Electrolytic Zinc Plating Unit',
      name_fr: "Zingage finition blanc, jaune, noir avec passivation et finition finigard",
      name_en: "Zinc plating with white, yellow, black finish; passivation + Finigard",
      description_fr: "",
      description_en: "",
    },

    // Hot Bluing
    { id: nextId('services'), unit: 'Hot Bluing Unit', name_fr: "Pour aciers à très faible % de Cr", name_en: "For steels with very low % Cr", description_fr: "", description_en: "" },
  ];

  // 5) Industries
  db.data.industries = [
    { id: 1, name_fr: "Automobile", name_en: "Automotive", description_fr: "Amélioration de la résistance à l’usure et de la durabilité des composants.", description_en: "Enhanced wear resistance and durability of components.", image_url: "" },
    { id: 2, name_fr: "Aéronautique", name_en: "Aerospace", description_fr: "Respect des exigences de performance et de sécurité les plus strictes.", description_en: "Meeting the highest performance and safety standards.", image_url: "" },
    { id: 3, name_fr: "Machines lourdes", name_en: "Heavy Machinery", description_fr: "Traitement de grandes pièces pour une résistance maximale.", description_en: "Treating large components for maximum strength.", image_url: "" },
    { id: 4, name_fr: "Fabrication d’outils", name_en: "Toolmaking", description_fr: "Durcissement et précision pour prolonger la durée de vie des outils.", description_en: "Hardening and precision to extend tool lifespan.", image_url: "" },
  ];

  // 6) Certifications
  db.data.certifications = [
    { id: 1, name: "ISO 9001" },
  ];

  // 7) Clients (you can replace logos later via Admin)
  db.data.clients = [
    { id: 1, name: "SIM Ben Arous", logo_url: "" },
    { id: 2, name: "SOPEM", logo_url: "" },
    { id: 3, name: "Defontaine", logo_url: "" },
    { id: 4, name: "Decotools", logo_url: "" },
    { id: 5, name: "MISFAT", logo_url: "" },
  ];

  // 8) News (example post)
  db.data.news = [
    {
      id: 1,
      title_fr: "Nouvelle ligne de traitement mise en service",
      title_en: "New treatment line commissioned",
      body_fr: "F3T renforce sa capacité avec une nouvelle ligne de traitement, pour plus de performance et de qualité.",
      body_en: "F3T boosts capacity with a new treatment line, enhancing performance and quality.",
      image_url: "",
      created_at: new Date().toISOString(),
    },
  ];

  await db.write();
  console.log("✅ Seed complete.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
