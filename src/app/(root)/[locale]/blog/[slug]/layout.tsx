import RegisterBlogPostAlternates from "@/components/LanguageSwitcher/RegisterBlogPostAlternates";
import { individualBlogMetadataQuery } from "@/sanity/queries/BlogPage/IndividualBlog";

export default async function BlogPostLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { slug, locale } = await params;
  const metadata = await individualBlogMetadataQuery(slug, locale);
  const siblings =
    metadata && metadata.language === locale ? metadata.hreflangSiblings : null;

  return (
    <>
      <RegisterBlogPostAlternates siblings={siblings} />
      {children}
    </>
  );
}
