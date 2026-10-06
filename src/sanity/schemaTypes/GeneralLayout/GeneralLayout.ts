import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { missingLanguages } from "../shared/validation";

export default defineType({
  name: "generalLayout",
  title: "General Layout",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyDescription",
      title: "Company Description",
      type: "localizedText",
      // Shown in the footer in the visitor's language (no fallback).
      validation: (Rule) => [
        Rule.required().custom((text?: { en?: string; es?: string }) =>
          text?.en?.trim() && text?.es?.trim()
            ? true
            : bi(
                "Escribe la descripción en inglés y en español",
                "Write the description in English and Spanish",
              ),
        ),
        Rule.custom(missingLanguages(["fr", "pt"])).warning(),
      ],
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true, // Enables the hotspot functionality for image cropping
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Upload your site favicon here",
      options: { hotspot: false },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "telephone",
      title: "Telephone",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((phone?: string) =>
          !phone || /^\d{11}$/.test(phone)
            ? true
            : bi(
                "11 dígitos con el código de país, sin espacios: 18091234567",
                "11 digits with the country code, no spaces: 18091234567",
              ),
        ),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      description: "Número con código de país / Number with country code",
      validation: (Rule) =>
        Rule.custom((number?: string) =>
          !number || /^\+?\d{10,15}$/.test(number)
            ? true
            : bi(
                "Solo dígitos con el código de país (opcional «+»)",
                "Digits only with the country code (optional «+»)",
              ),
        ),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      description: "Add your social media links:",
      fields: [
        {
          name: "facebook",
          title: "Facebook URL",
          type: "url",
          initialValue: "https://facebook.com/",
        },
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
          initialValue: "https://instagram.com/",
        },
        {
          name: "xURL",
          title: "X URL",
          type: "url",
          initialValue: "https://x.com/",
        },
        {
          name: "MessengerURL",
          title: "Messenger URL",
          type: "url",
          initialValue: "https://m.me/",
        },
      ],
      options: {
        collapsed: false,
        collapsible: true,
        columns: 1,
      },
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      media: "companyLogo",
    },
  },
});
