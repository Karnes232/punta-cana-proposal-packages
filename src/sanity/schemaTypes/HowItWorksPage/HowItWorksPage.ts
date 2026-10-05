import { defineField, defineType, type FieldDefinition } from "sanity";
import { ListIcon } from "@sanity/icons";
import { PageCategoryInput } from "../../components/PageCategoryInput";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";

const required = (
  name: string,
  type: "string" | "text",
  title: string,
): FieldDefinition =>
  defineField({
    name,
    title,
    type,
    validation: (Rule) => Rule.required(),
  });

// A section of the page: a collapsible group of its fields.
const section = (
  name: string,
  title: string,
  fields: FieldDefinition[],
  collapsed = true,
) =>
  defineField({
    name,
    title,
    type: "object",
    group: "content",
    options: { collapsible: true, collapsed },
    fields,
  });

type FaqDocument = { faq?: { categories?: { _key: string }[] } };

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
      defineField({
        name: "categories",
        title: bi("Categorías de preguntas", "Question categories"),
        description: bi(
          "Los botones del filtro, en este orden",
          "The filter buttons, in this order",
        ),
        type: "array",
        of: [
          {
            name: "questionCategory",
            title: bi("Categoría", "Category"),
            type: "object",
            fields: [required("name", "string", "Name")],
            preview: { select: { title: "name" } },
          },
        ],
      }),
      defineField({
        name: "faqs",
        title: "FAQs",
        type: "array",
        of: [
          {
            name: "faq",
            title: "FAQ",
            type: "object",
            fields: [
              defineField({
                name: "category",
                title: bi("Categoría", "Category"),
                type: "string",
                components: { input: PageCategoryInput },
                validation: (Rule) =>
                  Rule.required().custom((key, context) => {
                    const categories =
                      (context.document as FaqDocument | undefined)?.faq
                        ?.categories ?? [];
                    return !key || categories.some((c) => c._key === key)
                      ? true
                      : bi(
                          "Elige una de las categorías de esta página",
                          "Choose one of this page's categories",
                        );
                  }),
              }),
              required("question", "string", "Question"),
              required("answer", "text", "Answer"),
            ],
            preview: { select: { title: "question" } },
          },
        ],
        validation: (Rule) => Rule.required(),
      }),
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
