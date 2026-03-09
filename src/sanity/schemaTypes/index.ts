import { type SchemaTypeDefinition } from "sanity";
import GeneralLayout from "./GeneralLayout/GeneralLayout";
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized";

//HomePage
import HomePageHero from "./HomePage/Hero";

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
  ],
};
