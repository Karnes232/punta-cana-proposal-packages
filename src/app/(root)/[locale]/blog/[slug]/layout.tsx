import RegisterBlogPostAlternates from "@/components/BlogLanguageAlternates/RegisterBlogPostAlternates";
import { getIndividualBlogMetadata } from "@/sanity/queries/BlogPage/IndividualBlog";

export default async function BlogPostLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { slug, locale } = await params;
  const metadata = await getIndividualBlogMetadata(slug, locale);
  const siblings =
    metadata && metadata.language === locale ? metadata.hreflangSiblings : null;

  return (
    <>
      <RegisterBlogPostAlternates siblings={siblings} />
      {children}
    </>
  );
}
