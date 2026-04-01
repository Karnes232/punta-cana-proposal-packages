import { defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: ComposeIcon,
  fields: [
    // ── Identity ──────────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "title",
      title: "Post Title",
      description: "Full post title in both languages.",
      type: "localizedString",
      validation: (R) => R.required(),
    }),

    // ── Classification ────────────────────────────────────────
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "BlogCategory" }],
      options: { disableNew: true },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "categoryTag",
      title: "Category Tag Label",
      description:
        'Display label shown on cards — e.g. "Proposal Tips" / "Consejos de Propuesta"',
      type: "localizedString",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "date",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      description: "Estimated reading time — e.g. 5",
      type: "number",
      validation: (R) => R.required().min(1).max(60),
    }),

    // ── Media ─────────────────────────────────────────────────
    defineField({
      name: "heroPhoto",
      title: "Hero Photo",
      description: "Main photo — used in the hero and on blog cards.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (R) => R.required(),
    }),

    defineField({
      name: "gallery",
      title: "Photo Gallery",
      description:
        "Additional photos shown in the gallery grid on the post page.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "localizedString",
            }),
          ],
        },
      ],
    }),

    // ── Content ───────────────────────────────────────────────
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "Short 1–2 sentence summary shown on cards and at the top of the post page.",
      type: "localizedString",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "body",
      title: "Post Body",
      description: "Full post — supports rich text in both languages.",
      type: "localizedBlock",
      validation: (R) => R.required(),
    }),
  ],

  // ── Preview ───────────────────────────────────────────────
  preview: {
    select: {
      title: "title.en",
      subtitle: "category.label.en",
      media: "heroPhoto",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});