import { defineField, defineType, type SlugValue } from "sanity";
import { altIfImage, imageFileIfSet, slugFormat } from "../shared/validation";
import { isUniqueInLanguage, languageField } from "../shared/languageField";
import { bi } from "../shared/labels";

export default defineType({
  name: "story",
  title: "Individual Story",
  type: "document",
  groups: [
    {
      name: "basic",
      title: "Basic",
    },
    {
      name: "story",
      title: "Story",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    languageField,
    // ── Identity ──────────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "names", isUnique: isUniqueInLanguage },
      // Every language uses the English story's slug (/fr/stories/<slug>).
      validation: (R) => [
        R.required(),
        R.custom(slugFormat),
        R.custom(async (slug: SlugValue | undefined, context) => {
          const { document, getClient } = context;
          if (!slug?.current || !document || document.language === "en")
            return true;
          const id = document._id.replace(/^drafts\./, "");
          const english = await getClient({ apiVersion: "2026-03-07" }).fetch<
            string | null
          >(
            `*[_type == "translation.metadata" && references($id)][0]
              .translations[_key == "en"][0].value->slug.current`,
            { id },
          );
          return !english || english === slug.current
            ? true
            : bi(
                `La versión en inglés usa «${english}»`,
                `The English version uses «${english}»`,
              );
        }).warning(),
      ],
    }),

    defineField({
      name: "names",
      title: "Couple Names",
      description: 'e.g. "Sofia & Alejandro"',
      type: "string",
      group: "basic",
      validation: (R) => R.required(),
    }),

    // ── Proposal details ──────────────────────────────────────
    defineField({
      name: "proposalType",
      title: "Proposal Type",
      group: "basic",
      type: "reference",
      to: [{ type: "storyType" }],
      options: { disableNew: true },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "packageTag",
      title: "Package Tag Label",
      description:
        'Display label shown on cards — e.g. "Classic Beach Package"',
      group: "basic",
      type: "string",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "date",
      title: "Proposal Date",
      group: "basic",
      type: "date",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "location",
      title: "Location",
      description: 'e.g. "Playa Bávaro, Punta Cana"',
      group: "basic",
      type: "string",
      validation: (R) => R.required(),
    }),

    // ── Media ─────────────────────────────────────────────────
    defineField({
      name: "heroPhoto",
      title: "Hero Photo",
      description: "Main photo — used in the hero and on story cards.",
      group: "basic",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
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
      title: "Photo Gallery",
      description:
        "Additional proposal photos shown in the gallery grid on the story page.",
      group: "story",
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

    // ── Content ───────────────────────────────────────────────
    defineField({
      name: "quote",
      title: "Pull Quote",
      description:
        "Short 1–2 sentence quote shown on cards and at the top of the story page.",
      group: "basic",
      type: "string",
      validation: (R) => [
        R.required(),
        R.max(200).warning(
          bi(
            "Mejor 1 o 2 frases (máx. 200)",
            "Better 1 or 2 sentences (max 200)",
          ),
        ),
      ],
    }),

    defineField({
      name: "body",
      title: "Story Body",
      description: "Full story — supports rich text in both languages.",
      type: "array",
      of: [{ type: "block" }],
      group: "story",
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

  // ── Preview ───────────────────────────────────────────────
  preview: {
    select: {
      title: "names",
      typeEs: "proposalType.label.es",
      typeEn: "proposalType.label.en",
      date: "date",
      media: "heroPhoto",
    },
    prepare({ title, typeEs, typeEn, date, media }) {
      return {
        title,
        subtitle: [typeEs && typeEn ? bi(typeEs, typeEn) : "", date]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },

  orderings: [
    {
      title: bi("Más recientes", "Newest first"),
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
