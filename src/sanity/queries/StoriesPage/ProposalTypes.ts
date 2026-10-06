import type { Localized } from "@/lib/experience/types";
import { client } from "@/sanity/lib/client";

export interface ProposalTypes {
  value: string;
  /** Story types are shared by every language. */
  label: Localized;
}

export const proposalTypesQuery = `*[_type == "storyType"] {
  value,
  label
}`;

export const getProposalTypes = async (): Promise<ProposalTypes[]> => {
  return await client.fetch(proposalTypesQuery);
};
