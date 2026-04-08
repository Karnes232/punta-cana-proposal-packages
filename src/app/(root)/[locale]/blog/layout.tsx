import type { ReactNode } from "react";
import RegisterBlogIndexAlternates from "@/components/LanguageSwitcher/RegisterBlogIndexAlternates";

export default function BlogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <RegisterBlogIndexAlternates />
      {children}
    </>
  );
}
