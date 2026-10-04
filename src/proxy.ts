import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { isBlogOnlyLocale } from "./i18n/blogLocales";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// The legacy category pages were retired when their packages moved to
// /proposals. These redirects live here rather than in next.config.ts: on
// Netlify this middleware runs first and rewrites /x to /en/x, so config
// redirects never saw the unprefixed (English) URLs.
const LEGACY_CATEGORY_URL =
  /^(?:\/(en|es))?\/(?:classic|modern|dining|adventure)-proposals(?:\/([^/]+))?\/?$/;

function legacyCategoryRedirect(request: NextRequest) {
  const match = request.nextUrl.pathname.match(LEGACY_CATEGORY_URL);
  if (!match) return null;
  const [, locale, slug] = match;
  const prefix = locale === "es" ? "/es" : "";
  const target = new URL(`${prefix}/proposals`, request.url);
  if (slug) target.hash = slug;
  return NextResponse.redirect(target, 308);
}

export default function middleware(request: NextRequest) {
  const legacyRedirect = legacyCategoryRedirect(request);
  if (legacyRedirect) return legacyRedirect;

  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isBlogOnlyLocale(first)) {
    const afterLocale = segments.slice(1);
    const isBlogSection = afterLocale[0] === "blog";
    if (!isBlogSection) {
      const pathWithoutLocale =
        afterLocale.length === 0 ? "/" : `/${afterLocale.join("/")}`;
      return NextResponse.redirect(new URL(pathWithoutLocale, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|es|fr|de|it|pt)/:path*",
    "/((?!api|trpc|_next|_vercel|studio|.*\\..*).*)",
  ],
};
