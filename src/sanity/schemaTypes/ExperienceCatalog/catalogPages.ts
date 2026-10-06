import { defineField, defineType, type FieldDefinition } from "sanity";
import { HeartIcon, SparklesIcon } from "@sanity/icons";
import { dinnerPolicyLabels } from "@/lib/experience/dinnerPolicy";
import { introductionLabels } from "@/lib/experience/introduction";
import { ui } from "@/lib/experience/labels";
import {
  CATALOG_PAGES,
  type CatalogPageType,
} from "@/lib/experience/catalogPages";
import type { DefaultText } from "@/lib/experience/types";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import { pageSeo, section } from "../shared/pageSections";
import { siteText } from "./experienceCatalogSettings";
import { field, image } from "./shared";

// Longer texts (introductions, policy notes) get a multi-line box.
const longTexts: Record<string, DefaultText> = {
  ...introductionLabels,
  ...dinnerPolicyLabels,
};

// A page text, titled with the text it shows today (like Catalog text).
const pageText = (key: string): FieldDefinition =>
  key === "contactHeading"
    ? {
        ...field("contactHeading"),
        description: bi(
          "Título encima del botón de contacto. Vacío = sin título",
          "Heading above the contact button. Empty = no heading",
        ),
      }
    : longTexts[key]
      ? siteText(key, "text", longTexts[key], {})
      : siteText(key, "string", ui[key], {});

const sectionTitles: Record<string, string> = {
  hero: bi("Portada", "Hero"),
  intro: bi("Introducción", "Introduction"),
  packages: bi("Paquetes", "Packages"),
  dinners: bi("Cenas", "Dinners"),
  contact: bi("Franja de contacto", "Contact banner"),
};

/**
 * A catalog page in one language (<type>-<language>): every text on the
 * page, in its order, and the page's SEO. The packages or dinners are
 * documents of their own; the labels on their cards and request form are
 * Catalog text.
 */
const catalogPage = ({
  type,
  title,
  icon,
  photoNote,
  sectionNotes,
}: {
  type: CatalogPageType;
  title: string;
  icon: typeof HeartIcon;
  photoNote: string;
  sectionNotes: Record<string, string>;
}) =>
  defineType({
    name: type,
    title,
    type: "document",
    icon,
    groups: [
      { name: "content", title: bi("Contenido", "Content"), default: true },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      languageField,
      ...Object.entries(CATALOG_PAGES[type]).map(([name, keys]) =>
        defineField({
          ...section(
            name,
            sectionTitles[name],
            [
              ...(name === "hero"
                ? [
                    {
                      ...image("image", "string"),
                      title: bi("Foto de portada", "Hero photo"),
                      description: photoNote,
                    },
                  ]
                : []),
              ...keys.map(pageText),
            ],
            name !== "hero",
          ),
          ...(sectionNotes[name] ? { description: sectionNotes[name] } : {}),
        }),
      ),
      // Last, like the bottom of the page: this language's SEO.
      pageSeo(),
    ],
    preview: { prepare: () => ({ title }) },
  });

export const proposalsPage = catalogPage({
  type: "proposalsPage",
  title: bi("Página de propuestas", "Proposals page"),
  icon: HeartIcon,
  photoNote: bi(
    "Vacía = la foto del paquete Love Signature",
    "Empty = the Love Signature package photo",
  ),
  sectionNotes: {
    packages: bi(
      "Los paquetes se editan en Propuestas › Paquetes; los textos de las tarjetas y del formulario, en Ajustes del sitio › Textos del catálogo",
      "Packages are edited in Proposals › Packages; card and form labels in Site settings › Catalog text",
    ),
  },
});

export const romanticDinnersPage = catalogPage({
  type: "romanticDinnersPage",
  title: bi("Página de cenas románticas", "Romantic dinners page"),
  icon: SparklesIcon,
  photoNote: bi(
    "Vacía = la foto de la primera cena",
    "Empty = the first dinner's photo",
  ),
  sectionNotes: {
    intro: bi(
      "Las notas de exclusividad, solicitud y pago se editan en Ajustes del sitio › Textos del catálogo › Cenas: política (también aparecen en el formulario y en Inicio)",
      "The exclusivity, request and payment notes are edited in Site settings › Catalog text › Dinner policy (they also appear in the request form and on Home)",
    ),
    dinners: bi(
      "Las cenas se editan en Cenas románticas › Cenas; los textos de las tarjetas y del formulario, en Ajustes del sitio › Textos del catálogo",
      "Dinners are edited in Romantic dinners › Dinners; card and form labels in Site settings › Catalog text",
    ),
  },
});
