import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Site-wide settings
      S.listItem()
        .title("Site settings")
        .icon(() => "⚙️")
        .child(
          S.list()
            .title("Site settings")
            .items([
              S.documentTypeListItem("generalLayout").title("General layout"),
            ]),
        ),

      S.divider(),

      // Home page
      S.listItem()
        .title("Home page")
        .icon(() => "🏠")
        .child(
          S.list()
            .title("Home page")
            .items([
              S.listItem()
                .title("Hero")
                .child(S.document().schemaType("HomePageHero").title("Hero")),

              S.listItem()
                .title("Brand statement")
                .child(
                  S.documentList()
                    .title("Brand statement")
                    .filter('_type == "HomePageBrandStatement"'),
                ),
              S.listItem()
                .title("Package categories")
                .child(
                  S.documentList()
                    .title("Package categories")
                    .filter('_type == "HomePagePackageCategories"'),
                ),
              S.documentTypeListItem("HomePagePackageCategory").title(
                "Package category",
              ),
            ]),
        ),
    ]);
