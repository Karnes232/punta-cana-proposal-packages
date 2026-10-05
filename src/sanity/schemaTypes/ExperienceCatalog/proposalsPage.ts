import { defineField, defineType, type FieldDefinition } from "sanity";
import { HeartIcon } from "@sanity/icons";
import { introductionLabels } from "@/lib/experience/introduction";
import { ui } from "@/lib/experience/labels";
import { PROPOSALS_PAGE_SECTIONS } from "@/lib/experience/proposalsPage";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import { section } from "../shared/pageSections";
import { siteText } from "./experienceCatalogSettings";
import { field, image } from "./shared";

type SectionName = keyof typeof PROPOSALS_PAGE_SECTIONS;

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
    : introductionLabels[key]
      ? siteText(key, "text", introductionLabels[key], {})
      : siteText(key, "string", ui[key], {});

const texts = (name: SectionName) =>
  PROPOSALS_PAGE_SECTIONS[name].map(pageText);

/**
 * The Proposals page in one language (proposalsPage-<language>): every text
 * on the page, in its order, and the page's SEO. The packages are documents
 * of their own; the labels on their cards and request form are Catalog text.
 */
export default defineType({
  name: "proposalsPage",
  title: "Proposals Page",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "content", title: bi("Contenido", "Content"), default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,
    section(
      "hero",
      bi("Portada", "Hero"),
      [
        {
          ...image("image", "string"),
          title: bi("Foto de portada", "Hero photo"),
          description: bi(
            "Vacía = la foto del paquete Love Signature",
            "Empty = the Love Signature package photo",
          ),
        },
        ...texts("hero"),
      ],
      false,
    ),
    section("intro", bi("Introducción", "Introduction"), texts("intro")),
    defineField({
      ...section("packages", bi("Paquetes", "Packages"), texts("packages")),
      description: bi(
        "Los paquetes se editan en Propuestas › Paquetes; los textos de las tarjetas y del formulario, en Ajustes del sitio › Textos del catálogo",
        "Packages are edited in Proposals › Packages; card and form labels in Site settings › Catalog text",
      ),
    }),
    section(
      "contact",
      bi("Franja de contacto", "Contact banner"),
      texts("contact"),
    ),
    // Last, like the bottom of the page: this language's SEO.
    defineField({
      name: "seo",
      title: "SEO",
      type: "blogPostSeo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: bi("Página de propuestas", "Proposals page") }),
  },
});
