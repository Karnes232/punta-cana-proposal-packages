import { homeCopy } from "@/lib/experience/homeCopy";
import { introductionLabels } from "@/lib/experience/introduction";
import { dinnerPolicyLabels } from "@/lib/experience/dinnerPolicy";
import { ui } from "@/lib/experience/labels";
import { defineType, defineField, type FieldDefinition } from "sanity";
import { bi } from "../shared/labels";
import { field, image } from "./shared";

const short = (text: string) =>
  text.length > 48 ? `${text.slice(0, 46).trimEnd()}…` : text;

/**
 * An editable site text. Its Studio title is the text it currently shows
 * (e.g. "Inicio / Home"), and the description repeats the full default, so
 * editors can see what an empty field means.
 */
const siteText = (
  name: string,
  type: "localizedString" | "localizedText",
  defaults: [string, string] | undefined,
  placement: { group?: string; fieldset?: string },
): FieldDefinition =>
  defineField({
    name,
    type,
    ...placement,
    title: defaults ? bi(short(defaults[1]), short(defaults[0])) : name,
    description: defaults
      ? `Vacío = texto actual / Empty = current text: "${defaults[1]}" · "${defaults[0]}"`
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
  initialValue: {
    dinnerDepositAmount: 200,
    ...Object.fromEntries(
      Object.entries(dinnerPolicyLabels).map(([key, [en, es]]) => [
        key,
        { en, es },
      ]),
    ),
  },
  fields: [
    defineField({
      name: "dinnerDepositAmount",
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
      siteText(k, "localizedText", defaults, { group: "policy" }),
    ),
    ...labelKeys.map((k) =>
      siteText(k, "localizedString", ui[k], { group: settingsGroupOf(k) }),
    ),
    ...Object.entries(introductionLabels).map(([k, defaults]) =>
      siteText(k, "localizedText", defaults, { group: "intro" }),
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
    { name: "seo", title: "SEO" },
  ],
  initialValue: {
    copy: Object.fromEntries(
      Object.entries(homeCopy).map(([key, [en, es]]) => [key, { en, es }]),
    ),
  },
  fields: [
    {
      ...image("heroImage"),
      group: "photos",
      description: bi(
        "Vacío = se usa la Foto de portada actual (Inicio)",
        "Empty = the Current hero photo (Home) is used",
      ),
    },
    { ...image("proposalHeroImage"), group: "photos" },
    { ...image("dinnerHeroImage"), group: "photos" },
    { ...image("proposalSelectorImage"), group: "photos" },
    { ...image("dinnerSelectorImage"), group: "photos" },
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
          siteText(k, "localizedText", defaults, {
            fieldset: homeSectionOf(k),
          }),
        ),
    }),
    defineField({
      name: "featuredProposals",
      type: "array",
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
        description:
          name === "journeyImages"
            ? bi("Una foto por paso, máximo 5", "One photo per step, up to 5")
            : bi("Máximo 8 fotos", "Up to 8 photos"),
        of: [image("photo")],
        validation: (r) => r.max(name === "journeyImages" ? 5 : 8),
      }),
    ),
    ...["eyebrow", "headline", "subheadline"].map((k) => ({
      ...field(k, "localizedString", "text"),
      description: bi(
        "Si lo llenas, reemplaza el mismo texto en Textos de la página › Portada",
        "If filled, replaces the same text in Page text › Hero",
      ),
    })),
    ...["primaryCTA", "secondaryCTA"].map((k) => ({
      ...field(k, "localizedString", "text"),
      description: bi(
        "No se muestra en el sitio (los botones usan Textos de la página)",
        "Not shown on the site (the buttons use Page text)",
      ),
    })),
    {
      ...field("contactHeading", "localizedString", "text"),
      description: bi(
        "Título encima del botón de contacto en Propuestas y Cenas",
        "Heading above the contact button on Proposals and Dinners",
      ),
    },
    field("seo", "experienceSeo", "seo"),
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
    ...["heading", "description", "businessInformation"].map((k) =>
      field(k, "localizedText"),
    ),
    field("telephone"),
    field("email"),
    field("whatsapp"),
    field("seo", "experienceSeo"),
  ],
});
