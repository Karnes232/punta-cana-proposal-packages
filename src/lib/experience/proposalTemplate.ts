import type { Experience } from "./types";
const l = (en: string, es: string) => ({ en, es });
export { PROPOSAL_TEMPLATE_ID as proposalTemplateId } from "@/sanity/constants";
export const proposalTemplateAddons = ["A", "B", "C"].map((key, index) => ({
  _id: "proposal-template-addon-" + key.toLowerCase(),
  _type: "experienceAddon",
  internalTitle: "Proposal template — extra " + key,
  name: l(
    "Optional extra " + key + " — to define",
    "Extra opcional " + key + " — por definir",
  ),
  pricingType: "quoteOnly" as const,
  applicableTo: ["proposal" as const],
  active: false,
  displayOrder: index,
  minimumQuantity: 1,
  internalNotes:
    "Template slot. Enter an approved service name and price before activation.",
}));
export const proposalTemplateFields = {
  internalTitle: "Plantilla de propuesta — completar antes de publicar",
  name: l(
    "Marriage proposal — example template",
    "Propuesta de matrimonio — plantilla de ejemplo",
  ),
  shortDescription: l(
    "Choose a setup and optional extras. Complete this template with the real package details in Sanity.",
    "Elige un montaje y los extras opcionales. Completa esta plantilla con los datos reales del paquete en Sanity.",
  ),
  active: false,
  currency: "USD",
  styles: ["A", "B", "C"].map((key, index) => ({
    _key: "style-" + key.toLowerCase(),
    _type: "proposalStyle",
    name: l(
      "Style " + key + " — to define",
      "Estilo " + key + " — por definir",
    ),
    description: l(
      "Real setup photograph, description and full variant price pending.",
      "Pendiente: fotografía del montaje real, descripción y precio completo de esta variante.",
    ),
    active: false,
    displayOrder: index,
  })),
  gallery: [1, 2, 3].map((n) => ({
    _key: "photo-" + n,
    _type: "experiencePhoto",
    displayOrder: n,
  })),
  inclusions: [
    {
      _key: "inclusion-a",
      _type: "experienceInclusion",
      name: l("Inclusion — to define", "Inclusión — por definir"),
      active: false,
      displayOrder: 0,
    },
  ],
  availableAddons: proposalTemplateAddons.map((a) => ({
    _key: a._id,
    _type: "reference",
    _ref: a._id,
    _weak: true,
    _strengthenOnPublish: { type: "experienceAddon" },
  })),
};
export function proposalPreview(): Experience {
  return {
    ...proposalTemplateFields,
    _id: "preview-proposal-template",
    _type: "proposalExperience",
    active: true,
    gallery: [],
    styles: proposalTemplateFields.styles.map((s) => ({ ...s, active: true })),
    inclusions: [],
    availableAddons: proposalTemplateAddons.map((a) => ({
      ...a,
      active: true,
    })),
    menuItems: [],
    beverages: [],
    occasions: [],
  };
}
