import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "ContactPageContent",
  title: "Contact Page Content",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "form",
      title: "Form",
    },
    {
      name: "trustBar",
      title: "Trust Bar",
    },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "hero",
    }),
    defineField({
      name: "heroHeadingLine1",
      title: "Hero Heading Line 1",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "hero",
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Hero Heading Line 2",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "hero",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "The image is optional",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: "hero",
    }),
    defineField({
      name: "formEyebrow",
      title: "Form Eyebrow",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "form",
    }),
    defineField({
      name: "formHeadingLine1",
      title: "Form Heading Line 1",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "form",
    }),
    defineField({
      name: "formHeadingLine2",
      title: "Form Heading Line 2",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "form",
    }),
    defineField({
      name: "trustBarStats",
      title: "Trust Bar Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      group: "trustBar",
    }),
  ],
  preview: {
    select: {
      title: "eyebrow.en",
      subtitle: "headingLine1.en",
    },
  },
});
