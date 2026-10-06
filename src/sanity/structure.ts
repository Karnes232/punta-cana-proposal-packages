import type { ComponentType } from "react";
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import {
  ArchiveIcon,
  BasketIcon,
  CogIcon,
  ComposeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  ListIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
} from "@sanity/icons";
import {
  languageDocumentId,
  CATALOG_CONTACT_ID,
  CATALOG_HOME_ID,
  CATALOG_SETTINGS_ID,
  legalDocumentId,
  PAGE_SINGLETONS,
} from "@/sanity/constants";
import { bi } from "@/sanity/schemaTypes/shared/labels";
import { ALL_LOCALES } from "@/i18n/locales";

type Icon = ComponentType;

const languageNames: Record<string, [string, string]> = {
  en: ["Inglés", "English"],
  es: ["Español", "Spanish"],
  fr: ["Francés", "French"],
  de: ["Alemán", "German"],
  it: ["Italiano", "Italian"],
  pt: ["Portugués", "Portuguese"],
  zh: ["Chino", "Chinese"],
  ru: ["Ruso", "Russian"],
  ar: ["Árabe", "Arabic"],
};

export const structure: StructureResolver = (S) => {
  const list = (title: string, type: string, icon?: Icon) =>
    S.listItem()
      .title(title)
      .icon(icon)
      .child(S.documentTypeList(type).title(title));
  // One fixed document. The ID defaults to the type name (catalog singletons).
  const singleton = (title: string, type: string, id = type, icon?: Icon) =>
    S.listItem()
      .title(title)
      .icon(icon)
      .child(S.document().schemaType(type).documentId(id).title(title));
  // A per-language collection, listed in English: new documents start in
  // English and the Translations button opens or adds the other languages.
  const englishList = (
    title: string,
    type: string,
    ordering?: { field: string; direction: "asc" | "desc" },
  ) =>
    S.listItem()
      .title(title)
      .schemaType(type)
      .child(
        S.documentList()
          .title(title)
          .schemaType(type)
          .filter("_type == $type && language == $language")
          .params({ type, language: "en" })
          .initialValueTemplates([S.initialValueTemplateItem(`${type}-en`)])
          .defaultOrdering(ordering ? [ordering] : []),
      );
  // Documents of one type filtered by a field value (e.g. a page's SEO).
  const filtered = (
    title: string,
    type: string,
    filter: string,
    params: Record<string, unknown>,
    icon?: Icon,
    // One document per page (SEO, legal): no "+" that would add a second.
    canCreate = true,
  ) =>
    S.listItem()
      .title(title)
      .icon(icon)
      .child(() => {
        const list = S.documentList()
          .title(title)
          .schemaType(type)
          .filter(`_type == $type && ${filter}`)
          .params({ type, ...params });
        return canCreate ? list : list.initialValueTemplates([]);
      });
  const folder = (
    title: string,
    icon: Icon,
    items: ReturnType<StructureBuilder["listItem"]>[],
  ) =>
    S.listItem()
      .title(title)
      .icon(icon)
      .child(S.list().title(title).items(items));

  // Every type placed somewhere in the tree; anything else lands in the
  // archive's catch-all so no document type is ever hidden from editors.
  const placedTypes = new Set([
    CATALOG_HOME_ID,
    CATALOG_CONTACT_ID,
    CATALOG_SETTINGS_ID,
    ...Object.keys(PAGE_SINGLETONS),
    "legalDocument",
    "proposalExperience",
    "romanticDinnerExperience",
    "menuItem",
    "beverageOption",
    "dinnerOccasion",
    "experienceAddon",
    "story",
    "storyType",
    "blogPost",
    "blogCategory",
  ]);

  return S.list()
    .title(bi("Contenido", "Content"))
    .items([
      // Opens the English home page; the Translations button at the top of
      // the document switches language. Its SEO is inside it (seo field).
      singleton(
        bi("Inicio", "Home"),
        CATALOG_HOME_ID,
        languageDocumentId(CATALOG_HOME_ID, "en"),
        HomeIcon,
      ),
      folder(bi("Propuestas", "Proposals"), HeartIcon, [
        // Opens the English proposals page (every text on the page, in its
        // order, and its SEO); the Translations button switches language.
        singleton(
          bi("Página de propuestas", "Proposals page"),
          "proposalsPage",
          languageDocumentId("proposalsPage", "en"),
          HeartIcon,
        ),
        list(bi("Paquetes", "Packages"), "proposalExperience"),
      ]),
      folder(bi("Cenas románticas", "Romantic dinners"), SparklesIcon, [
        // Opens the English romantic dinners page (every text on the page,
        // in its order, and its SEO); the Translations button switches
        // language.
        singleton(
          bi("Página de cenas románticas", "Romantic dinners page"),
          "romanticDinnersPage",
          languageDocumentId("romanticDinnersPage", "en"),
          SparklesIcon,
        ),
        list(bi("Cenas", "Dinners"), "romanticDinnerExperience"),
        S.listItem()
          .title(bi("Menú", "Menu"))
          .child(
            S.list()
              .title(bi("Menú", "Menu"))
              .items([
                list(bi("Todos los platos", "All dishes"), "menuItem"),
                filtered(
                  bi("Entradas", "Starters"),
                  "menuItem",
                  "courseType == $course",
                  { course: "starter" },
                ),
                filtered(
                  bi("Platos principales", "Mains"),
                  "menuItem",
                  "courseType == $course",
                  { course: "main" },
                ),
                filtered(
                  bi("Postres", "Desserts"),
                  "menuItem",
                  "courseType == $course",
                  { course: "dessert" },
                ),
              ]),
          ),
        list(bi("Bebidas", "Drinks"), "beverageOption"),
        list(bi("Ocasiones", "Occasions"), "dinnerOccasion"),
      ]),
      folder(bi("Historias", "Stories"), StarIcon, [
        // Opens the English stories page (hero, featured story, closing
        // banner and SEO); the Translations button switches language.
        singleton(
          bi("Página de historias", "Stories page"),
          "storiesPage",
          languageDocumentId("storiesPage", "en"),
          StarIcon,
        ),
        englishList(bi("Historias", "Stories"), "story", {
          field: "date",
          direction: "desc",
        }),
        list(bi("Tipos de propuesta", "Proposal types"), "storyType"),
      ]),
      folder("Blog", ComposeIcon, [
        // Opens the English blog page (hero, featured post, closing banner
        // and SEO); the Translations button switches language.
        singleton(
          bi("Página del blog", "Blog page"),
          "blogPage",
          languageDocumentId("blogPage", "en"),
          ComposeIcon,
        ),
        S.listItem()
          .title(bi("Artículos", "Posts"))
          .child(
            S.list()
              .title(bi("Artículos", "Posts"))
              .items([
                list(bi("Todos los idiomas", "All languages"), "blogPost"),
                S.divider(),
                ...ALL_LOCALES.map((code) =>
                  filtered(
                    bi(...(languageNames[code] ?? [code, code])),
                    "blogPost",
                    "language == $language",
                    { language: code },
                  ),
                ),
              ]),
          ),
        list(bi("Categorías", "Categories"), "blogCategory", TagIcon),
      ]),
      // Opens the English FAQ page (every section, its question categories
      // and SEO); the Translations button switches language.
      singleton(
        bi("Preguntas frecuentes", "FAQ"),
        "faqPage",
        languageDocumentId("faqPage", "en"),
        HelpCircleIcon,
      ),
      // Opens the English How it works page (every section, its FAQ
      // categories and SEO); the Translations button switches language.
      singleton(
        bi("Cómo funciona", "How it works"),
        "howItWorksPage",
        languageDocumentId("howItWorksPage", "en"),
        ListIcon,
      ),
      // Opens the English contact page; the Translations button switches
      // language. Its SEO is inside it (seo field).
      singleton(
        bi("Contacto", "Contact"),
        CATALOG_CONTACT_ID,
        languageDocumentId(CATALOG_CONTACT_ID, "en"),
        EnvelopeIcon,
      ),
      // Each legal page opens in English; the Translations button switches
      // language. Its SEO is inside it (seo field).
      folder("Legal", DocumentTextIcon, [
        singleton(
          bi("Política de privacidad", "Privacy policy"),
          "legalDocument",
          languageDocumentId(legalDocumentId("privacy-policy"), "en"),
        ),
        singleton(
          bi("Términos de servicio", "Terms of service"),
          "legalDocument",
          languageDocumentId(legalDocumentId("terms-of-service"), "en"),
        ),
      ]),
      S.divider(),
      list(bi("Extras", "Add-ons"), "experienceAddon", BasketIcon),
      folder(bi("Ajustes del sitio", "Site settings"), CogIcon, [
        singleton(
          bi("Negocio y redes sociales", "Business & social links"),
          "generalLayout",
        ),
        // Opens the English catalog text; the Translations button at the top
        // of the document switches language.
        singleton(
          bi("Textos del catálogo", "Catalog text"),
          CATALOG_SETTINGS_ID,
          languageDocumentId(CATALOG_SETTINGS_ID, "en"),
        ),
      ]),
      S.divider(),
      folder(bi("Otros tipos", "Other types"), ArchiveIcon, [
        ...S.documentTypeListItems().filter((item) => {
          const type = item.getId() ?? "";
          // Plugin types (e.g. the media library's media.tag) aren't content.
          if (type.includes(".")) return false;
          return !placedTypes.has(type);
        }),
      ]),
    ]);
};
