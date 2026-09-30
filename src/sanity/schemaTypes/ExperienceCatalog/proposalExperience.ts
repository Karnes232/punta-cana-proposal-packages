import { defineType, defineField } from "sanity";
import {
  field,
  money,
  number,
  refs,
  objects,
  preview,
  validExperience,
} from "./shared";
export const experienceFields = [
  field("internalTitle", "string", "general"),
  field("name", "localizedString", "general"),
  field("location", "localizedString", "general"),
  field("badge", "localizedString", "general"),
  defineField({
    name: "slug",
    type: "slug",
    group: "general",
    options: { source: "name.en" },
  }),
  field("shortDescription", "localizedText", "general"),
  field("longDescription", "localizedText", "general"),
  money("basePrice", "general"),
  defineField({
    name: "currency",
    type: "string",
    group: "general",
    initialValue: "USD",
  }),
  field("priceLabel", "localizedString", "general"),
  objects("gallery", "experiencePhoto", "media"),
  objects("styles", "proposalStyle", "styles"),
  objects("inclusions", "experienceInclusion", "inclusions"),
  refs("availableAddons", "experienceAddon", "addons"),
  defineField({
    name: "active",
    type: "boolean",
    group: "display",
    initialValue: false,
  }),
  field("featured", "boolean", "display"),
  number("displayOrder", "display"),
  field("seo", "experienceSeo", "seo"),
];
export const groups = [
  "general",
  "media",
  "styles",
  "inclusions",
  "addons",
  "display",
  "seo",
].map((name) => ({ name, title: name.toUpperCase() }));
export default defineType({
  name: "proposalExperience",
  type: "document",
  title: "Proposal",
  groups,
  fields: experienceFields,
  validation: (r) => r.custom(validExperience),
  preview,
});
