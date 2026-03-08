import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../../globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-ivory font-body text-black antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
