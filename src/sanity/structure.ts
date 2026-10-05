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
  SearchIcon,
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
  PER_LANGUAGE_TYPES,
  pageSeoId,
} from "@/sanity/constants";
import { bi } from "@/sanity/schemaTypes/shared/labels";
import { ALL_LOCALES, CONTENT_LOCALES, LANGUAGE_NAMES } from "@/i18n/locales";

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
  const pageSection = (title: string, type: keyof typeof PAGE_SINGLETONS) =>
    PER_LANGUAGE_TYPES.includes(type)
      ? languageSingleton(title, type, PAGE_SINGLETONS[type])
      : singleton(title, type, PAGE_SINGLETONS[type]);
  // One fixed document per language, e.g. storiesHero-en … storiesHero-pt.
  const languageSingleton = (
    title: string,
    type: string,
    base: string,
    icon?: Icon,
  ) =>
    S.listItem()
      .title(title)
      .icon(icon)
      .child(
        S.list()
          .title(title)
          .items(
            CONTENT_LOCALES.map((language) =>
              singleton(
                LANGUAGE_NAMES[language],
                type,
                languageDocumentId(base, language),
              ),
            ),
          ),
      );
  // A per-language collection: one list per language, new documents created
  // in that language.
  const languageList = (
    title: string,
    type: string,
    icon?: Icon,
    ordering?: { field: string; direction: "asc" | "desc" },
  ) =>
    S.listItem()
      .title(title)
      .icon(icon)
      .child(
        S.list()
          .title(title)
          .items(
            CONTENT_LOCALES.map((language) =>
              S.listItem()
                .title(LANGUAGE_NAMES[language])
                .child(
                  S.documentList()
                    .title(`${title}: ${LANGUAGE_NAMES[language]}`)
                    .schemaType(type)
                    .filter("_type == $type && language == $language")
                    .params({ type, language })
                    .initialValueTemplates([
                      S.initialValueTemplateItem(`${type}-${language}`),
                    ])
                    .defaultOrdering(ordering ? [ordering] : []),
                ),
            ),
          ),
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
  // Each page's SEO is one fixed document per language (pageSeo-<page>-<lang>).
  const pageSeo = (page: string, title = "SEO") =>
    languageSingleton(title, "pageSeo", pageSeoId(page), SearchIcon);
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
    "pageSeo",
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
        list(bi("Paquetes", "Packages"), "proposalExperience"),
        pageSeo("proposals"),
      ]),
      folder(bi("Cenas románticas", "Romantic dinners"), SparklesIcon, [
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
        pageSeo("romantic-dinners"),
      ]),
      folder(bi("Historias", "Stories"), StarIcon, [
        pageSection(bi("Portada", "Hero"), "storiesHero"),
        languageList(bi("Historias", "Stories"), "story", undefined, {
          field: "date",
          direction: "desc",
        }),
        list(bi("Tipos de propuesta", "Proposal types"), "storyType"),
        pageSection(bi("Franja final", "Closing banner"), "storiesCtaStrip"),
        pageSeo("stories"),
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
        pageSection(
          bi("Negocio y redes sociales", "Business & social links"),
          "generalLayout",
        ),
        languageSingleton(
          bi("Textos del catálogo", "Catalog text"),
          CATALOG_SETTINGS_ID,
          CATALOG_SETTINGS_ID,
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
