import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../../globals.css";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";

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

// export const metadata: Metadata = {
//   title: "Punta Cana Proposal Packages",
//   description:
//     "Private, curated proposal experiences in the heart of Punta Cana.",
// };

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

  const [generalLayout] = await Promise.all([getGeneralLayout()]);

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <NextIntlClientProvider>
        <body className="bg-ivory font-body text-black antialiased">
          <Navbar logo={generalLayout?.companyLogo ?? null} />
          {children}
          <Footer
            logo={generalLayout?.companyLogo ?? null}
            description={generalLayout?.companyDescription[locale]}
            telephone={generalLayout?.telephone}
            email={generalLayout?.email}
            socialLinks={generalLayout?.socialLinks}
            companyName={generalLayout?.companyName}
          />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
