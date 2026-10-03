import type { Experience, Locale } from "@/lib/experience/types";

import type { Money } from "./money";
import type { ExperienceSelection } from "./useExperienceSelection";

/** Props every section of an experience card receives. */
export type CardSectionProps = {
  experience: Experience;
  locale: Locale;
  /** Label from Catalog Settings (see lib/experience/labels). */
  t: (key: string) => string;
  money: Money;
  state: ExperienceSelection;
};
