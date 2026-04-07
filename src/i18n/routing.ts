import { defineRouting } from "next-intl/routing";

import { ALL_LOCALES } from "./blogLocales";

export const routing = defineRouting({
  locales: [...ALL_LOCALES],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});
