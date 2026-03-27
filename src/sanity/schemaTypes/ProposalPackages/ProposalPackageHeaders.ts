import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "ProposalPackageHeader",
  title: "Proposal Package Header",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "CustomizationSelectorEyebrow",
      title: "Customization Selector Eyebrow",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "CustomizationSelectorHeadingLine1",
      title: "Customization Selector Heading Line 1",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "CustomizationSelectorHeadingLine2",
      title: "Customization Selector Heading Line 2",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "CustomizationSelectorDescription",
      title: "Customization Selector Description",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "CustomizationSelectorHeadingLine1.en",
      subtitle: "CustomizationSelectorHeadingLine2.en",
    },
  },
});
