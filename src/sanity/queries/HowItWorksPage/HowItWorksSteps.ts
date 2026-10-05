import { client } from "@/sanity/lib/client";
import { pageSectionDocument, pageSectionParams } from "../pageSection";

export interface HowItWorksStepsStep {
  label: string;
  title: string;
  description: string;
}

export interface ReassuranceItem {
  id: string;
  title: string;
  caption: string;
}
export interface HowItWorksSteps {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  steps: HowItWorksStepsStep[];
  reassurance: ReassuranceItem[];
}

export const howItWorksPageHowItWorksStepsQuery = `${pageSectionDocument("howItWorksSteps")} {
  eyebrow,
  heading,
  headingAccent,
  subheading,
  steps[] {
    label,
    title,
    description
  },
  reassurance[] {
    id,
    title,
    caption
  }
}`;

export const getHowItWorksSteps = async (
  locale: string,
): Promise<HowItWorksSteps> => {
  return await client.fetch(
    howItWorksPageHowItWorksStepsQuery,
    pageSectionParams("howItWorksSteps", locale),
  );
};
