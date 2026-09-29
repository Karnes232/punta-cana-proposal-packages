import type { StructureResolver } from "sanity/structure";
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
              singleton("Catalog Settings", "experienceCatalogSettings"),
              singleton("Home", "catalogHome"),
              singleton("Contact", "catalogContact"),
              list("Business information & social links", "generalLayout"),
              list("FAQ", "FaqsPageFaqs"),
              list("FAQ categories", "FaqsPageFaqsCategories"),
              list("Blog", "blogPost"),
              list("Blog categories", "BlogCategory"),
              list("Legal", "legalDocuments"),
              list("Existing page SEO", "PageSeo"),
            ]),
        ),
    ]);
};
