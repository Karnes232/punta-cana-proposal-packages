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
      // SEO page
      S.listItem()
        .title("SEO page")
        .icon(() => "🌐")
        .child(
          S.documentList()
            .title("SEO page")
            .schemaType("PageSeo")
            .filter("_type == 'PageSeo'"),
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

      // Proposal packages page
      S.listItem()
        .title("Proposal packages page")
        .icon(() => "📦")
        .child(
          S.list()
            .title("Proposal packages page")
            .items([
              S.listItem()
                .title("General layout")
                .icon(() => "⚙️")
                .child(
                  S.document()
                    .schemaType("ProposalPackageHeader")
                    .title("Proposal package header"),
                ),
              S.listItem()
                .title("Proposal packages page content")
                .icon(() => "📄")
                .child(
                  S.documentList()
                    .title("Proposal packages page")
                    .schemaType("ProposalPackages")
                    .filter("_type == 'ProposalPackages'"),
                ),
              S.listItem()
                .title("Individual proposal package")
                .icon(() => "📦")
                .child(
                  S.documentList()
                    .title("Individual proposal package")
                    .schemaType("IndividualProposalPackage")
                    .filter("_type == 'IndividualProposalPackage'"),
                ),
            ]),
        ),
      // .child(
      //   S.documentList()
      //     .title("Proposal packages page")
      //     .schemaType("ProposalPackages")
      //     .filter("_type == 'ProposalPackages'"),
      // ),

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

      S.divider(),

      // Blog page
      S.listItem()
        .title("Blog page")
        .icon(() => "📚")
        .child(
          S.list()
            .title("Blog page")
            .items([
              S.listItem()
                .title("Hero")
                .icon(() => "👤")
                .child(
                  S.document()
                    .schemaType("BlogPageHero")
                    .title("Blog Page Hero"),
                ),
              S.listItem()
                .title("Blog categories")
                .icon(() => "🗂️")
                .child(
                  S.documentList()
                    .title("Blog categories")
                    .schemaType("BlogCategory")
                    .filter("_type == 'BlogCategory'"),
                ),
              S.listItem()
                .title("Blog posts")
                .icon(() => "📚")
                .child(
                  S.documentList()
                    .title("Blog posts")
                    .filter("_type == 'blogPost'")
                    .schemaType("blogPost"),
                ),
            ]),
        ),

      S.divider(),

      // Contact page (singleton: fixed _id so the pane opens directly)
      S.listItem()
        .title("Contact page")
        .icon(() => "📞")
        .child(
          S.document()
            .documentId("contactPageContent")
            .schemaType("ContactPageContent")
            .title("Contact page"),
        ),

      S.divider(),

      // How it works page
      S.listItem()
        .title("How it works page")
        .icon(() => "💡")
        .child(
          S.list()
            .title("How it works page")
            .items([
              S.listItem()
                .title("Hero")
                .icon(() => "👤")
                .child(
                  S.document()
                    .documentId("howItWorksPageHero")
                    .schemaType("HowItWorksPageHero")
                    .title("Hero"),
                ),
              S.listItem()
                .title("How it works steps")
                .icon(() => "📋")
                .child(
                  S.document()
                    .documentId("howItWorksPageHowItWorksSteps")
                    .schemaType("HowItWorksPageHowItWorksSteps")
                    .title("How it works steps"),
                ),
              S.listItem()
                .title("How it works FAQ categories")
                .icon(() => "🗂️")
                .child(
                  S.documentList()
                    .title("How it works FAQ categories")
                    .filter("_type == 'HowItWorksPageHowItWorksFaqCategory'"),
                ),
              S.listItem()
                .title("How it works FAQ")
                .icon(() => "❓")
                .child(
                  S.document()
                    .documentId("howItWorksPageHowItWorksFAQ")
                    .schemaType("HowItWorksPageHowItWorksFAQ")
                    .title("How it works FAQ"),
                ),
              S.listItem()
                .title("How it works CTA")
                .icon(() => "📧")
                .child(
                  S.document()
                    .documentId("howItWorksPageHowItWorksCTA")
                    .schemaType("HowItWorksPageHowItWorksCTA")
                    .title("How it works CTA"),
                ),
            ]),
        ),

      S.divider(),

      // Faqs page
      S.listItem()
        .title("Faqs page")
        .icon(() => "❓")
        .child(
          S.list()
            .title("Faqs page")
            .items([
              S.listItem()
                .title("Hero")
                .icon(() => "👤")
                .child(
                  S.document()
                    .documentId("faqsPageHeroComponent")
                    .schemaType("FaqsPageHeroComponent")
                    .title("Hero"),
                ),
              S.listItem()
                .title("Faq contact strip")
                .icon(() => "📧")
                .child(
                  S.document()
                    .documentId("faqsPageFaqContactStrip")
                    .schemaType("FaqsPageFaqContactStrip")
                    .title("Faq contact strip"),
                ),
              S.listItem()
                .title("Faqs categories")
                .icon(() => "🗂️")
                .child(
                  S.documentList()
                    .title("Faqs categories")
                    .filter("_type == 'FaqsPageFaqsCategories'"),
                ),
              S.listItem()
                .title("Faqs")
                .icon(() => "❓")
                .child(
                  S.documentList()
                    .title("Faqs")
                    .filter("_type == 'FaqsPageFaqs'"),
                ),
            ]),
        ),
    ]);
