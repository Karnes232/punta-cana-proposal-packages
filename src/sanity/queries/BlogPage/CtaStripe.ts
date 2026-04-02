import { client } from "@/sanity/lib/client";

export interface BlogPageCtaStrip {
  eyebrow: {
    en: string;
    es: string;
  };
  heading: {
    en: string;
    es: string;
  };
  headingAccent: {
    en: string;
    es: string;
  };
  subheading: {
    en: string;
    es: string;
  };
  ctaLabel: {
    en: string;
    es: string;
  };
  ctaHref: string;
}

export const blogPageCtaStripQuery = `*[_type == "BlogPageCtaStrip"][0] {
  eyebrow {
    en,
    es
  },
  heading {
    en,
    es
  },
  headingAccent {
    en,
    es
  },
  subheading {
    en,
    es
  },
  ctaLabel {
    en,
    es
  },
  ctaHref,
}`;

export const blogPageCtaStrip = async () => {
  return await client.fetch<BlogPageCtaStrip>(blogPageCtaStripQuery);
};
