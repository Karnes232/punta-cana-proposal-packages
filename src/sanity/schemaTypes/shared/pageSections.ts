import { defineField, type FieldDefinition } from "sanity";
import { PageCategoryInput } from "../../components/PageCategoryInput";
import { bi } from "./labels";

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

// A section of the page: a collapsible group of its fields.
export const section = (
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
];
