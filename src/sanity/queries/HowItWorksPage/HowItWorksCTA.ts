import { client } from "@/sanity/lib/client";

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

export const howItWorksCTAQuery = `*[_type == "HowItWorksPageHowItWorksCTA"][0] {
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

export async function howItWorksCTA(): Promise<HowItWorksCTA> {
  return await client.fetch(howItWorksCTAQuery);
}
