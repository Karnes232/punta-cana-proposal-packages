import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "ProposalPackageHeader",
  title: "Proposal Package Header",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "customizationSelector",
      title: "Customization Selector",
    },
    {
      name: "whatsIncluded",
      title: "Whats Included",
    },
    {
      name: "bookingForm",
      title: "Booking Form",
    },
  ],
  fields: [
    defineField({
      name: "CustomizationSelectorEyebrow",
      title: "Customization Selector Eyebrow",
      type: "localizedString",
      group: "customizationSelector",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "CustomizationSelectorHeadingLine1",
      title: "Customization Selector Heading Line 1",
      type: "localizedString",
      group: "customizationSelector",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "CustomizationSelectorHeadingLine2",
      title: "Customization Selector Heading Line 2",
      type: "localizedString",
      group: "customizationSelector",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "CustomizationSelectorDescription",
      title: "Customization Selector Description",
      type: "localizedText",
      group: "customizationSelector",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "WhatsIncludedEyebrow",
      title: "Whats Included Eyebrow",
      type: "localizedString",
      group: "whatsIncluded",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "WhatsIncludedHeadingLine1",
      title: "Whats Included Heading Line 1",
      type: "localizedString",
      group: "whatsIncluded",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "WhatsIncludedHeadingLine2",
      title: "Whats Included Heading Line 2",
      type: "localizedString",
      group: "whatsIncluded",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "WhatsIncludedDescription",
      title: "Whats Included Description",
      type: "localizedText",
      group: "whatsIncluded",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "BookingFormEyebrow",
      title: "Booking Form Eyebrow",
      type: "localizedString",
      group: "bookingForm",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "BookingFormHeadingLine1",
      title: "Booking Form Heading Line 1",
      type: "localizedString",
      group: "bookingForm",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "BookingFormHeadingLine2",
      title: "Booking Form Heading Line 2",
      type: "localizedString",
      group: "bookingForm",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "BookingFormDescription",
      title: "Booking Form Description",
      type: "localizedText",
      group: "bookingForm",
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
