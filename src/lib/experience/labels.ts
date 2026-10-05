import type { Locale, Settings } from "./types";
import { introductionLabels } from "./introduction";
import { dinnerPolicyLabels } from "./dinnerPolicy";
export const ui: Record<string, [string, string]> = {
  ...introductionLabels,
  ...dinnerPolicyLabels,
  navHome: ["Home", "Inicio"],
  navProposals: ["Proposal Packages", "Propuestas"],
  navDinners: ["Dinners & Celebrations", "Cenas y celebraciones"],
  navHow: ["How It Works", "Cómo funciona"],
  navFaq: ["FAQ", "FAQ"],
  planProposal: ["Plan your proposal", "Planea tu propuesta"],
  planCelebration: ["Plan your celebration", "Planea tu celebración"],
  fragranceSensitivity: [
    "Fragrance sensitivity — optional",
    "Sensibilidad a fragancias — opcional",
  ],
  occasionGuests: ["Occasion & guests", "Ocasión e invitados"],
  foodMenu: ["Food menu", "Menú de comida"],
  drinksWine: ["Drinks & wine", "Bebidas y vinos"],
  welcomeCocktail: ["Welcome cocktail", "Cóctel de bienvenida"],
  wineSelection: [
    "Wine selection · per experience",
    "Selección de vino · por experiencia",
  ],
  menusCompleted: ["menus completed", "menús completos"],
  chooseMenu: ["Choose menu", "Elige el menú"],
  menuSelected: ["Menu selected ✓", "Menú seleccionado ✓"],
  priceDetails: ["Price details", "Desglose del precio"],
  baseExperience: ["Base experience", "Experiencia base"],
  additionalGuests: ["Additional guests", "Invitados adicionales"],
  menuSupplements: ["Menu supplements", "Suplementos del menú"],
  drinkSupplements: ["Drink supplements", "Suplementos de bebidas"],
  extras: ["Extras", "Extras"],
  addGuest: ["Add guest", "Añadir invitado"],
  removeGuest: ["Remove guest", "Quitar invitado"],
  noExtras: ["No extras selected", "Sin extras seleccionados"],
  cocktails: ["cocktails", "cócteles"],
  cocktailHint: [
    "Choose each welcome cocktail in the guest menu.",
    "Elige cada cóctel de bienvenida en el menú del invitado.",
  ],
  completeHint: [
    "Complete each guest menu to check availability.",
    "Completa el menú de cada invitado para consultar disponibilidad.",
  ],
  capacityPending: [
    "Additional capacity awaiting confirmation.",
    "Capacidad adicional pendiente de confirmar.",
  ],
  vegan: ["Vegan", "Vegano"],
  vegetarian: ["Vegetarian", "Vegetariano"],
  proposalSectionTitle: ["Proposals", "Propuestas"],
  dinnerSectionTitle: [
    "Punta Cana Romantic Dinners",
    "Cenas románticas en Punta Cana",
  ],
  estimatedTotalLabel: ["Estimated total", "Total estimado"],
  availabilityButtonLabel: ["Check availability", "Consultar disponibilidad"],
  includedLabel: ["Included", "Incluido"],
  startingAtLabel: ["Starting at", "Desde"],
  selectStyleLabel: ["Choose your style", "Elige tu estilo"],
  addonsLabel: ["Add extras", "Añadir extras"],
  contactUsLabel: ["Contact us", "Contáctanos"],
  emptyProposals: ["No proposals available.", "No hay propuestas disponibles."],
  emptyDinners: [
    "No romantic dinners available.",
    "No hay cenas románticas disponibles.",
  ],
  fullName: ["Full name", "Nombre completo"],
  email: ["Email", "Correo electrónico"],
  phone: ["Phone / WhatsApp", "Teléfono / WhatsApp"],
  hotel: ["Hotel (optional)", "Hotel (opcional)"],
  desiredDate: ["Date (optional)", "Fecha (opcional)"],
  notes: ["Message", "Mensaje"],
  send: ["Send request", "Enviar solicitud"],
  success: ["Request received.", "Solicitud recibida."],
  error: [
    "Unable to send. Please try again or contact us directly.",
    "No se pudo enviar. Inténtalo de nuevo o contáctanos directamente.",
  ],
  guests: ["Guests", "Invitados"],
  guest: ["Guest", "Invitado"],
  occasion: ["Occasion", "Ocasión"],
  customOccasion: [
    "Custom occasion / message",
    "Ocasión personalizada / mensaje",
  ],
  starter: ["Starter", "Entrada"],
  main: ["Main", "Plato principal"],
  dessert: ["Dessert", "Postre"],
  beverages: ["Beverages", "Bebidas"],
  duration: ["Duration", "Duración"],
  minutes: ["minutes", "minutos"],
  quantity: ["Quantity", "Cantidad"],
  quotePending: [
    "Additional services pending quotation",
    "Servicios adicionales pendientes de cotización",
  ],
  select: ["Select", "Selecciona"],
  menu: ["Menu", "Menú"],
  previous: ["Previous photo", "Foto anterior"],
  next: ["Next photo", "Foto siguiente"],
  photo: ["Photo", "Foto"],
  selectPackage: ["Select package", "Seleccionar paquete"],
  selectedPackage: ["Package selected", "Paquete seleccionado"],
  blog: ["Blog", "Blog"],
  faq: ["Frequently asked questions", "Preguntas frecuentes"],
  previewOnly: [
    "Preview only · no request will be sent",
    "Solo vista previa · no se enviará ninguna solicitud",
  ],
  privacy: ["Privacy policy", "Política de privacidad"],
  terms: ["Terms of service", "Términos de servicio"],
  rightsReserved: ["All rights reserved.", "Todos los derechos reservados."],
  siteLinks: ["Site links", "Enlaces del sitio"],
  close: ["Close", "Cerrar"],
  introStepsHeading: [
    "Your experience, step by step",
    "Tu experiencia, paso a paso",
  ],
  priceToBeDefined: ["Price to be defined", "Precio por definir"],
  setupTemplate: ["Setup template", "Plantilla de montaje"],
  photoPending: [
    "Real photograph to be added in Sanity",
    "Fotografía real pendiente de cargar en Sanity",
  ],
  dinnerTemplatePreviewNote: [
    "Editable example · Three setups with reference images from Sanity. Menu and prices configured; final capacity awaiting confirmation.",
    "Ejemplo editable · Tres montajes con imágenes de referencia de Sanity. Menú y tarifas configurados; capacidad final pendiente de confirmar.",
  ],
  dinnerInquiryNote: [
    "Personalize your dinner and send us your preferred date. Our team will personally confirm capacity and availability for your celebration.",
    "Personaliza tu cena y envíanos tu fecha preferida. Nuestro equipo confirmará personalmente la capacidad y disponibilidad de tu celebración.",
  ],
  heroEyebrow: ["Extraordinary moments", "Momentos extraordinarios"],
  dinnerHeroText: [
    "By candlelight, beside the sea. A table to celebrate your way.",
    "A la luz de las velas, frente al mar. Una mesa para celebrar a tu manera.",
  ],
  proposalHeroText: [
    "An unforgettable setting for the beginning of your story. Every detail, chosen by you.",
    "Un escenario inolvidable para el comienzo de su historia. Cada detalle, elegido por ti.",
  ],
  dinnerHeroCta: ["Choose your setting", "Elige tu montaje"],
  proposalHeroCta: ["Explore the packages", "Descubre los paquetes"],
  heroHowItWorks: ["How it works", "Cómo funciona"],
  proposalDinnerEyebrow: [
    "A table for two · Three courses",
    "Una mesa para dos · Tres tiempos",
  ],
  proposalDinnerTitle: [
    "The perfect ending to your proposal",
    "El final perfecto para tu propuesta",
  ],
  proposalDinnerIntro: [
    "Choose a starter, main course and dessert for each guest.",
    "Elige una entrada, un plato principal y un postre para cada invitado.",
  ],
  dietaryLegend: ["V: vegetarian · Ve: vegan", "V: vegetariano · Ve: vegano"],
};
export function label(
  settings: Settings | null | undefined,
  locale: Locale,
  key: string,
) {
  const custom = settings?.[key];
  return (
    (typeof custom === "object" && custom?.[locale]) ||
    ui[key]?.[locale === "es" ? 1 : 0] ||
    ""
  );
}
