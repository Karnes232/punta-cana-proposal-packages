import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "HomePagePackageCategories",
  title: "Home Page Package Categories",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingLine1",
      title: "Heading Line 1",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingLine2",
      title: "Heading Line 2",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "HomePagePackageCategory" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "eyebrow.en",
      subtitle: "headingLine1.en",
    },
  },
});
