// ─── Form field state ─────────────────────────────────────────────────────────

export interface ContactFormState {
  name: string;
  email: string;
  package: string;
  date: string;
  time: string;
  message: string;
}

export const EMPTY_FORM: ContactFormState = {
  name: "",
  email: "",
  package: "",
  date: "",
  time: "",
  message: "",
};

// ─── Package options ──────────────────────────────────────────────────────────

export interface PackageOption {
  value: string;
  labelEn: string;
  labelEs: string;
}

export const PACKAGE_OPTIONS: PackageOption[] = [
  {
    value: "classic",
    labelEn: "Classic Proposal",
    labelEs: "Propuesta Clásica",
  },
  { value: "modern", labelEn: "Modern Proposal", labelEs: "Propuesta Moderna" },
  {
    value: "dining",
    labelEn: "Dining Proposal",
    labelEs: "Propuesta Gastronómica",
  },
  { value: "not-sure", labelEn: "Not sure yet", labelEs: "Aún no lo sé" },
];

// ─── Preferred time options ───────────────────────────────────────────────────

export interface TimeOption {
  value: string;
  labelEn: string;
  labelEs: string;
}

export const TIME_OPTIONS: TimeOption[] = [
  {
    value: "morning",
    labelEn: "Morning (8am – 12pm)",
    labelEs: "Mañana (8am – 12pm)",
  },
  {
    value: "afternoon",
    labelEn: "Afternoon (12pm – 5pm)",
    labelEs: "Tarde (12pm – 5pm)",
  },
  {
    value: "evening",
    labelEn: "Evening (5pm – 9pm)",
    labelEs: "Noche (5pm – 9pm)",
  },
  { value: "flexible", labelEn: "Flexible", labelEs: "Flexible" },
];

// ─── Bilingual UI labels ──────────────────────────────────────────────────────

export const CONTACT_LABELS = {
  en: {
    // Form section
    formEyebrow: "Send a Message",
    formHeading: "Tell Us About Your Vision",
    namePlaceholder: "Your name",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    emailPlaceholder: "your@email.com",
    packageLabel: "Preferred Package",
    packageDefault: "Select a package",
    dateLabel: "Proposal Date",
    timeLabel: "Preferred Time",
    timeDefault: "Select a time",
    messageLabel: "Your Message",
    messagePlaceholder:
      "Tell us about your vision — the setting, the style, any details that matter to you...",
    submitLabel: "Send Message",
    submitting: "Sending...",
    // Success state
    successHeading: "Message Received",
    successBody:
      "Thank you for reaching out. We'll be in touch within 24 hours to begin planning your perfect moment.",
    successCta: "Back to home",
    // Direct contact section
    contactEyebrow: "Prefer to reach us directly?",
    whatsappLabel: "WhatsApp",
    whatsappSub: "Chat with us instantly",
    emailContactLabel: "Email",
    emailContactSub: "We reply within 24 hours",
    // Location
    locationLabel: "Our Location",
    locationCity: "Punta Cana, Dominican Republic",
    locationDetail:
      "We operate across premium locations in the Punta Cana & Bávaro area. Your exact venue is confirmed during consultation.",
    mapsLink: "View on Google Maps",
  },
  es: {
    formEyebrow: "Envíanos un Mensaje",
    formHeading: "Cuéntanos Tu Visión",
    namePlaceholder: "Tu nombre",
    nameLabel: "Nombre Completo",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "tu@correo.com",
    packageLabel: "Paquete de Preferencia",
    packageDefault: "Selecciona un paquete",
    dateLabel: "Fecha de la Propuesta",
    timeLabel: "Hora Preferida",
    timeDefault: "Selecciona una hora",
    messageLabel: "Tu Mensaje",
    messagePlaceholder:
      "Cuéntanos tu visión — el lugar, el estilo, cualquier detalle que importa...",
    submitLabel: "Enviar Mensaje",
    submitting: "Enviando...",
    successHeading: "Mensaje Recibido",
    successBody:
      "Gracias por contactarnos. Te responderemos en menos de 24 horas para comenzar a planificar tu momento perfecto.",
    successCta: "Volver al inicio",
    contactEyebrow: "¿Prefieres contactarnos directamente?",
    whatsappLabel: "WhatsApp",
    whatsappSub: "Chatea con nosotros al instante",
    emailContactLabel: "Correo",
    emailContactSub: "Respondemos en menos de 24 horas",
    locationLabel: "Nuestra Ubicación",
    locationCity: "Punta Cana, República Dominicana",
    locationDetail:
      "Operamos en múltiples ubicaciones premium en la zona de Punta Cana y Bávaro. El lugar exacto se confirma durante la consulta.",
    mapsLink: "Ver en Google Maps",
  },
} as const;

export type ContactLabels =
  (typeof CONTACT_LABELS)[keyof typeof CONTACT_LABELS];
