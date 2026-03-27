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
      name: "inclusions",
      title: "Inclusions",
    },
    {
      name: "customizationOptions",
      title: "Customization Options",
    },
  ],
  fields: [
    defineField({
      name: "image",
      title: "Image",
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
      name: "price",
      title: "Price",
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
        }),
      ],
      group: "inclusions",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "colorCustomizationOptions",
      title: "Color Customization Options",
      type: "array",
      of: [{ type: "CustomizationOptions" }],
      group: "customizationOptions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "floralCustomizationOptions",
      title: "Floral Customization Options",
      type: "array",
      of: [{ type: "CustomizationOptions" }],
      group: "customizationOptions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "toneCustomizationOptions",
      title: "Tone Customization Options",
      type: "array",
      of: [{ type: "CustomizationOptions" }],
      group: "customizationOptions",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "price",
      media: "image",
    },
  },
});
