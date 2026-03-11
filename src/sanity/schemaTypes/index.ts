import { type SchemaTypeDefinition } from "sanity";
import GeneralLayout from "./GeneralLayout/GeneralLayout";
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized";

//HomePage
import HomePageHero from "./HomePage/Hero";
import HomePageBrandStatement from "./HomePage/BrandStatement";
import HomePagePackageCategories from "./HomePage/PackageCategories";
import HomePagePackageCategory from "./HomePage/PackageCategory";
import HomePageHowItWorks from "./HomePage/HowItWorks";
import HomePageHowItWorksStep from "./HomePage/HowItWorksStep";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Localized
    localizedString,
    localizedText,
    localizedBlock,
    //GeneralLayout
    GeneralLayout,

    //HomePage
    HomePageHero,
    HomePageBrandStatement,
    HomePagePackageCategories,
    HomePagePackageCategory,
    HomePageHowItWorks,
    HomePageHowItWorksStep,
  ],
};
