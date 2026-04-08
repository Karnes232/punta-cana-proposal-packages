import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFoundPage");
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");

  return (
    <main className="bg-ivory">
      <section
        className="mx-auto flex min-h-[min(70vh,720px)] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center"
        aria-labelledby="not-found-heading"
      >
        <p className="font-display text-6xl font-medium tracking-tight text-gold md:text-7xl">
          {t("code")}
        </p>
        <h1
          id="not-found-heading"
          className="font-display mt-4 text-3xl text-black md:text-4xl"
        >
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-gray">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-w-40 items-center justify-center border border-gold bg-gold px-6 py-3 text-sm font-medium text-white transition hover:bg-black hover:text-white"
          >
            {t("homeCta")}
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-w-40 items-center justify-center border border-black bg-transparent px-6 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            {t("blogCta")}
          </Link>
        </div>
      </section>
    </main>
  );
}
