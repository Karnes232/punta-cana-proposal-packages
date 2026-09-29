import type { Locale, Settings } from "./types";
export const ui: Record<string, [string, string]> = {
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
  privacy: ["Privacy policy", "Política de privacidad"],
  terms: ["Terms of service", "Términos de servicio"],
};
export function label(
  settings: Settings | null | undefined,
  locale: Locale,
  key: string,
) {
  return settings?.[key]?.[locale] || ui[key]?.[locale === "es" ? 1 : 0] || "";
}
