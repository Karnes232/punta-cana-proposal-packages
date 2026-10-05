import type { Localized } from "@/lib/experience/types";
import { client } from "@/sanity/lib/client";

/** FAQ categories are shared by every language: the label holds each one. */
export interface FaqsCategories {
  _id: string;
  value: string;
  label: Localized;
}

/** One FAQ in one language (FAQs are one document per language). */
export interface Faqs {
  _id: string;
  question: string;
  answer: string;
  category: FaqsCategories;
}

export const faqsPageFaqsCategoriesQuery = `*[_type == "faqCategory"] {
  _id,
  value,
  label
}`;

export const faqsPageFaqsQuery = `*[_type == "faq" && language == $language] {
  _id,
  question,
  answer,
  category -> {
    _id,
    value,
    label
  }
}`;

export async function getFaqCategories(): Promise<FaqsCategories[]> {
  return await client.fetch(faqsPageFaqsCategoriesQuery);
}

export async function getFaqs(language: string): Promise<Faqs[]> {
  return await client.fetch(faqsPageFaqsQuery, { language });
}
