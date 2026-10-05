import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import { required, section } from "../shared/pageSections";

/**
 * The stories page in one language (storiesPage-<language>): its hero,
 * featured story, closing banner and SEO, in the order of the page. The
 * stories and proposal types are documents of their own.
 */
export default defineType({
  name: "storiesPage",
  title: "Stories Page",
  type: "document",
  icon: StarIcon,
  groups: [
    { name: "content", title: bi("Contenido", "Content"), default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,
    section(
      "hero",
      bi("Portada", "Hero"),
      [
        required("eyebrow", "string", "Eyebrow"),
        required("headingLine1", "string", "Heading Line 1"),
        required("headingLine2", "string", "Heading Line 2"),
        required("subheading", "text", "Subheading"),
        defineField({
          name: "image",
          title: "Image",
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
        }),
      ],
      false,
    ),
    defineField({
      name: "featuredStory",
      title: bi("Historia destacada", "Featured story"),
      description: bi(
        "Se muestra encima de las historias. Solo historias en el idioma de esta página.",
        "Shown above the stories. Only stories in this page's language.",
      ),
      type: "reference",
      to: [{ type: "story" }],
      group: "content",
      options: {
        disableNew: true,
        filter: ({ document }) => ({
          filter: "language == $language",
          params: { language: document.language },
        }),
      },
      validation: (Rule) => Rule.required(),
    }),
    section("cta", bi("Franja final", "Closing banner"), [
      required("eyebrow", "string", "Eyebrow"),
      required("heading", "string", "Heading"),
      required("headingAccent", "string", "Heading Accent"),
      required("subheading", "text", "Subheading"),
      required("ctaLabel", "string", "CTA Label"),
      required("ctaHref", "string", "CTA Href"),
    ]),
    // Last, like the bottom of the page: this language's SEO.
    defineField({
      name: "seo",
      title: "SEO",
      type: "blogPostSeo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: bi("Página de historias", "Stories page") }),
  },
});
