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
  fr: {
    eyebrow: "Questions",
    heading: "Tout ce qu’il",
    headingAccent: "faut savoir",
    subheading:
      "Toutes les réponses aux questions que vous pourriez vous poser avant de nous écrire.",
    categories: {
      all: "Tout",
      booking: "Réservation",
      packages: "Forfaits",
      logistics: "Logistique",
      photography: "Photographie",
    },
    noQuestions: "Aucune question dans cette catégorie.",
  },
  pt: {
    eyebrow: "Perguntas",
    heading: "Tudo o que",
    headingAccent: "Você Precisa Saber",
    subheading:
      "Respostas para tudo o que você pode estar se perguntando antes de falar com a gente.",
    categories: {
      all: "Todas",
      booking: "Reservas",
      packages: "Pacotes",
      logistics: "Logística",
      photography: "Fotografia",
    },
    noQuestions: "Não há perguntas nesta categoria.",
  },
} as const;

export type FAQLocale = keyof typeof faqUIContent;
