// ─── Bilingual UI strings ─────────────────────────────────────────────────────

export const faqUIContent = {
  en: {
    eyebrow: "FAQ",
    heading: "Questions",
    headingAccent: "Answered",
    subheading: "Everything you might be wondering before you reach out.",
    categories: {
      all: "All",
      booking: "Booking",
      packages: "Packages",
      logistics: "Logistics",
      photography: "Photography",
    },
    noQuestions: "No questions in this category.",
  },
  es: {
    eyebrow: "Preguntas",
    heading: "Todo lo que",
    headingAccent: "Necesitas Saber",
    subheading:
      "Respuestas a todo lo que podrías preguntarte antes de escribirnos.",
    categories: {
      all: "Todo",
      booking: "Reservas",
      packages: "Paquetes",
      logistics: "Logística",
      photography: "Fotografía",
    },
    noQuestions: "No hay preguntas en esta categoría.",
  },
} as const;

export type FAQLocale = keyof typeof faqUIContent;
