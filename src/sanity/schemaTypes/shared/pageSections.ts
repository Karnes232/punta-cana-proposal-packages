import { defineField, type FieldDefinition, type ObjectRule } from "sanity";
import { PageCategoryInput } from "../../components/PageCategoryInput";
import { bi } from "./labels";
import { imageFileIfSet, linkFormat, uniqueItems } from "./validation";

/** Building blocks of the one-document-per-language page types. */

export const required = (
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

// A link the site can follow (a page path, or https/mailto/tel).
export const link = (name: string, title: string): FieldDefinition =>
  defineField({
    name,
    title,
    type: "string",
    validation: (Rule) => Rule.required().custom(linkFormat),
  });

// An optional photo with its alt text; once added, it needs its file.
export const optionalImage = (name: string, title: string): FieldDefinition =>
  defineField({
    name,
    title,
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
    validation: (Rule) => Rule.custom(imageFileIfSet),
  });

// Last on every page document, like the bottom of the page: its SEO.
export const pageSeo = (): FieldDefinition =>
  defineField({
    name: "seo",
    title: "SEO",
    type: "blogPostSeo",
    group: "seo",
    validation: (Rule) => Rule.required(),
  });

// A section of the page: a collapsible group of its fields. A required
// section always exists, so the rules of the fields inside it always run
// (Sanity only checks an optional object's fields once it has a value).
export const section = (
  name: string,
  title: string,
  fields: FieldDefinition[],
  collapsed = true,
  isRequired = false,
) =>
  defineField({
    name,
    title,
    type: "object",
    group: "content",
    options: { collapsible: true, collapsed },
    fields,
    validation: isRequired ? (Rule: ObjectRule) => Rule.required() : undefined,
  });

type FaqDocument = { faq?: { categories?: { _key: string }[] } };

/**
 * A page's questions: its own category list (the filter buttons) and the
 * questions, each in one of those categories. They live in the page's `faq`
 * section, where PageCategoryInput looks for the categories.
 */
export const questionFields = (): FieldDefinition[] => [
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
    // At least one filter button; two with the same name would merge.
    validation: (Rule) =>
      Rule.required()
        .min(1)
        .custom(uniqueItems((c: { name?: string }) => c.name?.trim())),
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
    validation: (Rule) => Rule.required().min(1),
  }),
];
