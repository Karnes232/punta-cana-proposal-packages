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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Localized
    localizedString,
    localizedText,
    localizedBlock,
    //GeneralLayout
    GeneralLayout,
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
  ],
};
