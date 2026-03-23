import { client } from "@/sanity/lib/client";

export interface FaqsCategories {
  _id: string;
  value: string;
  labelEn: string;
  labelEs: string;
}

export interface Faqs {
  _id: string;
  question: { en: string; es: string };
  answer: { en: string; es: string };
  category: FaqsCategories;
}

export const faqsPageFaqsCategoriesQuery = `*[_type == "FaqsPageFaqsCategories"] {
    _id,
    value,
    labelEn,
    labelEs
}
`;

export const faqsPageFaqsQuery = `*[_type == "FaqsPageFaqs"] {
    _id,
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
        value,
        labelEn,
        labelEs
    }
}
`;

export async function faqsPageFaqsCategories(): Promise<FaqsCategories[]> {
  return await client.fetch(faqsPageFaqsCategoriesQuery);
}

export async function faqsPageFaqs(): Promise<Faqs[]> {
  return await client.fetch(faqsPageFaqsQuery);
}
