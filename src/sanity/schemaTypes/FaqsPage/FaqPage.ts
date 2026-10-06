import { defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import {
  optionalImage,
  pageSeo,
  questionFields,
  required,
  section,
} from "../shared/pageSections";

/**
 * The FAQ page in one language (faqPage-<language>), its sections in the
 * order of the page. The question categories are listed in the page itself,
 * so each language has its own.
 */
export default defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",
  icon: HelpCircleIcon,
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
        required("eyebrow", "string", "Eyebrow"),
        required("headingLine1", "string", "Heading Line 1"),
        required("headingLine2", "string", "Heading Line 2"),
        required("subheading", "text", "Subheading"),
        optionalImage("heroImage", "Hero Image"),
      ],
      false,
      true,
    ),
    section("faq", bi("Preguntas", "Questions"), questionFields(), true, true),
    section(
      "contactStrip",
      bi("Franja de contacto", "Contact banner"),
      [
        required("eyebrow", "string", "Eyebrow"),
        required("line1", "string", "Line 1"),
        required("line2", "string", "Line 2"),
        required("body", "text", "Body"),
        required("cta", "string", "CTA"),
      ],
      true,
      true,
    ),
    // Last, like the bottom of the page: this language's SEO.
    pageSeo(),
  ],
  preview: {
    prepare: () => ({ title: bi("Preguntas frecuentes", "FAQ") }),
  },
});
