import type { DefaultText, Locale, Settings } from "./types";
import { introductionLabels } from "./introduction";
import { dinnerPolicyLabels } from "./dinnerPolicy";
export const ui: Record<string, DefaultText> = {
  ...introductionLabels,
  ...dinnerPolicyLabels,
  navHome: { en: "Home", es: "Inicio" },
  navProposals: { en: "Proposal Packages", es: "Propuestas" },
  navDinners: { en: "Dinners & Celebrations", es: "Cenas y celebraciones" },
  navHow: { en: "How It Works", es: "Cómo funciona" },
  navFaq: { en: "FAQ", es: "FAQ" },
  planProposal: { en: "Plan your proposal", es: "Planea tu propuesta" },
  planCelebration: { en: "Plan your celebration", es: "Planea tu celebración" },
  fragranceSensitivity: {
    en: "Fragrance sensitivity — optional",
    es: "Sensibilidad a fragancias — opcional",
  },
  occasionGuests: { en: "Occasion & guests", es: "Ocasión e invitados" },
  foodMenu: { en: "Food menu", es: "Menú de comida" },
  drinksWine: { en: "Drinks & wine", es: "Bebidas y vinos" },
  welcomeCocktail: { en: "Welcome cocktail", es: "Cóctel de bienvenida" },
  wineSelection: {
    en: "Wine selection · per experience",
    es: "Selección de vino · por experiencia",
  },
  menusCompleted: { en: "menus completed", es: "menús completos" },
  chooseMenu: { en: "Choose menu", es: "Elige el menú" },
  menuSelected: { en: "Menu selected ✓", es: "Menú seleccionado ✓" },
  priceDetails: { en: "Price details", es: "Desglose del precio" },
  baseExperience: { en: "Base experience", es: "Experiencia base" },
  additionalGuests: { en: "Additional guests", es: "Invitados adicionales" },
  menuSupplements: { en: "Menu supplements", es: "Suplementos del menú" },
  drinkSupplements: { en: "Drink supplements", es: "Suplementos de bebidas" },
  extras: { en: "Extras", es: "Extras" },
  addGuest: { en: "Add guest", es: "Añadir invitado" },
  removeGuest: { en: "Remove guest", es: "Quitar invitado" },
  noExtras: { en: "No extras selected", es: "Sin extras seleccionados" },
  cocktails: { en: "cocktails", es: "cócteles" },
  cocktailHint: {
    en: "Choose each welcome cocktail in the guest menu.",
    es: "Elige cada cóctel de bienvenida en el menú del invitado.",
  },
  completeHint: {
    en: "Complete each guest menu to check availability.",
    es: "Completa el menú de cada invitado para consultar disponibilidad.",
  },
  capacityPending: {
    en: "Additional capacity awaiting confirmation.",
    es: "Capacidad adicional pendiente de confirmar.",
  },
  vegan: { en: "Vegan", es: "Vegano" },
  vegetarian: { en: "Vegetarian", es: "Vegetariano" },
  proposalSectionTitle: { en: "Proposals", es: "Propuestas" },
  dinnerSectionTitle: {
    en: "Punta Cana Romantic Dinners",
    es: "Cenas románticas en Punta Cana",
  },
  estimatedTotalLabel: { en: "Estimated total", es: "Total estimado" },
  availabilityButtonLabel: {
    en: "Check availability",
    es: "Consultar disponibilidad",
  },
  includedLabel: { en: "Included", es: "Incluido" },
  startingAtLabel: { en: "Starting at", es: "Desde" },
  selectStyleLabel: { en: "Choose your style", es: "Elige tu estilo" },
  addonsLabel: { en: "Add extras", es: "Añadir extras" },
  contactUsLabel: { en: "Contact us", es: "Contáctanos" },
  emptyProposals: {
    en: "No proposals available.",
    es: "No hay propuestas disponibles.",
  },
  emptyDinners: {
    en: "No romantic dinners available.",
    es: "No hay cenas románticas disponibles.",
  },
  fullName: { en: "Full name", es: "Nombre completo" },
  email: { en: "Email", es: "Correo electrónico" },
  phone: { en: "Phone / WhatsApp", es: "Teléfono / WhatsApp" },
  hotel: { en: "Hotel (optional)", es: "Hotel (opcional)" },
  desiredDate: { en: "Date (optional)", es: "Fecha (opcional)" },
  notes: { en: "Message", es: "Mensaje" },
  send: { en: "Send request", es: "Enviar solicitud" },
  success: { en: "Request received.", es: "Solicitud recibida." },
  error: {
    en: "Unable to send. Please try again or contact us directly.",
    es: "No se pudo enviar. Inténtalo de nuevo o contáctanos directamente.",
  },
  guests: { en: "Guests", es: "Invitados" },
  guest: { en: "Guest", es: "Invitado" },
  occasion: { en: "Occasion", es: "Ocasión" },
  customOccasion: {
    en: "Custom occasion / message",
    es: "Ocasión personalizada / mensaje",
  },
  starter: { en: "Starter", es: "Entrada" },
  main: { en: "Main", es: "Plato principal" },
  dessert: { en: "Dessert", es: "Postre" },
  beverages: { en: "Beverages", es: "Bebidas" },
  duration: { en: "Duration", es: "Duración" },
  minutes: { en: "minutes", es: "minutos" },
  quantity: { en: "Quantity", es: "Cantidad" },
  quotePending: {
    en: "Additional services pending quotation",
    es: "Servicios adicionales pendientes de cotización",
  },
  select: { en: "Select", es: "Selecciona" },
  menu: { en: "Menu", es: "Menú" },
  previous: { en: "Previous photo", es: "Foto anterior" },
  next: { en: "Next photo", es: "Foto siguiente" },
  photo: { en: "Photo", es: "Foto" },
  selectPackage: { en: "Select package", es: "Seleccionar paquete" },
  selectedPackage: { en: "Package selected", es: "Paquete seleccionado" },
  blog: { en: "Blog", es: "Blog" },
  faq: { en: "Frequently asked questions", es: "Preguntas frecuentes" },
  previewOnly: {
    en: "Preview only · no request will be sent",
    es: "Solo vista previa · no se enviará ninguna solicitud",
  },
  privacy: { en: "Privacy policy", es: "Política de privacidad" },
  terms: { en: "Terms of service", es: "Términos de servicio" },
  rightsReserved: {
    en: "All rights reserved.",
    es: "Todos los derechos reservados.",
  },
  siteLinks: { en: "Site links", es: "Enlaces del sitio" },
  close: { en: "Close", es: "Cerrar" },
  introStepsHeading: {
    en: "Your experience, step by step",
    es: "Tu experiencia, paso a paso",
  },
  priceToBeDefined: { en: "Price to be defined", es: "Precio por definir" },
  setupTemplate: { en: "Setup template", es: "Plantilla de montaje" },
  photoPending: {
    en: "Real photograph to be added in Sanity",
    es: "Fotografía real pendiente de cargar en Sanity",
  },
  dinnerTemplatePreviewNote: {
    en: "Editable example · Three setups with reference images from Sanity. Menu and prices configured; final capacity awaiting confirmation.",
    es: "Ejemplo editable · Tres montajes con imágenes de referencia de Sanity. Menú y tarifas configurados; capacidad final pendiente de confirmar.",
  },
  dinnerInquiryNote: {
    en: "Personalize your dinner and send us your preferred date. Our team will personally confirm capacity and availability for your celebration.",
    es: "Personaliza tu cena y envíanos tu fecha preferida. Nuestro equipo confirmará personalmente la capacidad y disponibilidad de tu celebración.",
  },
  heroEyebrow: { en: "Extraordinary moments", es: "Momentos extraordinarios" },
  dinnerHeroText: {
    en: "By candlelight, beside the sea. A table to celebrate your way.",
    es: "A la luz de las velas, frente al mar. Una mesa para celebrar a tu manera.",
  },
  proposalHeroText: {
    en: "An unforgettable setting for the beginning of your story. Every detail, chosen by you.",
    es: "Un escenario inolvidable para el comienzo de su historia. Cada detalle, elegido por ti.",
  },
  dinnerHeroCta: { en: "Choose your setting", es: "Elige tu montaje" },
  proposalHeroCta: { en: "Explore the packages", es: "Descubre los paquetes" },
  heroHowItWorks: { en: "How it works", es: "Cómo funciona" },
  proposalDinnerEyebrow: {
    en: "A table for two · Three courses",
    es: "Una mesa para dos · Tres tiempos",
  },
  proposalDinnerTitle: {
    en: "The perfect ending to your proposal",
    es: "El final perfecto para tu propuesta",
  },
  proposalDinnerIntro: {
    en: "Choose a starter, main course and dessert for each guest.",
    es: "Elige una entrada, un plato principal y un postre para cada invitado.",
  },
  dietaryLegend: {
    en: "V: vegetarian · Ve: vegan",
    es: "V: vegetariano · Ve: vegano",
  },
};
export function label(
  settings: Settings | null | undefined,
  locale: Locale,
  key: string,
) {
  const edited = settings?.[key];
  // The editor's text (settings are one document per language), then the
  // built-in text in `locale`, then in English.
  return (
    (typeof edited === "string" && edited) ||
    ui[key]?.[locale] ||
    ui[key]?.en ||
    ""
  );
}
