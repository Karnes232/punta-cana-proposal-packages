import { defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import { required, section } from "../shared/pageSections";

/**
 * The blog page in one language (blogPage-<language>): its hero, featured
 * post, closing banner and SEO, in the order of the page. The posts and
 * categories are documents of their own. Blog-only languages (de, it, …)
 * show the English page.
 */
export default defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  icon: ComposeIcon,
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
      name: "featuredPost",
      title: bi("Artículo destacado", "Featured post"),
      description: bi(
        "Se muestra encima de los artículos. Solo artículos en el idioma de esta página.",
        "Shown above the posts. Only posts in this page's language.",
      ),
      type: "reference",
      to: [{ type: "blogPost" }],
      group: "content",
      options: {
        disableNew: true,
        filter: ({ document }) => ({
          filter: "language == $language",
          params: { language: document.language },
        }),
      },
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
    prepare: () => ({ title: bi("Página del blog", "Blog page") }),
  },
});
