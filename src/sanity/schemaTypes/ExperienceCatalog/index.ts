import { defineType } from "sanity";
import proposalExperience from "./proposalExperience";
import proposalStyle from "./proposalStyle";
import experienceAddon from "./experienceAddon";
import romanticDinnerExperience from "./romanticDinnerExperience";
import dinnerStyle from "./dinnerStyle";
import experienceInclusion from "./experienceInclusion";
import menuItem from "./menuItem";
import dinnerOccasion from "./dinnerOccasion";
import beverageOption from "./beverageOption";
import experienceCatalogSettings, {
  catalogHome,
  catalogContact,
} from "./experienceCatalogSettings";
import proposalsPage from "./proposalsPage";
import { image, field, order } from "./shared";
const experiencePhoto = defineType({
  name: "experiencePhoto",
  type: "object",
  fields: [
    image("image"),
    field("alt", "localizedString"),
    field("caption", "localizedString"),
    order,
  ],
  preview: { select: { title: "alt.en", media: "image" } },
});
const experienceSeo = defineType({
  name: "experienceSeo",
  type: "object",
  fields: [
    field("title", "localizedString"),
    field("description", "localizedText"),
    image("image"),
    field("noIndex", "boolean"),
  ],
});
export const experienceCatalogSchemas = [
  proposalExperience,
  proposalStyle,
  experienceAddon,
  romanticDinnerExperience,
  dinnerStyle,
  experienceInclusion,
  menuItem,
  dinnerOccasion,
  beverageOption,
  experienceCatalogSettings,
  catalogHome,
  catalogContact,
  proposalsPage,
  experiencePhoto,
  experienceSeo,
];
