import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";

export interface FaqContactStrip {
  eyebrow: string;
  line1: string;
  line2: string;
  body: string;
  cta: string;
}

export const faqContactStripQuery = `${pageSectionDocument("faqContactStrip")} {
  eyebrow,
  line1,
  line2,
  body,
  cta
}`;

export const getFaqContactStrip = async (
  locale: string,
): Promise<FaqContactStrip> => {
  const query = await client.fetch(
    faqContactStripQuery,
    pageSectionParams("faqContactStrip", locale),
  );
  return query;
};
