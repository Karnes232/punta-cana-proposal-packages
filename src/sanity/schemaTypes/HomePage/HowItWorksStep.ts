import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "HomePageHowItWorksStep",
  title: "Home Page How It Works Step",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "step",
      title: "Step",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ["package", "customize", "setup", "propose"],
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
  },
});
