import { homeCopy } from "@/lib/experience/homeCopy";
import { introductionLabels } from "@/lib/experience/introduction";
import { dinnerPolicyLabels } from "@/lib/experience/dinnerPolicy";
import { ui } from "@/lib/experience/labels";
import type { DefaultText } from "@/lib/experience/types";
import {
  defineType,
  defineField,
  type ConditionalPropertyCallback,
  type FieldDefinition,
} from "sanity";
import { bi } from "../shared/labels";
import { field, image } from "./shared";
import { languageField } from "../shared/languageField";

// Photos, featured proposals and the deposit are shared by every language:
// they're edited on the English document only (see getCatalogContent).
const englishOnly: ConditionalPropertyCallback = ({ document }) =>
  document?.language !== "en";

const short = (text: string) =>
  text.length > 48 ? `${text.slice(0, 46).trimEnd()}…` : text;

/**
 * An editable site text. Its Studio title is the text it currently shows
 * (e.g. "Inicio / Home"), and the description repeats the full default, so
 * editors can see what an empty field means.
 */
const siteText = (
  name: string,
  type: "string" | "text",
  defaults: DefaultText | undefined,
  placement: { group?: string; fieldset?: string },
): FieldDefinition =>
  defineField({
    name,
    type,
    ...placement,
    title: defaults ? bi(short(defaults.es ?? ""), short(defaults.en)) : name,
    description: defaults
      ? `Vacío = texto actual / Empty = current text: "${defaults.es}" · "${defaults.en}"`
      : undefined,
  });
export const labelKeys = [
  "navHome",
  "navProposals",
  "navDinners",
  "navHow",
  "navFaq",
  "planProposal",
  "planCelebration",
  "fragranceSensitivity",
  "occasionGuests",
  "foodMenu",
  "drinksWine",
  "welcomeCocktail",
  "wineSelection",
  "menusCompleted",
  "chooseMenu",
  "menuSelected",
  "priceDetails",
  "baseExperience",
  "additionalGuests",
  "menuSupplements",
  "drinkSupplements",
  "extras",
  "addGuest",
  "removeGuest",
  "noExtras",
  "cocktails",
  "cocktailHint",
  "completeHint",
  "capacityPending",
  "vegan",
  "vegetarian",
  "proposalSectionTitle",
  "proposalSectionDescription",
  "dinnerSectionTitle",
  "dinnerSectionDescription",
  "currencySymbol",
  "estimatedTotalLabel",
  "availabilityButtonLabel",
  "includedLabel",
  "startingAtLabel",
  "selectStyleLabel",
  "addonsLabel",
  "contactUsLabel",
  "emptyProposals",
  "emptyDinners",
  "fullName",
  "email",
  "phone",
  "hotel",
  "desiredDate",
  "notes",
  "send",
  "success",
  "error",
  "guests",
  "guest",
  "occasion",
  "customOccasion",
  "starter",
  "main",
  "dessert",
  "beverages",
  "duration",
  "minutes",
  "quantity",
  "quotePending",
  "select",
  "menu",
  "previous",
  "next",
  "photo",
  "selectPackage",
  "selectedPackage",
  "blog",
  "faq",
  "previewOnly",
  "privacy",
  "terms",
  "rightsReserved",
  "siteLinks",
  "close",
  "introStepsHeading",
  "priceToBeDefined",
  "setupTemplate",
  "photoPending",
  "dinnerTemplatePreviewNote",
  "dinnerInquiryNote",
  "heroEyebrow",
  "dinnerHeroText",
  "proposalHeroText",
  "dinnerHeroCta",
  "proposalHeroCta",
  "heroHowItWorks",
  "proposalDinnerEyebrow",
  "proposalDinnerTitle",
  "proposalDinnerIntro",
  "dietaryLegend",
];
// Catalog Settings tabs. Labels not listed land in "other".
const settingsGroups: Record<string, string[]> = {
  navigation: [
    "navHome",
    "navProposals",
    "navDinners",
    "navHow",
    "navFaq",
    "planProposal",
    "planCelebration",
    "contactUsLabel",
    "menu",
    "blog",
    "faq",
    "privacy",
    "terms",
    "rightsReserved",
    "siteLinks",
    "proposalSectionTitle",
    "dinnerSectionTitle",
    "proposalSectionDescription",
    "dinnerSectionDescription",
  ],
  heroes: [
    "heroEyebrow",
    "proposalHeroText",
    "dinnerHeroText",
    "proposalHeroCta",
    "dinnerHeroCta",
    "heroHowItWorks",
    "introStepsHeading",
    "emptyProposals",
    "emptyDinners",
    "dinnerTemplatePreviewNote",
    "dinnerInquiryNote",
  ],
  forms: [
    "fullName",
    "email",
    "phone",
    "hotel",
    "desiredDate",
    "notes",
    "send",
    "success",
    "error",
    "previewOnly",
    "fragranceSensitivity",
    "availabilityButtonLabel",
  ],
  cards: [
    "startingAtLabel",
    "selectStyleLabel",
    "selectPackage",
    "selectedPackage",
    "includedLabel",
    "addonsLabel",
    "extras",
    "noExtras",
    "priceToBeDefined",
    "setupTemplate",
    "photoPending",
    "estimatedTotalLabel",
    "priceDetails",
    "baseExperience",
    "additionalGuests",
    "menuSupplements",
    "drinkSupplements",
    "quotePending",
    "quantity",
    "minutes",
    "duration",
    "currencySymbol",
    "photo",
    "previous",
    "next",
    "close",
    "occasionGuests",
    "foodMenu",
    "drinksWine",
    "welcomeCocktail",
    "wineSelection",
    "menusCompleted",
    "chooseMenu",
    "menuSelected",
    "addGuest",
    "removeGuest",
    "cocktails",
    "cocktailHint",
    "completeHint",
    "capacityPending",
    "vegan",
    "vegetarian",
    "guests",
    "guest",
    "occasion",
    "customOccasion",
    "starter",
    "main",
    "dessert",
    "beverages",
    "select",
    "proposalDinnerEyebrow",
    "proposalDinnerTitle",
    "proposalDinnerIntro",
    "dietaryLegend",
  ],
};
const settingsGroupOf = (key: string) =>
  Object.keys(settingsGroups).find((g) => settingsGroups[g].includes(key)) ??
  "other";

