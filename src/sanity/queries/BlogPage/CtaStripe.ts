import type { BlogLocalizedValue } from "@/i18n/pickBlogLocalized";
import { client } from "@/sanity/lib/client";
import { blogLocalizedStringGroq } from "./blogLocalizedProjection";

export interface BlogPageCtaStrip {
  eyebrow: BlogLocalizedValue;
  heading: BlogLocalizedValue;
  headingAccent: BlogLocalizedValue;
  subheading: BlogLocalizedValue;
  ctaLabel: BlogLocalizedValue;
  ctaHref: string;
}

export const blogPageCtaStripQuery = `*[_type == "BlogPageCtaStrip"][0] {
  eyebrow ${blogLocalizedStringGroq},
  heading ${blogLocalizedStringGroq},
  headingAccent ${blogLocalizedStringGroq},
  subheading ${blogLocalizedStringGroq},
  ctaLabel ${blogLocalizedStringGroq},
  ctaHref,
}`;

export const blogPageCtaStrip = async () => {
  return await client.fetch<BlogPageCtaStrip>(blogPageCtaStripQuery);
};
