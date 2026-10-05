import { defineField, defineType } from "sanity";
import { ListIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import { questionFields, required, section } from "../shared/pageSections";

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
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          description: "The image is optional",
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      false,
    ),
    section("steps", bi("Pasos y garantías", "Steps & reassurance"), [
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
        validation: (Rule) => Rule.required(),
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
        validation: (Rule) => Rule.required(),
      }),
    ]),
    section("faq", bi("Preguntas", "Questions"), [
      required("eyebrow", "string", "Eyebrow"),
      required("heading", "string", "Heading"),
      required("headingAccent", "string", "Heading Accent"),
      required("subheading", "text", "Subheading"),
      ...questionFields(),
    ]),
    section("cta", bi("Llamada final", "Closing call to action"), [
      required("eyebrow", "string", "Eyebrow"),
      required("scriptLine", "string", "Script Line"),
      required("heading", "string", "Heading"),
      required("headingAccent", "string", "Heading Accent"),
      required("subheading", "text", "Subheading"),
      required("primaryCTA", "string", "Primary CTA"),
      required("primaryCTAHref", "string", "Primary CTA Href"),
      required("secondaryCTA", "string", "Secondary CTA"),
      required("secondaryCTAHref", "string", "Secondary CTA Href"),
    ]),
    // Last, like the bottom of the page: this language's SEO.
    defineField({
      name: "seo",
      title: "SEO",
      type: "blogPostSeo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: bi("Cómo funciona", "How it works") }),
  },
});
