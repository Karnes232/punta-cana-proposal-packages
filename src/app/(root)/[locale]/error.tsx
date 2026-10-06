"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

/**
 * Shown, inside the site's header and footer, when a page fails to render
 * (e.g. content the code didn't expect). Offers a retry and a way on.
 */
export default function PageError({ reset }: { reset: () => void }) {
  const t = useTranslations("ErrorPage");

  return (
    <main className="bg-ivory">
      <section
        className="mx-auto flex min-h-[min(70vh,720px)] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center"
        aria-labelledby="error-heading"
      >
        <h1
          id="error-heading"
          className="font-display text-3xl text-black md:text-4xl"
        >
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-gray">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-w-40 cursor-pointer items-center justify-center border border-gold bg-gold px-6 py-3 text-sm font-medium text-white transition hover:bg-black hover:text-white"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-flex min-w-40 items-center justify-center border border-black bg-transparent px-6 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            {t("homeCta")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-w-40 items-center justify-center border border-black bg-transparent px-6 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            {t("contactCta")}
          </Link>
        </div>
      </section>
    </main>
  );
}
