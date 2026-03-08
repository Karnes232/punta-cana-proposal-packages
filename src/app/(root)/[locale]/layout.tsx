import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../../globals.css";
import { getLogo } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Layout/Navbar/Navbar";

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

export const metadata: Metadata = {
  title: "Punta Cana Proposal Packages",
  description:
    "Private, curated proposal experiences in the heart of Punta Cana.",
};

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

  const [logo] = await Promise.all([getLogo()]);

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <NextIntlClientProvider>
        <body className="bg-ivory font-body text-black antialiased">
          <Navbar logo={logo?.companyLogo ?? null} />
          <main>{children}</main>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
