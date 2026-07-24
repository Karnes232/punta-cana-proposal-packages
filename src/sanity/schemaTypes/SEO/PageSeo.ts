import { defineField, defineType } from "sanity";

export default defineType({
  name: "PageSeo",
  title: "Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Classic Proposals", value: "classic-proposals" },
          { title: "Modern Proposals", value: "modern-proposals" },
          { title: "Dining Proposals", value: "dining-proposals" },
          { title: "Adventure Proposals", value: "adventure-proposals" },
          { title: "Stories", value: "stories" },
          { title: "How It Works", value: "how-it-works" },
          { title: "FAQ", value: "faq" },
          { title: "Contact", value: "contact" },
          { title: "Blog", value: "blog" },
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms of Service", value: "terms-of-service" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
