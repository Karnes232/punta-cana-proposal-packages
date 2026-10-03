import type { StructureResolver } from "sanity/structure";
import {
  CATALOG_CONTACT_ID,
  CATALOG_HOME_ID,
  CATALOG_SETTINGS_ID,
  CATALOG_SINGLETON_IDS,
} from "@/sanity/constants";

// Types that have a curated home in the groups below.
const curatedTypes = new Set([
  "proposalExperience",
  "romanticDinnerExperience",
  "experienceAddon",
  "menuItem",
  "beverageOption",
  "dinnerOccasion",
  ...CATALOG_SINGLETON_IDS,
  "generalLayout",
  "FaqsPageFaqs",
  "FaqsPageFaqsCategories",
  "blogPost",
  "BlogCategory",
  "legalDocuments",
  "PageSeo",
]);

export const structure: StructureResolver = (S) => {
  const list = (title: string, type: string) =>
    S.listItem().title(title).child(S.documentTypeList(type).title(title));
  const singleton = (title: string, type: string) =>
    S.listItem()
      .title(title)
      .child(S.document().schemaType(type).documentId(type).title(title));
  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("EXPERIENCES")
        .child(
          S.list()
            .title("Experiences")
            .items([
              list("Proposals", "proposalExperience"),
              list("Romantic Dinner", "romanticDinnerExperience"),
              list("Add-ons", "experienceAddon"),
            ]),
        ),
      S.listItem()
        .title("FOOD & BEVERAGE")
        .child(
          S.list()
            .title("Food & Beverage")
            .items([
              list("Food Menu", "menuItem"),
              list("Beverages", "beverageOption"),
              list("Occasions", "dinnerOccasion"),
            ]),
        ),
      S.listItem()
        .title("WEBSITE")
        .child(
          S.list()
            .title("Website")
            .items([
              singleton("Catalog Settings", CATALOG_SETTINGS_ID),
              singleton("Home", CATALOG_HOME_ID),
              singleton("Contact", CATALOG_CONTACT_ID),
              list("Business information & social links", "generalLayout"),
              list("FAQ", "FaqsPageFaqs"),
              list("FAQ categories", "FaqsPageFaqsCategories"),
              list("Blog", "blogPost"),
              list("Blog categories", "BlogCategory"),
              list("Legal", "legalDocuments"),
              list("Existing page SEO", "PageSeo"),
            ]),
        ),
      S.divider(),
      // Every other registered document type, so nothing the site renders
      // can be hidden from editors. Shrinks as legacy types are migrated.
      S.listItem()
        .title("LEGACY (MIGRATING)")
        .child(
          S.list()
            .title("Legacy (migrating)")
            .items(
              S.documentTypeListItems().filter(
                (item) => !curatedTypes.has(item.getId() ?? ""),
              ),
            ),
        ),
    ]);
};
