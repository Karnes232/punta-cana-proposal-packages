import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";

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

export const howItWorksCTAQuery = `${pageSectionDocument("howItWorksCta")} {
  eyebrow,
  scriptLine,
  heading,
  headingAccent,
  subheading,
  primaryCTA,
  primaryCTAHref,
  secondaryCTA,
  secondaryCTAHref,
}`;

export async function getHowItWorksCta(locale: string): Promise<HowItWorksCTA> {
  return await client.fetch(
    howItWorksCTAQuery,
    pageSectionParams("howItWorksCta", locale),
  );
}
