import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";

export interface StoriesPageCtaStrip {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
}

export const storiesPageCtaStripQuery = `${pageSectionDocument("storiesCtaStrip")} {
  eyebrow,
  heading,
  headingAccent,
  subheading,
  ctaLabel,
  ctaHref,
}`;

export const getStoriesPageCtaStrip = async (
  locale: string,
): Promise<StoriesPageCtaStrip> => {
  return await client.fetch<StoriesPageCtaStrip>(
    storiesPageCtaStripQuery,
    pageSectionParams("storiesCtaStrip", locale),
  );
};
