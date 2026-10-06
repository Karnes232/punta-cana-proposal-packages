import { defineField, defineType } from "sanity";
import { altIfImage, imageFileIfSet, slugFormat } from "../shared/validation";
import { ComposeIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { ALL_LOCALES } from "../../../i18n/locales";

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
      // Posts that are translations of each other share a group; one per
      // language, or the language links point at the wrong one.
      validation: (R) => [
        R.required(),
        R.custom(async (group: string | undefined, context) => {
          const { document, getClient } = context;
          if (!group || !document?.language) return true;
          const id = document._id.replace(/^drafts\./, "");
          const other = await getClient({ apiVersion: "2026-03-07" }).fetch<
            string | null
          >(
            `*[_type == "blogPost" && translationGroup == $group
              && language == $language && !(_id in [$id, $draft])][0].slug.current`,
            { group, language: document.language, id, draft: `drafts.${id}` },
          );
          return other
            ? bi(
                `Ya hay otro artículo en este idioma en el grupo («${other}»)`,
                `Another post in this language is in the group («${other}»)`,
              )
            : true;
        }).warning(),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title" },
      validation: (R) => [R.required(), R.custom(slugFormat)],
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
      to: [{ type: "blogCategory" }],
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
      validation: (R) => R.required().integer().min(1).max(60),
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
      validation: (R) => [
        R.required().assetRequired(),
        R.custom(altIfImage).warning(),
      ],
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
          validation: (R) => [
            R.custom(imageFileIfSet),
            R.custom(altIfImage).warning(),
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
      validation: (R) => R.required().min(1),
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
