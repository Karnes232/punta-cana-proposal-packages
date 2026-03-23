import { client } from "@/sanity/lib/client";

export interface HowItWorksFaqsCategories {
  _id: string;
  name: { en: string; es: string };
}

/** Expanded `category->` from howItWorksFaqsPageQuery */
export interface HowItWorksFaqsCategory {
  _id: string;
  name: { en: string; es: string };
}

/** One FAQ row inside the page document’s `faqs` array (object, not a document — use `_key`). */
export interface HowItWorksFaqs {
  _key: string;
  question: { en: string; es: string };
  answer: { en: string; es: string };
  category: HowItWorksFaqsCategory | null;
}

export interface HowItWorksFaqsPage {
  eyebrow: { en: string; es: string };
  heading: { en: string; es: string };
  headingAccent: { en: string; es: string };
  subheading: { en: string; es: string };
  faqs: HowItWorksFaqs[];
}

export const howItWorksFaqsCategoriesQuery = `*[_type == "HowItWorksPageHowItWorksFaqCategory"] {
    _id,
    name {
        en,
        es
    }
}`;

export async function howItWorksFaqsCategories(): Promise<
  HowItWorksFaqsCategories[]
> {
  return await client.fetch(howItWorksFaqsCategoriesQuery);
}

export const howItWorksFaqsPageQuery = `*[_type == "HowItWorksPageHowItWorksFAQ"][0] {
        _id,
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
        faqs[] {
            _key,
            question {
                en,
                es
            },
            answer {
                en,
                es
            },
            category -> {
                _id,
                name {
                    en,
                    es
                }
            }
        }
    }
`;

export async function howItWorksFaqsPage(): Promise<HowItWorksFaqsPage> {
  return await client.fetch(howItWorksFaqsPageQuery);
}
