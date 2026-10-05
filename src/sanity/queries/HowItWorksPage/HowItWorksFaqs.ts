import type { Localized } from "@/lib/experience/types";
import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";

export interface HowItWorksFaqsCategories {
  _id: string;
  name: Localized;
}

/** Expanded `category->` from howItWorksFaqsPageQuery */
export interface HowItWorksFaqsCategory {
  _id: string;
  name: Localized;
}

/** One FAQ row inside the page document’s `faqs` array (object, not a document — use `_key`). */
export interface HowItWorksFaqs {
  _key: string;
  question: string;
  answer: string;
  category: HowItWorksFaqsCategory | null;
}

export interface HowItWorksFaqsPage {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  faqs: HowItWorksFaqs[];
}

export const howItWorksFaqsCategoriesQuery = `*[_type == "howItWorksFaqCategory"] {
    _id,
    name
}`;

export async function getHowItWorksFaqCategories(): Promise<
  HowItWorksFaqsCategories[]
> {
  return await client.fetch(howItWorksFaqsCategoriesQuery);
}

export const howItWorksFaqsPageQuery = `${pageSectionDocument("howItWorksFaq")} {
        _id,
        eyebrow,
        heading,
        headingAccent,
        subheading,
        faqs[] {
            _key,
            question,
            answer,
            category -> {
                _id,
                name
            }
        }
    }
`;

export async function getHowItWorksFaqs(
  locale: string,
): Promise<HowItWorksFaqsPage> {
  return await client.fetch(
    howItWorksFaqsPageQuery,
    pageSectionParams("howItWorksFaq", locale),
  );
}
