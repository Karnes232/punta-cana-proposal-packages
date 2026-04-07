import { defineField, defineType } from "sanity";

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
          validation: (Rule) =>
            Rule.max(60).warning(
              "Meta titles longer than 60 characters may be truncated",
            ),
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) =>
            Rule.max(160).warning(
              "Meta descriptions longer than 160 characters may be truncated",
            ),
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
      validation: (Rule) =>
        Rule.custom((text) => {
          if (!text) return true;
          try {
            JSON.parse(text);
            return true;
          } catch {
            return "Must be valid JSON";
          }
        }),
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
