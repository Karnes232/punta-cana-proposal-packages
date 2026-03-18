// ─── Content ──────────────────────────────────────────────────────────────────

export const howItWorksCTAContent = {
  en: {
    eyebrow: "Start Today",
    scriptLine: "Your moment is waiting",
    heading: "Ready to Plan the",
    headingAccent: "Perfect Proposal?",
    subheading:
      "Tell us your vision and we'll handle every detail. Private, professional, and completely unforgettable.",
    primaryCTA: "Book Now",
    primaryHref: "/contact",
    secondaryCTA: "Browse Packages",
    secondaryHref: "/classic-proposals",
  },
  es: {
    eyebrow: "Empieza Hoy",
    scriptLine: "Tu momento te espera",
    heading: "¿Listo para Planear la",
    headingAccent: "Propuesta Perfecta?",
    subheading:
      "Cuéntanos tu visión y nosotros nos encargamos de cada detalle. Privado, profesional e inolvidable.",
    primaryCTA: "Reservar Ahora",
    primaryHref: "/contact",
    secondaryCTA: "Ver Paquetes",
    secondaryHref: "/classic-proposals",
  },
} as const;

export type HowItWorksCTALocale = keyof typeof howItWorksCTAContent;
