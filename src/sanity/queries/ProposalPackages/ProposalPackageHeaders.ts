import { client } from "@/sanity/lib/client";

export interface ProposalPackageHeader {
  CustomizationSelectorEyebrow: {
    en: string;
    es: string;
  };
  CustomizationSelectorHeadingLine1: {
    en: string;
    es: string;
  };
  CustomizationSelectorHeadingLine2: {
    en: string;
    es: string;
  };
  CustomizationSelectorDescription: {
    en: string;
    es: string;
  };
  WhatsIncludedEyebrow: {
    en: string;
    es: string;
  };
  WhatsIncludedHeadingLine1: {
    en: string;
    es: string;
  };
  WhatsIncludedHeadingLine2: {
    en: string;
    es: string;
  };
  WhatsIncludedDescription: {
    en: string;
    es: string;
  };
  BookingFormEyebrow: {
    en: string;
    es: string;
  };
  BookingFormHeadingLine1: {
    en: string;
    es: string;
  };
  BookingFormHeadingLine2: {
    en: string;
    es: string;
  };
  BookingFormDescription: {
    en: string;
    es: string;
  };
  RelatedStoriesEyebrow: {
    en: string;
    es: string;
  };
  RelatedStoriesHeadingLine1: {
    en: string;
    es: string;
  };
  RelatedStoriesHeadingLine2: {
    en: string;
    es: string;
  };
  RelatedStoriesDescription: {
    en: string;
    es: string;
  };
  RelatedStoriesReadMore: {
    en: string;
    es: string;
  };
  RelatedStoriesViewAll: {
    en: string;
    es: string;
  };
}

export const proposalPackageHeaderQuery = `*[_type == "ProposalPackageHeader"][0]{
    CustomizationSelectorEyebrow {
      en,
      es
    },
    CustomizationSelectorHeadingLine1 {
      en,
      es
    },
    CustomizationSelectorHeadingLine2 {
      en,
      es
    },
    CustomizationSelectorDescription {
      en,
      es
    },
    WhatsIncludedEyebrow {
      en,
      es
    },
    WhatsIncludedHeadingLine1 {
      en,
      es
    },
    WhatsIncludedHeadingLine2 {
      en,
      es
    },
    WhatsIncludedDescription {
      en,
      es
    },
    BookingFormEyebrow {
      en,
      es
    },
    BookingFormHeadingLine1 {
      en,
      es
    },
    BookingFormHeadingLine2 {
      en,
      es
    },
    BookingFormDescription {
      en,
      es
    },      
    RelatedStoriesEyebrow {
      en,
      es
    },
    RelatedStoriesHeadingLine1 {
      en,
      es
    },
    RelatedStoriesHeadingLine2 {
      en,
      es
    },
    RelatedStoriesDescription {
      en,
      es
    },
    RelatedStoriesReadMore {
      en,
      es
    },
    RelatedStoriesViewAll {
      en,
      es
    },
  }`;

export const getProposalPackageHeader =
  async (): Promise<ProposalPackageHeader> => {
    const data = await client.fetch(proposalPackageHeaderQuery);
    return data;
  };
