import { defineField, defineType } from "sanity";
import { ListIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import { uniqueItems } from "../shared/validation";
import {
  link,
  optionalImage,
  pageSeo,
  questionFields,
  required,
  section,
} from "../shared/pageSections";

/**
 * The How it works page in one language (howItWorksPage-<language>), its
 * sections in the order of the page. The FAQ's categories are listed in the
 * page itself, so each language has its own.
 */
export default defineType({
  name: "howItWorksPage",
  title: "How It Works Page",
  type: "document",
  icon: ListIcon,
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
        optionalImage("image", "Image"),
      ],
      false,
      true,
    ),
    section(
      "steps",
      bi("Pasos y garantías", "Steps & reassurance"),
      [
        required("eyebrow", "string", "Eyebrow"),
        required("heading", "string", "Heading"),
        required("headingAccent", "string", "Heading Accent"),
        required("subheading", "text", "Subheading"),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              name: "step",
              title: "Step",
              type: "object",
              fields: [
                required("label", "string", "Label"),
                required("title", "string", "Title"),
                required("description", "text", "Description"),
              ],
              preview: { select: { title: "label", subtitle: "title" } },
            },
          ],
          // Numbered in order on the page; each label is its own row.
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .custom(uniqueItems((step: { label?: string }) => step.label)),
        }),
        defineField({
          name: "reassurance",
          title: "Reassurance",
          type: "array",
          of: [
            {
              name: "reassuranceItem",
              title: "Reassurance Item",
              type: "object",
              fields: [
                defineField({
                  name: "id",
                  title: "ID",
                  type: "string",
                  options: {
                    list: ["private", "team", "inclusive", "memories"],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                required("title", "string", "Title"),
                required("caption", "text", "Caption"),
              ],
              preview: { select: { title: "title", subtitle: "caption" } },
            },
          ],
          // One card per item (each id has its own icon), four per row.
          validation: (Rule) => [
            Rule.required()
              .min(1)
              .custom(uniqueItems((item: { id?: string }) => item.id)),
            Rule.max(4).warning(bi("Caben 4 por fila", "Four fit in a row")),
          ],
        }),
      ],
      true,
      true,
    ),
    section(
      "faq",
      bi("Preguntas", "Questions"),
      [
        required("eyebrow", "string", "Eyebrow"),
        required("heading", "string", "Heading"),
        required("headingAccent", "string", "Heading Accent"),
        required("subheading", "text", "Subheading"),
        ...questionFields(),
      ],
      true,
      true,
    ),
    section(
      "cta",
      bi("Llamada final", "Closing call to action"),
      [
        required("eyebrow", "string", "Eyebrow"),
        required("scriptLine", "string", "Script Line"),
        required("heading", "string", "Heading"),
        required("headingAccent", "string", "Heading Accent"),
        required("subheading", "text", "Subheading"),
        required("primaryCTA", "string", "Primary CTA"),
        link("primaryCTAHref", "Primary CTA Href"),
        required("secondaryCTA", "string", "Secondary CTA"),
        link("secondaryCTAHref", "Secondary CTA Href"),
      ],
      true,
      true,
    ),
    // Last, like the bottom of the page: this language's SEO.
    pageSeo(),
  ],
  preview: {
    prepare: () => ({ title: bi("Cómo funciona", "How it works") }),
  },
});
