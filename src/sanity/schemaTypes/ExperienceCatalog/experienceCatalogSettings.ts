import { homeCopy } from "@/lib/experience/homeCopy";
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
import { pageSeo } from "../shared/pageSections";
import { image } from "./shared";
import { languageField } from "../shared/languageField";
import { CATALOG_TEXT_SECTIONS } from "./catalogTextPlaces";

// The featured proposals and the dinner deposit are shared by every language:
// they're edited on the English document only (see getCatalogContent).
const englishOnly: ConditionalPropertyCallback = ({ document }) =>
  document?.language !== "en";

const short = (text: string) =>
  text.length > 48 ? `${text.slice(0, 46).trimEnd()}…` : text;

/**
 * An editable site text. Its Studio title is the text it currently shows
 * (e.g. "Inicio / Home"), and the description says where it appears (when
 * given) and repeats the full default, so editors can see what an empty
 * field means.
 */
export const siteText = (
  name: string,
  type: "string" | "text",
  defaults: DefaultText | undefined,
  placement: { group?: string; fieldset?: string },
  where?: string,
): FieldDefinition =>
  defineField({
    name,
    type,
    ...placement,
    title: defaults ? bi(short(defaults.es ?? ""), short(defaults.en)) : name,
    description:
      [
        where && `Dónde / Where: ${where}`,
        defaults &&
          `Vacío = texto actual / Empty = current text: "${defaults.es}" · "${defaults.en}"`,
      ]
        .filter(Boolean)
        .join(" — ") || undefined,
  });

// One Catalog text field: its tab and fieldset are its section, and its
// description says where it appears. Longer policy notes get a text box.
const catalogTextField = (
  section: string,
  key: string,
  where: string,
): FieldDefinition =>
  key === "dinnerDepositAmount"
    ? defineField({
        name: "dinnerDepositAmount",
        hidden: englishOnly,
        title: bi("Depósito de la cena (USD)", "Dinner deposit (USD)"),
        group: section,
        fieldset: section,
        type: "number",
        initialValue: 200,
        validation: (rule) => rule.positive().precision(2),
        description: `Dónde / Where: ${where} — ${bi(
          "Se pide a mano después de confirmar disponibilidad",
          "Requested manually after availability is confirmed",
        )}`,
      })
    : dinnerPolicyLabels[key]
      ? siteText(
          key,
          "text",
          dinnerPolicyLabels[key],
          { group: section, fieldset: section },
          where,
        )
      : siteText(
          key,
          "string",
          ui[key],
          { group: section, fieldset: section },
          where,
        );

export default defineType({
  name: "experienceCatalogSettings",
  type: "document",
  preview: {
    prepare: () => ({ title: bi("Textos del catálogo", "Catalog text") }),
  },
  title: "Catalog Settings",
  // A tab per part of the website, in the order a visitor meets them; the
  // "All fields" tab shows the same parts as collapsible sections.
  groups: CATALOG_TEXT_SECTIONS.map(({ name, title }, index) => ({
    name,
    title,
    ...(index === 0 ? { default: true } : {}),
  })),
  fieldsets: CATALOG_TEXT_SECTIONS.map(({ name, title, description }) => ({
    name,
    title,
    description,
    options: { collapsible: true, collapsed: false },
  })),
  initialValue: { dinnerDepositAmount: 200 },
  fields: [
    languageField,
    ...CATALOG_TEXT_SECTIONS.flatMap(({ name, fields }) =>
      fields.map(([key, where]) => catalogTextField(name, key, where)),
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
          // Inactive proposals aren't on the site, so Home would skip them.
          options: { filter: "active == true", disableNew: true },
        },
      ],
      validation: (r) => [
        r.max(3).unique(),
        // An emptied list (not removed) shows no featured proposals at all.
        r
          .custom((list?: unknown[]) =>
            Array.isArray(list) && list.length === 0
              ? bi(
                  "Lista vacía: Inicio no mostrará propuestas destacadas",
                  "Empty list: Home will show no featured proposals",
                )
              : true,
          )
          .warning(),
      ],
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
    pageSeo(),
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
    pageSeo(),
  ],
});
