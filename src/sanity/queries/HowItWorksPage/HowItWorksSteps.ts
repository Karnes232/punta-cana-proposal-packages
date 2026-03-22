import { client } from "@/sanity/lib/client";

export interface HowItWorksStepsStep {
  label: {
    en: string;
    es: string;
  };
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
}

export interface ReassuranceItem {
  id: string;
  title: {
    en: string;
    es: string;
  };
  caption: {
    en: string;
    es: string;
  };
}
export interface HowItWorksSteps {
  eyebrow: {
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
  steps: HowItWorksStepsStep[];
  reassurance: ReassuranceItem[];
}

export const howItWorksPageHowItWorksStepsQuery = `*[_type == "HowItWorksPageHowItWorksSteps"][0] {
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
  steps[] {
    label {
      en,
      es
    },
    title {
      en,
      es
    },
    description {
      en,
      es
    }
  },
  reassurance[] {
    id,
    title {
      en,
      es
    },
    caption {
      en,
      es
    }
  }
}`;

export const howItWorksPageHowItWorksSteps =
  async (): Promise<HowItWorksSteps> => {
    return await client.fetch(howItWorksPageHowItWorksStepsQuery);
  };
