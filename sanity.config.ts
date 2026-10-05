"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import ProposalTemplateTool from "./src/sanity/tools/ProposalTemplateTool";
import DinnerTemplateTool from "./src/sanity/tools/DinnerTemplateTool";
import { media } from "sanity-plugin-media";
import { documentInternationalization } from "@sanity/document-internationalization";
import {
  CREATABLE_TYPES,
  PER_LANGUAGE_TYPES,
  SINGLETON_TYPES,
} from "./src/sanity/constants";
import { CONTENT_LOCALES, LANGUAGE_NAMES } from "./src/i18n/locales";

// Actions allowed on single-document page sections: no delete, duplicate or
// unpublish, so the site never loses (or doubles) one of them.
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

// The plugin's "<type> in <language>" templates (e.g. "story-fr").
const languageTemplates = new Set(
  PER_LANGUAGE_TYPES.flatMap((type) =>
    CONTENT_LOCALES.map((language) => `${type}-${language}`),
  ),
);
// Editors may create a document from this template in the global menu.
const creatable = (templateId: string) =>
  CREATABLE_TYPES.has(templateId) ||
  (languageTemplates.has(templateId) &&
    CREATABLE_TYPES.has(templateId.replace(/-[a-z]{2}$/, "")));
const catalogConfig = defineConfig({
  name: "catalog",
  title: "Website",
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    templates: (templates) =>
      templates.filter(
        (t) =>
          // Singletons are opened from the structure, never created as new docs.
          !SINGLETON_TYPES.has(t.schemaType) &&
          // A per-language document is always created in a language.
          !(PER_LANGUAGE_TYPES.includes(t.schemaType) && t.id === t.schemaType),
      ),
  },
  document: {
    // The global "Create" menu only offers types editors should add to.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => creatable(item.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter((action) => SINGLETON_ACTIONS.has(action.action ?? ""))
        : prev,
  },
  tools: [
    {
      name: "proposal-template",
      title: "Proposal template",
      component: ProposalTemplateTool,
    },
    {
      name: "dinner-template",
      title: "Dinner template",
      component: DinnerTemplateTool,
    },
  ],
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages: CONTENT_LOCALES.map((id) => ({
        id,
        title: LANGUAGE_NAMES[id],
      })),
      schemaTypes: [...PER_LANGUAGE_TYPES],
    }),
    media(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

export default catalogConfig;
