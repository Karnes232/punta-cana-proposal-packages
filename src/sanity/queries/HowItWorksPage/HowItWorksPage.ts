import type { Localized } from "@/lib/experience/types";
import { languageDocumentId } from "@/sanity/constants";
import { client } from "@/sanity/lib/client";
import { imageWithDimensions } from "../fragments";

export interface HowItWorksPageHero {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  image?: {
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
}

export interface HowItWorksStepsStep {
  label: string;
  title: string;
  description: string;
}

export interface ReassuranceItem {
  id: string;
  title: string;
  caption: string;
}

export interface HowItWorksSteps {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  steps: HowItWorksStepsStep[];
  reassurance: ReassuranceItem[];
}

/** One of the page's FAQ categories (a filter button). */
export interface HowItWorksFaqsCategories {
  _id: string;
  name: Localized;
}

/** One FAQ row inside the page's `faqs` array (use `_key`). */
export interface HowItWorksFaqs {
  _key: string;
  question: string;
  answer: string;
  category: HowItWorksFaqsCategories | null;
}

export interface HowItWorksFaqsPage {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  faqs: HowItWorksFaqs[];
}

export interface HowItWorksCTA {
  eyebrow: string;
  scriptLine: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  primaryCTA: string;
  primaryCTAHref: string;
  secondaryCTA: string;
  secondaryCTAHref: string;
}

// Typed like the old per-section fetchers: the sections are always written.
export interface HowItWorksPage {
  hero: HowItWorksPageHero;
  steps: HowItWorksSteps;
  faq: HowItWorksFaqsPage;
  faqCategories: HowItWorksFaqsCategories[];
  cta: HowItWorksCTA;
}

type HowItWorksPageRow = Omit<HowItWorksPage, "faq" | "faqCategories"> & {
  faq:
    | (Omit<HowItWorksFaqsPage, "faqs"> & {
        categories: { _key: string; name: string }[] | null;
        faqs: (Omit<HowItWorksFaqs, "category"> & { category?: string })[];
      })
    | null;
};

// The page in one language (howItWorksPage-<language>), falling back to
// English while a language isn't written yet.
export const howItWorksPageQuery = `coalesce(
  *[_type == "howItWorksPage" && _id == $id][0],
  *[_type == "howItWorksPage" && _id == $fallbackId][0]
) {
  hero {
    eyebrow,
    headingLine1,
    headingLine2,
    subheading,
    image {
      ${imageWithDimensions}
    }
  },
  steps {
    eyebrow,
    heading,
    headingAccent,
    subheading,
    steps[] { label, title, description },
    reassurance[] { id, title, caption }
  },
  faq {
    eyebrow,
    heading,
    headingAccent,
    subheading,
    categories[] { _key, name },
    faqs[] { _key, question, answer, category }
  },
  cta {
    eyebrow,
    scriptLine,
    heading,
    headingAccent,
    subheading,
    primaryCTA,
    primaryCTAHref,
    secondaryCTA,
    secondaryCTAHref
  }
}`;

export async function getHowItWorksPage(
  locale: string,
): Promise<HowItWorksPage> {
  const row = await client.fetch<HowItWorksPageRow | null>(
    howItWorksPageQuery,
    {
      id: languageDocumentId("howItWorksPage", locale),
      fallbackId: languageDocumentId("howItWorksPage", "en"),
    },
  );
  // The FAQ components take categories as { _id, name: { [locale]: name } }.
  const faqCategories = (row?.faq?.categories ?? []).map((category) => ({
    _id: category._key,
    name: { [locale]: category.name },
  }));
  const faq = (
    row?.faq
      ? {
          eyebrow: row.faq.eyebrow,
          heading: row.faq.heading,
          headingAccent: row.faq.headingAccent,
          subheading: row.faq.subheading,
          faqs: (row.faq.faqs ?? []).map(({ category, ...item }) => ({
            ...item,
            category: faqCategories.find((c) => c._id === category) ?? null,
          })),
        }
      : null
  ) as HowItWorksFaqsPage;
  return {
    hero: row?.hero as HowItWorksPageHero,
    steps: row?.steps as HowItWorksSteps,
    faq,
    faqCategories,
    cta: row?.cta as HowItWorksCTA,
  };
}
