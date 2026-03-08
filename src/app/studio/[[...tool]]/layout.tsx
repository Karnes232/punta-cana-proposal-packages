import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Punta Cana Proposal Packages - Sanity Studio",
  description: "Punta Cana Proposal Packages - Sanity Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
