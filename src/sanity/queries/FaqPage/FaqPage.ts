import type { Localized } from "@/lib/experience/types";
import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";
import { imageWithDimensions } from "../fragments";

export interface FaqsPageHeroComponent {
  heroImage?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
}

/** A filter button: one of the page's question categories. */
export interface FaqsCategories {
  _id: string;
  value: string;
  label: Localized;
}

export interface Faqs {
  _id: string;
  question: string;
  answer: string;
  /** Missing when the question's category was removed from the page. */
  category?: FaqsCategories;
}

export interface FaqContactStrip {
  eyebrow: string;
  line1: string;
  line2: string;
  body: string;
  cta: string;
}

// Typed like the old per-section fetchers: the sections are always written.
export interface FaqPage {
  hero: FaqsPageHeroComponent | null;
  faqsCategories: FaqsCategories[];
  faqs: Faqs[];
  contactStrip: FaqContactStrip | null;
}

type FaqPageRow = {
  hero: FaqsPageHeroComponent | null;
  faq: {
    categories: { _key: string; name: string }[] | null;
    faqs: (Omit<Faqs, "category"> & { category?: string })[] | null;
  } | null;
  contactStrip: FaqContactStrip | null;
};

// The page in one language (faqPage-<language>), falling back to English
// while a language isn't written yet.
export const faqPageQuery = `${pageSectionDocument("faqPage")} {
  hero {
    heroImage {
      ${imageWithDimensions}
    },
    eyebrow,
    headingLine1,
    headingLine2,
    subheading
  },
  faq {
    categories[] { _key, name },
    faqs[] { "_id": _key, question, answer, category }
  },
  contactStrip {
    eyebrow,
    line1,
    line2,
    body,
    cta
  }
}`;

export async function getFaqPage(locale: string): Promise<FaqPage> {
  const row = await client.fetch<FaqPageRow | null>(
    faqPageQuery,
    pageSectionParams("faqPage", locale),
  );
  // The filter takes categories as { _id, value, label: { [locale]: name } }.
  const faqsCategories = (row?.faq?.categories ?? []).map((category) => ({
    _id: category._key,
    value: category._key,
    label: { [locale]: category.name },
  }));
  const faqs: Faqs[] = (row?.faq?.faqs ?? []).map(({ category, ...item }) => ({
    ...item,
    category: faqsCategories.find((c) => c.value === category),
  }));
  return {
    hero: row?.hero ?? null,
    faqsCategories,
    faqs,
    contactStrip: row?.contactStrip ?? null,
  };
}
