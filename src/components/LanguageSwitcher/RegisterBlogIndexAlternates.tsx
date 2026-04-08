"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { ALL_LOCALES } from "@/i18n/blogLocales";
import { useBlogLanguageAlternates } from "./BlogLanguageAlternatesContext";

/**
 * On `/blog` only, registers all app locales pointing at `/blog` for the navbar switcher.
 * Post pages use {@link RegisterBlogPostAlternates} instead (child route).
 */
export default function RegisterBlogIndexAlternates() {
  const pathname = usePathname();
  const { registerAlternates } = useBlogLanguageAlternates();

  useEffect(() => {
    if (pathname !== "/blog") return;
    const alts = ALL_LOCALES.map((language) => ({ language, path: "/blog" }));
    registerAlternates(alts);
    return () => registerAlternates(null);
  }, [pathname, registerAlternates]);

  return null;
}