export default defineType({
  name: "experienceCatalogSettings",
  type: "document",
  preview: {
    prepare: () => ({ title: bi("Textos del catálogo", "Catalog text") }),
  },
  title: "Catalog Settings",
  groups: [
    {
      name: "navigation",
      title: bi("Menú y pie de página", "Navigation & footer"),
      default: true,
    },
    { name: "heroes", title: bi("Portadas y avisos", "Page heroes & notes") },
    { name: "intro", title: bi("Introducciones", "Introductions") },
    { name: "cards", title: bi("Tarjetas", "Cards") },
    { name: "forms", title: bi("Formularios", "Forms") },
    { name: "policy", title: bi("Cenas: política", "Dinner policy") },
    { name: "other", title: bi("Otros textos", "Other text") },
  ],
  initialValue: { dinnerDepositAmount: 200 },
  fields: [
    languageField,
    defineField({
      name: "dinnerDepositAmount",
      hidden: englishOnly,
      title: bi("Depósito de la cena (USD)", "Dinner deposit (USD)"),
      group: "policy",
      type: "number",
      initialValue: 200,
      validation: (rule) => rule.positive().precision(2),
      description: bi(
        "Se pide a mano después de confirmar disponibilidad. Escribe {deposit} en los mensajes para mostrar este monto",
        "Requested manually after availability is confirmed. Write {deposit} in the messages to show this amount",
      ),
    }),
    ...Object.entries(dinnerPolicyLabels).map(([k, defaults]) =>
      siteText(k, "text", defaults, { group: "policy" }),
    ),
    ...labelKeys.map((k) =>
      siteText(k, "string", ui[k], { group: settingsGroupOf(k) }),
    ),
    ...Object.entries(introductionLabels).map(([k, defaults]) =>
      siteText(k, "text", defaults, { group: "intro" }),
    ),
  ],
});
// Home page text, in the order the sections appear on the page.
const homeSections: [string, string, string[]][] = [
  [
    "hero",
    bi("Portada", "Hero"),
    [
      "eyebrow",
      "headline",
      "introduction",
      "exploreProposals",
      "exploreDinners",
      "deposit",
    ],
  ],
  [
    "selector",
    bi("¿Qué te gustaría celebrar?", "What are you planning?"),
    [
      "planningEyebrow",
      "planning",
      "proposalChoice",
      "proposalDescription",
      "dinnerChoice",
      "dinnerDescription",
    ],
  ],
  [
    "trust",
    bi("Franja de confianza", "Trust bar"),
    [
      "trustLabel",
      "trustPrivate",
      "trustLocal",
      "trustTransport",
      "trustService",
      "trustPhoto",
      "trustDelivery",
      "mediaNote",
    ],
  ],
  [
    "featured",
    bi("Propuestas destacadas", "Featured proposals"),
    ["featured", "customize", "allProposals"],
  ],
  [
    "journey",
    bi("El recorrido", "The journey"),
    [
      "journeyLabel",
      "journeyTitle",
      "journeyIntro",
      "journeyOne",
      "journeyOneText",
      "journeyTwo",
      "journeyTwoText",
      "journeyThree",
      "journeyThreeText",
      "journeyFour",
      "journeyFourText",
      "journeyFive",
      "journeyFiveText",
    ],
  ],
  [
    "editorial",
    bi("Transformación", "Transformation"),
    ["transformation", "transformationText", "editorialNote"],
  ],
  [
    "dinner",
    bi("Cena privada", "Private dinner"),
    ["dinnerTitle", "dinnerText", "dinnerCelebrations", "dinnerPrice"],
  ],
  [
    "how",
    bi("Cómo funciona", "How it works"),
    [
      "howTitle",
      "stepOne",
      "stepOneText",
      "stepTwo",
      "stepTwoText",
      "stepThree",
      "stepThreeText",
      "stepFour",
      "stepFourText",
      "stepFive",
      "stepFiveText",
      "stepSix",
      "stepSixText",
      "stepSeven",
      "stepSevenText",
      "stepEight",
      "stepEightText",
      "howItWorksLink",
    ],
  ],
  [
    "moments",
    bi("Momentos reales", "Real moments"),
    ["realMoments", "viewStories", "galleryOpen", "close", "previous", "next"],
  ],
  ["final", bi("Llamada final", "Closing call to action"), ["startTitle"]],
];
const homeSectionOf = (key: string) =>
  homeSections.find(([, , keys]) => keys.includes(key))?.[0];

