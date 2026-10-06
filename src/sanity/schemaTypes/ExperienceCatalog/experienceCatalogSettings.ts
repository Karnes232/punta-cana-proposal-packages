import { homeCopy } from "@/lib/experience/homeCopy";
import { MOVED_FROM_CATALOG_TEXT } from "@/lib/experience/catalogPages";
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
import { image } from "./shared";
import { languageField } from "../shared/languageField";

// The featured proposals and the dinner deposit are shared by every language:
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
export const siteText = (
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
  "priceToBeDefined",
  "setupTemplate",
  "photoPending",
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
    // Texts on the Proposals and Romantic dinners pages are edited there.
    ...Object.entries(dinnerPolicyLabels)
      .filter(([k]) => !MOVED_FROM_CATALOG_TEXT.includes(k))
      .map(([k, defaults]) =>
        siteText(k, "text", defaults, { group: "policy" }),
      ),
    ...labelKeys.map((k) =>
      siteText(k, "string", ui[k], { group: settingsGroupOf(k) }),
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
// Home keys missing from homeSections still get a field, in the last section.
const homeTextKeys = (section: string) => [
  ...(homeSections.find(([name]) => name === section)?.[2] ?? []),
  ...(section === "final"
    ? Object.keys(homeCopy).filter(
        (k) => !homeSections.some(([, , keys]) => keys.includes(k)),
      )
    : []),
];

// Photos and the featured proposals, placed in the section of the page that
// shows them. Each language's document has its own photos (alt text in that
// language); the featured proposals are shared and edited on English only.
const homePhotoFields: Record<string, FieldDefinition[]> = {
  hero: [
    {
      ...image("heroImage", "string"),
      group: "photos",
      description: bi(
        "Foto grande al inicio de la página. Vacío = la foto del primer paquete destacado",
        "Large photo at the top of the page. Empty = the first featured package's photo",
      ),
    },
  ],
  selector: [
    { ...image("proposalSelectorImage", "string"), group: "photos" },
    {
      ...image("dinnerSelectorImage", "string"),
      group: "photos",
      description: bi(
        "También se muestra en la sección Cena privada",
        "Also shown in the Private dinner section",
      ),
    },
  ],
  featured: [
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
  ],
  ...Object.fromEntries(
    [
      ["journey", "journeyImages"],
      ["editorial", "editorialImages"],
      ["moments", "moments"],
    ].map(([section, name]) => [
      section,
      [
        defineField({
          name,
          type: "array",
          group: "photos",
          description:
            name === "journeyImages"
              ? bi("Una foto por paso, máximo 5", "One photo per step, up to 5")
              : bi("Máximo 8 fotos", "Up to 8 photos"),
          of: [image("photo", "string")],
          validation: (r) => r.max(name === "journeyImages" ? 5 : 8),
        }),
      ],
    ]),
  ),
};

// The "All fields" tab reads like the home page: one section per part of the
// page, each with its photos and then its texts. The Photos, Text and
// Featured tabs still filter by kind.
const homeFieldsets = homeSections.map(([name, title]) => ({
  name,
  title,
  options: { collapsible: true, collapsed: name !== "hero" },
}));

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
  fieldsets: homeFieldsets,
  fields: [
    languageField,
    ...homeFieldsets.flatMap(({ name: section }) => [
      ...(homePhotoFields[section] ?? []).map((f) => ({
        ...f,
        fieldset: section,
      })),
      ...homeTextKeys(section).map((k) =>
        siteText(k, "text", homeCopy[k], { group: "text", fieldset: section }),
      ),
    ]),
    // Last, like the bottom of the page: this language's SEO.
    defineField({
      name: "seo",
      title: "SEO",
      type: "blogPostSeo",
      group: "seo",
    }),
  ],
});
export const catalogContact = defineType({
  name: "catalogContact",
  type: "document",
  preview: {
    prepare: () => ({ title: bi("Página de contacto", "Contact page") }),
  },
  title: "Contact",
  groups: [
    { name: "content", title: bi("Contenido", "Content"), default: true },
    { name: "seo", title: "SEO" },
  ],
  // In the order of the contact page.
  fields: [
    languageField,
    defineField({
      name: "heading",
      title: bi("Título", "Heading"),
      type: "text",
      rows: 2,
      group: "content",
      description: bi(
        "Vacío = «Contáctanos» (Textos del catálogo)",
        'Empty = "Contact us" (Catalog text)',
      ),
    }),
    defineField({
      name: "description",
      title: bi("Texto de introducción", "Intro text"),
      type: "text",
      group: "content",
      description: bi(
        "Debajo del título, encima del formulario",
        "Under the heading, above the form",
      ),
    }),
    defineField({
      name: "businessInformation",
      title: bi("Información del negocio", "Business information"),
      type: "text",
      group: "content",
      description: bi(
        "Debajo del teléfono, el email y WhatsApp, que vienen de Ajustes del sitio → Negocio y redes sociales",
        "Under the phone, email and WhatsApp, which come from Site settings → Business & social links",
      ),
    }),
    // Last, like the bottom of the page: this language's SEO.
    defineField({
      name: "seo",
      title: "SEO",
      type: "blogPostSeo",
      group: "seo",
    }),
  ],
});
