import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { isBlogOnlyLocale } from "./i18n/blogLocales";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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
