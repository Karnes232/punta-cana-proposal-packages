import { client } from "@/sanity/lib/client";

export interface HomePageTrustIndicators {
  items: {
    icon: string;
    value: {
      en: string;
      es: string;
    };
    label: {
      en: string;
      es: string;
    };
    sublabel: {
      en: string;
      es: string;
    };
  }[];
}

export const homePageTrustIndicatorsQuery = `*[_type == "trustIndicators"][0] {
  items[] {
    icon,
    value {
      en,
      es
    },
    label {
      en,
      es
    },
    sublabel {
      en,
      es
    }
  }
}`;

export const homePageTrustIndicators =
  async (): Promise<HomePageTrustIndicators> => {
    return await client.fetch(homePageTrustIndicatorsQuery);
  };
