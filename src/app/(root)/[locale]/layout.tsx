import { Playfair_Display, Inter } from "next/font/google";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { toSiteLocale } from "@/i18n/locales";
import CatalogNavigation from "@/components/ExperienceCatalog/CatalogNavigation";
import { getCatalogContent } from "@/sanity/queries/ExperienceCatalog";
import CatalogFooter from "@/components/ExperienceCatalog/CatalogFooter";
import { BlogLanguageAlternatesProvider } from "@/components/BlogLanguageAlternates/BlogLanguageAlternatesContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [generalLayout, catalog] = await Promise.all([
    getGeneralLayout(),
    getCatalogContent(toSiteLocale(locale)),
  ]);

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ePt9nfyI13zBZGdIfJBvQQ"
          async
        ></script>
      </head>
      <NextIntlClientProvider>
        <body className="bg-ivory font-body text-black antialiased">
          <BlogLanguageAlternatesProvider>
            <CatalogNavigation
              locale={toSiteLocale(locale)}
              settings={catalog.settings || {}}
              logo={generalLayout?.companyLogo?.asset?.url}
              companyName={generalLayout?.companyName}
            />
            {children}
          </BlogLanguageAlternatesProvider>
          <CatalogFooter
            locale={toSiteLocale(locale)}
            settings={catalog.settings || {}}
            company={generalLayout}
          />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
