import { type SchemaTypeDefinition } from "sanity";
import GeneralLayout from "./GeneralLayout/GeneralLayout";
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized";

//LegalDocuments
import { legalDocuments } from "./LegalDocuments/LegalDocuments";

//HomePage
import HomePageHero from "./HomePage/Hero";
import HomePageBrandStatement from "./HomePage/BrandStatement";
import HomePagePackageCategories from "./HomePage/PackageCategories";
import HomePagePackageCategory from "./HomePage/PackageCategory";
import HomePageHowItWorks from "./HomePage/HowItWorks";
import HomePageHowItWorksStep from "./HomePage/HowItWorksStep";
import HomePageFeatureStory from "./HomePage/FeatureStory";
import HomePageFeatureStorySection from "./HomePage/FeatureStorySection";
import HomePageTrustIndicators from "./HomePage/TrustIndicators";
import HomePageCTABanner from "./HomePage/CTABanner";

//StoriesPage
import StoriesPageHero from "./StoriesPage/Hero";
import ProposalType from "./StoriesPage/ProposalType";
import IndividualStory from "./StoriesPage/IndividualStory";

//ContactPage
import ContactPageContent from "./ContactPage/Content";

//HowItWorksPage
import HowItWorksPageHero from "./HowItWorksPage/Hero";
import HowItWorksPageHowItWorksSteps from "./HowItWorksPage/HowItWorksSteps";
import HowItWorksPageHowItWorksFAQ from "./HowItWorksPage/HowItWorksFAQ";
import HowItWorksPageHowItWorksFaqCategory from "./HowItWorksPage/HowItWorksFaqCategory";
import HowItWorksPageHowItWorksCTA from "./HowItWorksPage/HowItWorksCTA";

//FaqsPage
import FaqsPageHeroComponent from "./FaqsPage/HeroComponent";
import FaqsPageFaqContactStrip from "./FaqsPage/FaqContactStrip";
import FaqsPageFaqsCategories from "./FaqsPage/FaqsCategories";
import FaqsPageFaqs from "./FaqsPage/Faqs";
import PageSeo from "./SEO/PageSeo";
import Seo from "./SEO/seo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Localized
    localizedString,
    localizedText,
    localizedBlock,
    //GeneralLayout
    GeneralLayout,
    PageSeo,
    Seo,
    //LegalDocuments
    legalDocuments,
    //HomePage
    HomePageHero,
    HomePageBrandStatement,
    HomePagePackageCategories,
    HomePagePackageCategory,
    HomePageHowItWorks,
    HomePageHowItWorksStep,
    HomePageFeatureStory,
    HomePageFeatureStorySection,
    HomePageTrustIndicators,
    HomePageCTABanner,

    //StoriesPage
    StoriesPageHero,
    ProposalType,
    IndividualStory,

    //ContactPage
    ContactPageContent,

    //HowItWorksPage
    HowItWorksPageHero,
    HowItWorksPageHowItWorksSteps,
    HowItWorksPageHowItWorksFAQ,
    HowItWorksPageHowItWorksFaqCategory,
    HowItWorksPageHowItWorksCTA,

    //FaqsPage
    FaqsPageHeroComponent,
    FaqsPageFaqContactStrip,
    FaqsPageFaqsCategories,
    FaqsPageFaqs,
  ],
};
