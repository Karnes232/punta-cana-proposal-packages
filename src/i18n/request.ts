import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

import { isBlogOnlyLocale } from "./blogLocales";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messageLocale = isBlogOnlyLocale(locale) ? "en" : locale;

  return {
    locale,
    messages: (await import(`../../messages/${messageLocale}.json`)).default,
  };
});