export const catalogHome = defineType({
  name: "catalogHome",
  type: "document",
  preview: { prepare: () => ({ title: bi("Página de inicio", "Home page") }) },
  title: "Home",
  groups: [
    { name: "photos", title: bi("Fotos", "Photos"), default: true },
    { name: "text", title: bi("Textos", "Text") },
    { name: "featured", title: bi("Destacadas", "Featured") },
  ],
  fields: [
    languageField,
    {
      ...image("heroImage"),
      group: "photos",
      hidden: englishOnly,
      description: bi(
        "Foto grande al inicio de la página. Vacío = la foto del primer paquete destacado",
        "Large photo at the top of the page. Empty = the first featured package's photo",
      ),
    },
    { ...image("proposalHeroImage"), group: "photos", hidden: englishOnly },
    { ...image("dinnerHeroImage"), group: "photos", hidden: englishOnly },
    { ...image("proposalSelectorImage"), group: "photos", hidden: englishOnly },
    { ...image("dinnerSelectorImage"), group: "photos", hidden: englishOnly },
    defineField({
      name: "copy",
      title: bi("Textos de la página", "Page text"),
      type: "object",
      group: "text",
      fieldsets: homeSections.map(([name, title]) => ({
        name,
        title,
        options: { collapsible: true, collapsed: true },
      })),
      // Ordered like the page (the Studio shows fieldsets in field order).
      fields: homeSections
        .flatMap(([, , keys]) => keys)
        .concat(Object.keys(homeCopy).filter((k) => !homeSectionOf(k)))
        .map((k) => [k, homeCopy[k]] as const)
        .map(([k, defaults]) =>
          siteText(k, "text", defaults, {
            fieldset: homeSectionOf(k),
          }),
        ),
    }),
    defineField({
      name: "featuredProposals",
      type: "array",
      hidden: englishOnly,
      title: "Featured proposals (up to three, ordered)",
      group: "featured",
      description: bi(
        "Hasta tres, en este orden. Vacío = Love Signature, Path of Love y Marry Me Sign",
        "Up to three, in this order. Empty = Love Signature, Path of Love and Marry Me Sign",
      ),
      of: [
        {
          type: "reference",
          to: [{ type: "proposalExperience" }],
        },
      ],
      validation: (r) => r.max(3).unique(),
    }),
    ...["journeyImages", "editorialImages", "moments"].map((name) =>
      defineField({
        name,
        type: "array",
        group: "photos",
        hidden: englishOnly,
        description:
          name === "journeyImages"
            ? bi("Una foto por paso, máximo 5", "One photo per step, up to 5")
            : bi("Máximo 8 fotos", "Up to 8 photos"),
        of: [image("photo")],
        validation: (r) => r.max(name === "journeyImages" ? 5 : 8),
      }),
    ),
    {
      ...field("contactHeading", "string", "text"),
      description: bi(
        "Título encima del botón de contacto en Propuestas y Cenas",
        "Heading above the contact button on Proposals and Dinners",
      ),
    },
  ],
});
export const catalogContact = defineType({
  name: "catalogContact",
  type: "document",
  preview: {
    prepare: () => ({ title: bi("Página de contacto", "Contact page") }),
  },
  title: "Contact",
  fields: [
    languageField,
    ...["heading", "description", "businessInformation"].map((k) =>
      field(k, "text"),
    ),
  ],
});
