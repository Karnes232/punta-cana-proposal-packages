import PostHero from "@/components/IndividualBlogPost/HeroComponent/PostHero";
import PostBody from "@/components/IndividualBlogPost/PostBody/PostBody";
// import { defaultPostSidebarContent } from "@/components/IndividualBlogPost/PostBody/types";
import PostMetaBar from "@/components/IndividualBlogPost/PostMetaBar/PostMetaBar";
import { defaultPostMetaBarContent } from "@/components/IndividualBlogPost/PostMetaBar/types";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  return (
    <main>
      <PostHero
        post={{
          title: "Test",
          publishedAt: "2021-01-01",
          categoryTag: "Test",
          readingTime: 1,
          photo: {
            asset: {
              url: "https://picsum.photos/200/300",
              metadata: { dimensions: { width: 200, height: 300 } },
            },
            alt: "Test",
          },
        }}
        locale={locale as "en" | "es"}
      />

      <PostMetaBar
        data={{
          categoryTag: "Test",
          publishedAt: "2021-01-01",
          readingTime: 1,
        }}
        locale={locale as "en" | "es"}
        content={defaultPostMetaBarContent}
      />
      <PostBody locale={locale as "en" | "es"} />
    </main>
  );
}
