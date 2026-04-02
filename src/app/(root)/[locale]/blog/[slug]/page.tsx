import PostHero from "@/components/IndividualBlogPost/HeroComponent/PostHero";
import PostBody from "@/components/IndividualBlogPost/PostBody/PostBody";
// import { defaultPostSidebarContent } from "@/components/IndividualBlogPost/PostBody/types";
import PostMetaBar from "@/components/IndividualBlogPost/PostMetaBar/PostMetaBar";
import { defaultPostMetaBarContent } from "@/components/IndividualBlogPost/PostMetaBar/types";
import { individualBlogQuery } from "@/sanity/queries/BlogPage/IndividualBlog";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const [individualBlog] = await Promise.all([individualBlogQuery(slug)]);
  console.log(individualBlog);
  return (
    <main>
      <PostHero
        post={{
          title: individualBlog.title[locale as "en" | "es"],
          publishedAt: individualBlog.publishedAt,
          categoryTag: individualBlog.categoryTag[locale as "en" | "es"],
          readingTime: individualBlog.readingTime,
          photo: {
            asset: {
              url: individualBlog.heroPhoto.asset.url,
              metadata: { dimensions: { width: 200, height: 300 } },
            },
            alt: individualBlog.heroPhoto.asset.alt,
          },
        }}
        locale={locale as "en" | "es"}
      />

      <PostMetaBar
        data={{
          categoryTag: individualBlog.categoryTag[locale as "en" | "es"],
          publishedAt: individualBlog.publishedAt,
          readingTime: individualBlog.readingTime,
        }}
        locale={locale as "en" | "es"}
      />
      <PostBody
        locale={locale as "en" | "es"}
        data={{
          title: individualBlog.title[locale as "en" | "es"],
          publishedAt: individualBlog.publishedAt,
          categoryTag: individualBlog.categoryTag[locale as "en" | "es"],
          readingTime: individualBlog.readingTime,
          excerpt: individualBlog.excerpt[locale as "en" | "es"],
          body: individualBlog.body[locale as "en" | "es"],
        }}
      />
    </main>
  );
}
