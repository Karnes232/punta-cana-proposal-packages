import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "IndividualProposalPackage",
  title: "Individual Proposal Package",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "package",
      title: "Package",
    },
    {
      name: "gallery",
      title: "Gallery",
    },
    {
      name: "inclusions",
      title: "Inclusions",
    },
    {
      name: "variants",
      title: "Variants",
    },
    {
      name: "addons",
      title: "Add-ons",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    // ── Package group ──
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      group: "package",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "localizedString",
      group: "package",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en" },
      group: "package",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Base Price",
      description: "Starting price before variants or add-ons",
      type: "number",
      group: "package",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      group: "package",
      validation: (Rule) => Rule.required(),
    }),

    // ── Gallery group ──
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      description:
        "Images for the carousel. First image is used as the hero fallback.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              description:
                "e.g. 'Blush & Ivory variant' — shown below the image in the carousel",
              type: "localizedString",
            }),
          ],
        }),
      ],
      group: "gallery",
      validation: (Rule) => Rule.min(1),
    }),

    // ── Inclusions group ──
    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Utensils", value: "utensils" },
                  { title: "Sparkles", value: "sparkles" },
                  { title: "Camera", value: "camera" },
                  { title: "Car", value: "car" },
                  { title: "Wine", value: "wine" },
                  { title: "Flower", value: "flower" },
                  { title: "Clock", value: "clock" },
                  { title: "Candle", value: "candle" },
                  { title: "Music", value: "music" },
                  { title: "Shield", value: "shield" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "localizedText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "description.en",
            },
            prepare({ title, subtitle }) {
              return { title, subtitle };
            },
          },
        }),
      ],
      group: "inclusions",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "cardSelectLabel",
      title: "Card Select Label",
      type: "localizedString",
      group: "inclusions",
      validation: (Rule) => Rule.required(),
      description:
        "Label for the select button on the card. e.g. 'Select this package'",
    }),

    // ── Variants group ──
    defineField({
      name: "variants",
      title: "Package Variants",
      validation: (Rule) => Rule.required().min(1),
      description:
        "Different versions of this package the client can choose from (e.g. color themes, setup styles). Each has its own price.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Variant Name",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Short Description",
              type: "localizedText",
            }),
            defineField({
              name: "price",
              title: "Price",
              description:
                "Full price for this variant (not an uplift — the actual price)",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Preview Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "name.en",
              subtitle: "price",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle: subtitle ? `$${subtitle}` : undefined,
                media,
              };
            },
          },
        }),
      ],
      group: "variants",
    }),

    // ── Add-ons group ──
    defineField({
      name: "addons",
      title: "Available Add-ons",
      description:
        "Optional extras the client can add to their booking (e.g. violinist, extra hour, fireworks)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Add-on Name",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Short Description",
              type: "localizedText",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Music", value: "music" },
                  { title: "Clock", value: "clock" },
                  { title: "Sparkles", value: "sparkles" },
                  { title: "Flower", value: "flower" },
                  { title: "Camera", value: "camera" },
                  { title: "Wine", value: "wine" },
                  { title: "Candle", value: "candle" },
                  { title: "Utensils", value: "utensils" },
                  { title: "Shield", value: "shield" },
                  { title: "Car", value: "car" },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: "name.en",
              subtitle: "price",
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle ? `+$${subtitle}` : undefined,
              };
            },
          },
        }),
      ],
      group: "addons",
    }),

    // ── SEO group ──
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "price",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Starting at $${subtitle}` : undefined,
        media,
      };
    },
  },
});
