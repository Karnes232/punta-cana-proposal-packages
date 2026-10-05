import { experienceCatalogSchemas } from "./ExperienceCatalog";
import { type SchemaTypeDefinition } from "sanity";
import GeneralLayout from "./GeneralLayout/GeneralLayout";
import {
  blogLocalizedString,
  blogLocalizedText,
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized";

//LegalDocuments
import { legalDocuments } from "./LegalDocuments/LegalDocuments";

//StoriesPage
import StoriesPageHero from "./StoriesPage/Hero";
import ProposalType from "./StoriesPage/ProposalType";
import IndividualStory from "./StoriesPage/IndividualStory";
import StoriesPageCtaStrip from "./StoriesPage/CtaStrip";

//BlogPage
import BlogPageHero from "./BlogPage/BlogPageHero";
import BlogPost from "./BlogPage/BlogPost";
import BlogPostSeo from "./BlogPage/BlogPostSeo";
import BlogCategory from "./BlogPage/BlogCategory";
import BlogPageCtaStrip from "./BlogPage/CtaStrip";

//HowItWorksPage
import HowItWorksPage from "./HowItWorksPage/HowItWorksPage";

//FaqsPage
import FaqPage from "./FaqsPage/FaqPage";
import PageSeo from "./SEO/PageSeo";
import { withTitles } from "./shared/titles";

export const schema: { types: SchemaTypeDefinition[] } = {
  // Bilingual Studio titles: see shared/titles.ts.
  types: withTitles([
    ...experienceCatalogSchemas,
    //Localized
    localizedString,
    localizedText,
    localizedBlock,
    blogLocalizedString,
    blogLocalizedText,
    //GeneralLayout
    GeneralLayout,
    PageSeo,
    //LegalDocuments
    legalDocuments,

    //StoriesPage
    StoriesPageHero,
    ProposalType,
    IndividualStory,
    StoriesPageCtaStrip,

    //BlogPage
    BlogPageHero,
    BlogPostSeo,
    BlogPost,
    BlogCategory,
    BlogPageCtaStrip,

    //HowItWorksPage
    HowItWorksPage,

    //FaqsPage
    FaqPage,
  ]),
};
