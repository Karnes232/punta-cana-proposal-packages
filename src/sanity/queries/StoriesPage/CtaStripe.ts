import { client } from "@/sanity/lib/client";

export interface StoriesPageCtaStrip {
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

export const storiesPageCtaStripQuery = `*[_type == "StoriesPageCtaStrip"][0] {
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

export const storiesPageCtaStrip = async (): Promise<StoriesPageCtaStrip> => {
  return await client.fetch<StoriesPageCtaStrip>(storiesPageCtaStripQuery);
};
