import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuerza del Pueblo - Sanity Studio",
  description: "Fuerza del Pueblo - Sanity Studio",
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
