import { client } from "@/sanity/lib/client";

export interface HomePageHowItWorks {
  eyebrow: {
    en: string;
    es: string;
  };
  headingLine1: {
    en: string;
    es: string;
  };
  headingLine2: {
    en: string;
    es: string;
  };
  ctaLabel: {
    en: string;
    es: string;
  };
  ctaHref: string;
  steps: HomePageHowItWorksStep[];
}

export interface HomePageHowItWorksStep {
  step: number;
  icon: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
}

export const homePageHowItWorksQuery = `*[_type == "HomePageHowItWorks"][0] {
  eyebrow {
    en,
    es
  },
  headingLine1 {
    en,
    es
  },
  headingLine2 {
    en,
    es
  },
  ctaLabel {
    en,
    es
  },
  ctaHref,
  steps[] {
    step,
    icon,
    title {
      en,
      es
    },
    description {
      en,
      es
    }
  }
}`;

export const homePageHowItWorks = async (): Promise<HomePageHowItWorks> => {
  return await client.fetch(homePageHowItWorksQuery);
};