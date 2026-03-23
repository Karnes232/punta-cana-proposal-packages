import { client } from "@/sanity/lib/client";

export interface FaqContactStrip {
  eyebrow: {
    en: string;
    es: string;
  };
  line1: {
    en: string;
    es: string;
  };
  line2: {
    en: string;
    es: string;
  };
  body: {
    en: string;
    es: string;
  };
  cta: {
    en: string;
    es: string;
  };
}

export const faqContactStripQuery = `*[_type == "FaqsPageFaqContactStrip"][0] {
  eyebrow {
    en,
    es
  },
  line1 {
    en,
    es
  },
  line2 {
    en,
    es
  },
  body {
    en,
    es
  },
  cta {
    en,
    es
  }
}`;

export const faqContactStrip = async (): Promise<FaqContactStrip> => {
  const query = await client.fetch(faqContactStripQuery);
  return query;
};
