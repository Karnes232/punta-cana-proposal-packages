// ─── Sanity data shape ────────────────────────────────────────────────────────

export type FAQCategory = "booking" | "packages" | "logistics" | "photography";

export interface FAQItem {
  _id: string;
  question: { en: string; es: string };
  answer: { en: string; es: string };
  category: FAQCategory;
  order: number;
}

// ─── GROQ query ───────────────────────────────────────────────────────────────

export const faqQuery = /* groq */ `
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

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
  },
} as const;

export type FAQLocale = keyof typeof faqUIContent;

// ─── Placeholder FAQ items (replace with Sanity data in production) ───────────

export const placeholderFAQItems: FAQItem[] = [
  // ── Booking ────────────────────────────────────────────────────────────────
  {
    _id: "faq-booking-1",
    category: "booking",
    order: 1,
    question: {
      en: "How far in advance should I book?",
      es: "¿Con cuánta anticipación debo reservar?",
    },
    answer: {
      en: "We recommend booking at least 2–4 weeks in advance to guarantee your preferred date and setup. During peak season (December–April) we suggest booking 6–8 weeks ahead. That said, reach out even if your date is soon — we'll always do our best to accommodate you.",
      es: "Recomendamos reservar con al menos 2 a 4 semanas de anticipación para garantizar tu fecha y montaje preferidos. Durante la temporada alta (diciembre–abril) sugerimos reservar con 6 a 8 semanas de adelanto. Dicho esto, escríbenos aunque tu fecha esté cerca — siempre haremos lo posible por atenderte.",
    },
  },
  {
    _id: "faq-booking-2",
    category: "booking",
    order: 2,
    question: {
      en: "What is your cancellation and refund policy?",
      es: "¿Cuál es su política de cancelación y reembolso?",
    },
    answer: {
      en: "Cancellations made more than 14 days before your event are eligible for a full refund of the deposit. Cancellations within 14 days are non-refundable, but we can reschedule your date at no extra charge, subject to availability.",
      es: "Las cancelaciones realizadas con más de 14 días de anticipación son elegibles para un reembolso completo del depósito. Las cancelaciones dentro de los 14 días no son reembolsables, pero podemos reprogramar tu fecha sin costo adicional, sujeto a disponibilidad.",
    },
  },
  {
    _id: "faq-booking-3",
    category: "booking",
    order: 3,
    question: {
      en: "How do I pay and is it secure?",
      es: "¿Cómo pago y es seguro?",
    },
    answer: {
      en: "We accept payment via bank transfer, credit card, and PayPal. A deposit is required at the time of booking to secure your date, with the remaining balance due 7 days before the event. All transactions are processed securely and you'll receive a receipt for every payment.",
      es: "Aceptamos pagos por transferencia bancaria, tarjeta de crédito y PayPal. Se requiere un depósito al momento de reservar para asegurar tu fecha, y el saldo restante vence 7 días antes del evento. Todas las transacciones se procesan de forma segura y recibirás un comprobante por cada pago.",
    },
  },

  // ── Packages ───────────────────────────────────────────────────────────────
  {
    _id: "faq-packages-1",
    category: "packages",
    order: 1,
    question: {
      en: "Can I customize my package?",
      es: "¿Puedo personalizar mi paquete?",
    },
    answer: {
      en: "Absolutely. Every package can be personalized — from the flower selection and color palette to adding a musician, a custom sign with your partner's name, or a private chef dinner. Just let us know your ideas when you get in touch and we'll tailor everything to your vision.",
      es: "Por supuesto. Cada paquete se puede personalizar — desde la selección de flores y paleta de colores hasta añadir un músico, un letrero personalizado con el nombre de tu pareja o una cena privada con chef. Cuéntanos tus ideas cuando nos contactes y adaptaremos todo a tu visión.",
    },
  },
  {
    _id: "faq-packages-2",
    category: "packages",
    order: 2,
    question: {
      en: "What is the difference between Classic, Modern, and Dining packages?",
      es: "¿Cuál es la diferencia entre los paquetes Clásico, Moderno y de Cena?",
    },
    answer: {
      en: "Classic packages focus on timeless beach or garden setups with roses, candles, and elegant décor. Modern packages lean into contemporary aesthetics — clean lines, pampas grass, and minimalist styling. Dining packages center on a private candlelit dinner at a curated location, with the proposal woven into the dining experience.",
      es: "Los paquetes Clásicos se centran en montajes atemporales en la playa o jardín con rosas, velas y decoración elegante. Los paquetes Modernos apuestan por una estética contemporánea — líneas limpias, pampas y un estilo minimalista. Los paquetes de Cena se basan en una cena privada a la luz de las velas en un lugar seleccionado, con la propuesta integrada en la experiencia gastronómica.",
    },
  },
  {
    _id: "faq-packages-3",
    category: "packages",
    order: 3,
    question: {
      en: "Do your packages work for same-sex proposals?",
      es: "¿Sus paquetes funcionan para propuestas del mismo sexo?",
    },
    answer: {
      en: "Of course — all of our packages are designed for any couple. Love is love, and we are honored to help make your moment perfect regardless of who you're proposing to.",
      es: "Por supuesto — todos nuestros paquetes están diseñados para cualquier pareja. El amor es el amor, y nos honra ayudar a hacer tu momento perfecto sin importar a quién le propones.",
    },
  },

  // ── Logistics ──────────────────────────────────────────────────────────────
  {
    _id: "faq-logistics-1",
    category: "logistics",
    order: 1,
    question: {
      en: "What happens if it rains?",
      es: "¿Qué pasa si llueve?",
    },
    answer: {
      en: "We monitor the weather closely in the days leading up to your event. If rain is forecast, we'll work with you to reschedule to the next available date at no extra cost, or offer an indoor setup alternative depending on your package. Your moment will happen — rain or shine.",
      es: "Monitoreamos el clima de cerca en los días previos a tu evento. Si se pronostica lluvia, coordinaremos contigo para reprogramar a la próxima fecha disponible sin costo adicional, o te ofreceremos una alternativa de montaje en interiores según tu paquete. Tu momento ocurrirá — llueva o haga sol.",
    },
  },
  {
    _id: "faq-logistics-2",
    category: "logistics",
    order: 2,
    question: {
      en: "Do I need to be staying at a specific resort?",
      es: "¿Necesito estar hospedado en un resort específico?",
    },
    answer: {
      en: "No. We work at a wide range of locations across Punta Cana — beaches, private villas, resort gardens, and more. When you book, tell us where you're staying and we'll confirm the best setup location nearby or arrange access to a curated private spot.",
      es: "No. Trabajamos en una amplia variedad de locaciones en Punta Cana — playas, villas privadas, jardines de resorts y más. Al reservar, dinos dónde te hospedas y confirmaremos la mejor locación de montaje cercana o gestionaremos el acceso a un lugar privado seleccionado.",
    },
  },
  {
    _id: "faq-logistics-3",
    category: "logistics",
    order: 3,
    question: {
      en: "How do I keep it a surprise?",
      es: "¿Cómo lo mantengo como sorpresa?",
    },
    answer: {
      en: "We're experts at this. Once booked, we'll coordinate everything discreetly with you through a separate communication channel. We'll help you plan a believable cover story to get your partner to the location at the right moment — without any suspicion.",
      es: "Somos expertos en esto. Una vez que reserves, coordinaremos todo contigo de forma discreta a través de un canal de comunicación separado. Te ayudaremos a planificar una coartada creíble para llevar a tu pareja a la locación en el momento justo — sin levantar sospechas.",
    },
  },

  // ── Photography ────────────────────────────────────────────────────────────
  {
    _id: "faq-photography-1",
    category: "photography",
    order: 1,
    question: {
      en: "Is a photographer included in all packages?",
      es: "¿Todos los paquetes incluyen fotógrafo?",
    },
    answer: {
      en: "Yes — all packages include a professional photographer positioned discreetly on-site before you arrive. They'll capture the full proposal from the moment you get down on one knee through the first embraces. You won't even know they're there.",
      es: "Sí — todos los paquetes incluyen un fotógrafo profesional ubicado discretamente en el lugar antes de que llegues. Captará la propuesta completa desde el momento en que te arrodillas hasta los primeros abrazos. Ni siquiera sabrás que está ahí.",
    },
  },
  {
    _id: "faq-photography-2",
    category: "photography",
    order: 2,
    question: {
      en: "When will I receive my photos and video?",
      es: "¿Cuándo recibiré mis fotos y video?",
    },
    answer: {
      en: "Edited photos are delivered within 5–7 business days via a private online gallery. If your package includes a highlight video, delivery is within 10–14 business days. Rush delivery is available upon request for an additional fee.",
      es: "Las fotos editadas se entregan en un plazo de 5 a 7 días hábiles a través de una galería privada en línea. Si tu paquete incluye un video destacado, la entrega es en 10 a 14 días hábiles. La entrega urgente está disponible bajo solicitud con un costo adicional.",
    },
  },
  {
    _id: "faq-photography-3",
    category: "photography",
    order: 3,
    question: {
      en: "Can I upgrade to add video coverage?",
      es: "¿Puedo hacer un upgrade para agregar cobertura de video?",
    },
    answer: {
      en: "Yes. Video coverage can be added to any package as an upgrade. Options range from a short 60-second highlight reel to a full cinematic short film of your proposal moment. Ask about video add-ons when you get in touch.",
      es: "Sí. La cobertura de video se puede agregar a cualquier paquete como upgrade. Las opciones van desde un breve reel de 60 segundos hasta un cortometraje cinematográfico completo de tu momento de propuesta. Pregunta sobre los complementos de video cuando nos contactes.",
    },
  },
];
