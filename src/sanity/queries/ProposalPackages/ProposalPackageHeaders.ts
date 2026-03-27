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
    }
  }`;

export const getProposalPackageHeader =
  async (): Promise<ProposalPackageHeader> => {
    const data = await client.fetch(proposalPackageHeaderQuery);
    return data;
  };
