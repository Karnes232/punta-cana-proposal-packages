import type { Experience, Course } from "./types";
const l = (en: string, es: string) => ({ en, es });
export { DINNER_TEMPLATE_ID as dinnerTemplateId } from "@/sanity/constants";
const courseNames: Record<Course, [string, string]> = {
  starter: ["Starter", "Entrada"],
  main: ["Main course", "Plato principal"],
  dessert: ["Dessert", "Postre"],
};
export const templateMenus = (Object.keys(courseNames) as Course[]).flatMap(
  (course) =>
    ["A", "B"].map((option, index) => ({
      _id: "dinner-template-" + course + "-" + option.toLowerCase(),
      _type: "menuItem",
      name: l(
        courseNames[course][0] + " " + option + " — dish to be defined",
        courseNames[course][1] + " " + option + " — plato por definir",
      ),
      courseType: course,
      included: true,
      active: false,
      displayOrder: index,
      internalNotes:
        "Template slot. Replace with a real approved dish before activation.",
    })),
);
export const templateAddons = [
  ["roses", "Rose bouquets", "Ramos de rosas"],
  ["sparkling", "Premium sparkling wines", "Vinos espumantes premium"],
  ["chocolates", "Chocolates", "Chocolates"],
  ["neon", "Neon sign — Happy Anniversary", "Letrero neón — Happy Anniversary"],
].map(([key, en, es], index) => ({
  _id: "dinner-template-addon-" + key,
  _type: "experienceAddon",
  internalTitle: "Dinner template — " + key,
  name: l(en, es),
  pricingType: "quoteOnly" as const,
  applicableTo: ["romanticDinner" as const],
  active: false,
  displayOrder: index,
  minimumQuantity: 1,
  internalNotes:
    "User-requested option. Confirm availability, variants and price before activation.",
}));
export const templateStyles = [1, 2, 3].map((n) => ({
  _key: "setup-" + n,
  _type: "dinnerStyle",
  name: l("Basic setup " + n, "Montaje básico " + n),
  description: l(
    "Replace this template slot with the real setup name, description and photograph.",
    "Completar con el nombre, descripción y fotografía del montaje real.",
  ),
  active: false,
  displayOrder: n,
}));
export const templateInclusions = [
  {
    _key: "transport",
    _type: "experienceInclusion",
    name: l(
      "Transportation included throughout Punta Cana",
      "Transporte incluido desde toda Punta Cana",
    ),
    active: true,
    displayOrder: 0,
  },
  {
    _key: "three-courses",
    _type: "experienceInclusion",
    name: l(
      "Three-course dinner · individual menu selection",
      "Cena de tres tiempos · menú a elección por persona",
    ),
    active: true,
    displayOrder: 1,
  },
];
export const dinnerTemplateFields = {
  internalTitle: "Plantilla de cena — completar antes de publicar",
  name: l("Punta Cana Romantic Dinner", "Cena romántica en Punta Cana"),
  shortDescription: l(
    "Three basic setups, a three-course menu selected for each guest, transportation throughout Punta Cana and optional extras.",
    "Tres montajes básicos, menú de tres tiempos a elección por persona, transporte desde toda Punta Cana y extras opcionales.",
  ),
  active: false,
  basePrice: 849,
  currency: "USD",
  includedGuests: 2,
  includedDurationMinutes: 120,
  styles: templateStyles,
  inclusions: templateInclusions,
  menuItems: templateMenus.map((m) => ({
    _key: m._id,
    _type: "reference",
    _ref: m._id,
    _weak: true,
    _strengthenOnPublish: { type: "menuItem" },
  })),
  availableAddons: templateAddons.map((a) => ({
    _key: a._id,
    _type: "reference",
    _ref: a._id,
    _weak: true,
    _strengthenOnPublish: { type: "experienceAddon" },
  })),
};
// Interactive example is rendered ONLY on localhost / Netlify Deploy Preview, never in the production catalog.
export function dinnerPreview(): Experience {
  return {
    ...dinnerTemplateFields,
    _id: "preview-dinner-template",
    _type: "romanticDinnerExperience",
    active: true,
    maximumGuests: 2,
    maximumDurationMinutes: 120,
    gallery: [],
    styles: templateStyles.map((s) => ({ ...s, active: true })),
    menuItems: templateMenus.map((m) => ({ ...m, active: true })),
    availableAddons: templateAddons.map((a) => ({ ...a, active: true })),
    beverages: [],
    occasions: [],
  };
}
