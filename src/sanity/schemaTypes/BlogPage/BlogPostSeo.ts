import { defineField, defineType } from "sanity";
import { bi } from "../shared/labels";

/** Single-language SEO object embedded on each blogPost (per translation document). */
export default defineType({
  name: "blogPostSeo",
  title: "Blog SEO",
  type: "object",
  fields: [
    defineField({
      name: "meta",
      title: "Meta",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
          // The page's <title>: without it the browser tab and Google show
          // no title at all.
          validation: (Rule) => [
            Rule.required().error(
              bi("Escribe el título para Google", "Write the title for Google"),
            ),
            Rule.max(60).warning(
              bi(
                "Más de 60 caracteres: Google puede cortarlo",
                "Over 60 characters: Google may cut it off",
              ),
            ),
          ],
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => [
            Rule.required().warning(
              bi(
                "Sin descripción, Google elige un texto de la página",
                "Without a description, Google picks text from the page",
              ),
            ),
            Rule.max(160).warning(
              bi(
                "Más de 160 caracteres: Google puede cortarla",
                "Over 160 characters: Google may cut it off",
              ),
            ),
          ],
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          initialValue: [],
        }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "openGraph",
      title: "Open Graph",
      type: "object",
      fields: [
        defineField({ name: "title", title: "OG Title", type: "string" }),
        defineField({
          name: "description",
          title: "OG Description",
          type: "text",
          rows: 3,
        }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "image",
      title: "OG Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "structuredData",
      title: "Structured Data (JSON-LD)",
      type: "text",
      description: "Paste schema.org JSON-LD for this language version",
      validation: (Rule) => [
        Rule.custom((text?: string) => {
          if (!text) return true;
          try {
            JSON.parse(text);
            return true;
          } catch {
            return bi(
              "No es JSON válido (revisa comillas y comas)",
              "Not valid JSON (check quotes and commas)",
            );
          }
        }),
        Rule.custom((text?: string) => {
          if (!text) return true;
          try {
            const data: unknown = JSON.parse(text);
            const items = Array.isArray(data) ? data : [data];
            return items.every(
              (item) =>
                item !== null && typeof item === "object" && "@context" in item,
            )
              ? true
              : bi(
                  "Le falta «@context»: Google no lo reconocerá",
                  "It has no «@context»: Google won't recognize it",
                );
          } catch {
            return true;
          }
        }).warning(),
      ],
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
