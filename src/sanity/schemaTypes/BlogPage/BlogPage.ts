import { defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";
import { bi } from "../shared/labels";
import { languageField } from "../shared/languageField";
import { sameLanguage } from "../shared/validation";
import {
  link,
  optionalImage,
  pageSeo,
  required,
  section,
} from "../shared/pageSections";

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
        optionalImage("image", "Image"),
      ],
      false,
      true,
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
      validation: (Rule) => Rule.custom(sameLanguage).warning(),
    }),
    section(
      "cta",
      bi("Franja final", "Closing banner"),
      [
        required("eyebrow", "string", "Eyebrow"),
        required("heading", "string", "Heading"),
        required("headingAccent", "string", "Heading Accent"),
        required("subheading", "text", "Subheading"),
        required("ctaLabel", "string", "CTA Label"),
        link("ctaHref", "CTA Href"),
      ],
      true,
      true,
    ),
    // Last, like the bottom of the page: this language's SEO.
    pageSeo(),
  ],
  preview: {
    prepare: () => ({ title: bi("Página del blog", "Blog page") }),
  },
});
