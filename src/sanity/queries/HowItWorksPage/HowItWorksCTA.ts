import { client } from "@/sanity/lib/client";
import { PAGE_SINGLETONS } from "@/sanity/constants";

export interface HowItWorksCTA {
  eyebrow: {
    en: string;
    es: string;
  };
  scriptLine: {
    en: string;
    es: string;
  };
  heading: {
    en: string;
    es: string;
  };
  headingAccent: {
    en: string;
    es: string;
  };
  subheading: {
    en: string;
    es: string;
  };
  primaryCTA: {
    en: string;
    es: string;
  };
  primaryCTAHref: string;
  secondaryCTA: {
    en: string;
    es: string;
  };
  secondaryCTAHref: string;
}

export const howItWorksCTAQuery = `*[_type == "howItWorksCta" && _id == $id][0] {
  eyebrow {
    en,
    es
  },
  scriptLine {
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
  primaryCTA {
    en,
    es
  },
  primaryCTAHref,
  secondaryCTA {
    en,
    es
  },
  secondaryCTAHref,
}`;

export async function getHowItWorksCta(): Promise<HowItWorksCTA> {
  return await client.fetch(howItWorksCTAQuery, {
    id: PAGE_SINGLETONS.howItWorksCta,
  });
}
