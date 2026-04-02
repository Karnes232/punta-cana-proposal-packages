import { client } from "@/sanity/lib/client";

export interface ProposalTypes {
  value: string;
  label: {
    en: string;
    es: string;
  };
}

export const proposalTypesQuery = `*[_type == "ProposalType"] {
  value,
  label {
    en,
    es
  }
}`;

export const getProposalTypes = async (): Promise<ProposalTypes[]> => {
  return await client.fetch(proposalTypesQuery);
};
