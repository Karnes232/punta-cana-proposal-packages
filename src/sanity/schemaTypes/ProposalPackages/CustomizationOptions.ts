import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "CustomizationOptions",
  title: "Customization Options",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "label",
      title: "label",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Premium", value: "premium" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label.en",
      subtitle: "tier",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle
          ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1)
          : undefined,
      };
    },
  },
});
