import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page Not Found",
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  return (
    <html lang="en">
      <body className="bg-ivory font-body text-black antialiased">
        <main className="bg-ivory">
          <section
            className="mx-auto flex min-h-[min(70vh,720px)] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center"
            aria-labelledby="not-found-heading"
          >
            <p className="font-display text-6xl font-medium tracking-tight text-gold md:text-7xl">
              404
            </p>
            <h1
              id="not-found-heading"
              className="font-display mt-4 text-3xl text-black md:text-4xl"
            >
              Page Not Found
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gray">
              The page you are looking for does not exist.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Link
                href="/"
                className="inline-flex min-w-40 items-center justify-center border border-gold bg-gold px-6 py-3 text-sm font-medium text-white transition hover:bg-black hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="inline-flex min-w-40 items-center justify-center border border-black bg-transparent px-6 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                Blog
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
