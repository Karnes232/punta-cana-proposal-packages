import { client } from "@/sanity/lib/client";
import { PAGE_SINGLETONS } from "@/sanity/constants";

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

export const storiesPageCtaStripQuery = `*[_type == "storiesCtaStrip" && _id == $id][0] {
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

export const getStoriesPageCtaStrip =
  async (): Promise<StoriesPageCtaStrip> => {
    return await client.fetch<StoriesPageCtaStrip>(storiesPageCtaStripQuery, {
      id: PAGE_SINGLETONS.storiesCtaStrip,
    });
  };
