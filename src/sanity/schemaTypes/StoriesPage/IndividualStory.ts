import { defineField, defineType } from "sanity";

export default defineType({
  name: "individualStory",
  title: "Individual Story",
  type: "document",
  fields: [
    // ── Identity ──────────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "names" },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "names",
      title: "Couple Names",
      description: 'e.g. "Sofia & Alejandro"',
      type: "string",
      validation: (R) => R.required(),
    }),

    // ── Proposal details ──────────────────────────────────────
    defineField({
      name: "proposalType",
      title: "Proposal Type",
      type: "reference",
      to: [{ type: "ProposalType" }],
      options: { disableNew: true },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "packageTag",
      title: "Package Tag Label",
      description:
        'Display label shown on cards — e.g. "Classic Beach Package"',
      type: "localizedString",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "date",
      title: "Proposal Date",
      type: "date",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "location",
      title: "Location",
      description: 'e.g. "Playa Bávaro, Punta Cana"',
      type: "localizedString",
      validation: (R) => R.required(),
    }),

    // ── Media ─────────────────────────────────────────────────
    defineField({
      name: "heroPhoto",
      title: "Hero Photo",
      description: "Main photo — used in the hero and on story cards.",
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
        "Additional proposal photos shown in the gallery grid on the story page.",
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
      name: "quote",
      title: "Pull Quote",
      description:
        "Short 1–2 sentence quote shown on cards and at the top of the story page.",
      type: "localizedString",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "body",
      title: "Story Body",
      description: "Full story — supports rich text in both languages.",
      type: "localizedBlock",
      validation: (R) => R.required(),
    }),
  ],

  // ── Preview ───────────────────────────────────────────────
  preview: {
    select: {
      title: "names",
      subtitle: "proposalType.title",
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
