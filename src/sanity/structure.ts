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
              S.listItem()
                .title("General layout")
                .child(
                  S.document()
                    .schemaType("generalLayout")
                    .title("General layout"),
                ),
              S.listItem()
                .title("Legal documents")
                .child(
                  S.documentList()
                    .title("Legal documents")
                    .filter("_type == 'legalDocuments'"),
                ),
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
                .icon(() => "👤")
                .child(S.document().schemaType("HomePageHero").title("Hero")),

              S.listItem()
                .title("Brand statement")
                .icon(() => "💬")
                .child(
                  S.document()
                    .schemaType("HomePageBrandStatement")
                    .title("Brand statement"),
                ),
              S.listItem()
                .title("Package categories")
                .icon(() => "📦")
                .child(
                  S.document()
                    .schemaType("HomePagePackageCategories")
                    .title("Package categories"),
                ),
              S.listItem()
                .title("How it works")
                .icon(() => "💡")
                .child(
                  S.document()
                    .schemaType("HomePageHowItWorks")
                    .title("How it works"),
                ),
              S.listItem()
                .title("Feature story")
                .icon(() => "📷")
                .child(
                  S.documentList()
                    .title("Feature stories")
                    .filter("_type == 'HomePageFeatureStory'"),
                ),
              S.listItem()
                .title("Feature story section")
                .icon(() => "📷")
                .child(
                  S.document()
                    .schemaType("HomePageFeatureStorySection")
                    .title("Feature story section"),
                ),
              S.listItem()
                .title("Trust indicators")
                .icon(() => "💪")
                .child(
                  S.document()
                    .schemaType("trustIndicators")
                    .title("Trust indicators"),
                ),
              S.listItem()
                .title("CTABanner")
                .icon(() => "📧")
                .child(
                  S.document()
                    .schemaType("HomePageCTABanner")
                    .title("CTABanner"),
                ),
            ]),
        ),

      S.divider(),

      // Stories page
      S.listItem()
        .title("Stories page")
        .icon(() => "📚")
        .child(
          S.list()
            .title("Stories page")
            .items([
              S.listItem()
                .title("Hero")
                .icon(() => "👤")
                .child(
                  S.document()
                    .schemaType("StoriesPageHero")
                    .title("Stories Page Hero"),
                ),
              S.listItem()
                .title("Proposal types")
                .icon(() => "💍")
                .child(
                  S.documentList()
                    .title("Proposal types")
                    .schemaType("ProposalType")
                    .filter("_type == 'ProposalType'"),
                ),
              S.listItem()
                .title("Individual stories")
                .icon(() => "📚")
                .child(
                  S.documentList()
                    .title("Individual stories")
                    .filter("_type == 'individualStory'")
                    .schemaType("individualStory"),
                ),
            ]),
        ),
    ]);
