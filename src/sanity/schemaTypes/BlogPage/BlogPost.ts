import { defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";
import { ALL_LOCALES } from "../../../i18n/blogLocales";

const languageOptions = ALL_LOCALES.map((code) => ({
  title: code.toUpperCase(),
  value: code,
}));

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: ComposeIcon,
  groups: [
    { name: "basic", title: "Basic" },
    { name: "blogPost", title: "Blog Post" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "language",
      title: "Post language",
      description:
        "This document is one language version. Create another blog post per translation and use the same Translation group ID.",
      type: "string",
      group: "basic",
      options: {
        list: languageOptions,
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "translationGroup",
      title: "Translation group ID",
      description:
        "Same ID on all language versions of this article (any short unique string, e.g. proposal-tips-2025).",
      type: "string",
      group: "basic",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Post title",
      type: "string",
      group: "basic",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      group: "basic",
      type: "reference",
      to: [{ type: "BlogCategory" }],
      options: { disableNew: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "categoryTag",
      title: "Category tag label",
      description: 'Shown on cards, e.g. "Proposal tips"',
      type: "string",
      group: "basic",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      group: "basic",
      type: "date",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number",
      group: "basic",
      validation: (R) => R.required().min(1).max(60),
    }),
    defineField({
      name: "heroPhoto",
      title: "Hero photo",
      type: "image",
      group: "basic",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      group: "blogPost",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "basic",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "body",
      title: "Post body",
      type: "array",
      of: [{ type: "block" }],
      group: "blogPost",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "blogPostSeo",
      group: "seo",
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      media: "heroPhoto",
      group: "translationGroup",
    },
    prepare({ title, language, media, group }) {
      return {
        title: title || "Untitled",
        subtitle: `${(language || "").toUpperCase()} · group: ${group || "—"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
