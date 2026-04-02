import PostHero from "@/components/IndividualBlogPost/HeroComponent/PostHero";
import MoreBlogs from "@/components/IndividualBlogPost/MoreBlogs/MoreBlogs";
import PostBody from "@/components/IndividualBlogPost/PostBody/PostBody";
// import { defaultPostSidebarContent } from "@/components/IndividualBlogPost/PostBody/types";
import PostMetaBar from "@/components/IndividualBlogPost/PostMetaBar/PostMetaBar";
import { defaultPostMetaBarContent } from "@/components/IndividualBlogPost/PostMetaBar/types";
import StoryGallery from "@/components/IndividualStoryPage/StoryGallery/StoryGallery";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import {
  getMoreBlogs,
  individualBlogQuery,
  individualBlogSEOQuery,
} from "@/sanity/queries/BlogPage/IndividualBlog";
import { notFound } from "next/navigation";
import Script from "next/script";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const [individualBlog, moreBlogs] = await Promise.all([
    individualBlogQuery(slug),
    getMoreBlogs(slug),
  ]);
  if (!individualBlog) {
    notFound();
  }



  return (
    <main>
      {individualBlog.seo.structuredData[locale as "en" | "es"] && (
        <Script
          id="structured-data-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              individualBlog.seo.structuredData[locale as "en" | "es"],
            ),
          }}
        />
      )}
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
      <StoryGallery
        content={{
          sectionLabelEn: "Blog Post Gallery",
          sectionLabelEs: "Galería de la publicación del blog",
          viewAllLabelEn: "View all {count} photos",
          viewAllLabelEs: "Ver las {count} fotos",
          closeLabelEn: "Close",
          closeLabelEs: "Cerrar",
          prevLabelEn: "Previous",
          prevLabelEs: "Anterior",
          nextLabelEn: "Next",
          nextLabelEs: "Siguiente",
        }}
        photos={
          individualBlog.gallery.map((photo) => ({
            asset: photo.asset,
            alt: photo.alt,
            caption: photo.caption[locale as "en" | "es"] ?? "",
          })) ?? []
        }
        locale={locale as "en" | "es"}
      />
      {moreBlogs.length > 0 && (
        <MoreBlogs
          blogs={moreBlogs.map((blog) => ({
            slug: blog.slug.current,
            title: blog.title[locale as "en" | "es"],
            categoryTag: blog.categoryTag[locale as "en" | "es"],
            publishedAt: blog.publishedAt,
            readingTime: blog.readingTime,
            excerpt: blog.excerpt[locale as "en" | "es"],
            heroPhoto: blog.heroPhoto,
          }))}
          locale={locale as "en" | "es"}
        />
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>;
}) {
  const { slug, locale } = await params;
  const individualBlog = await individualBlogSEOQuery(slug);

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = `https://puntacanaproposalpackages.com/blog/${slug}`;
  } else {
    canonicalUrl = `https://puntacanaproposalpackages.com/es/blog/${slug}`;
  }

  return {
    title: individualBlog.seo.meta[locale].title,
    description: individualBlog.seo.meta[locale].description,
    keywords: individualBlog.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: individualBlog.seo.openGraph[locale].title,
      description: individualBlog.seo.openGraph[locale].description,
      images: individualBlog.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !individualBlog.seo.noIndex,
      follow: !individualBlog.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, `/blog/${slug}`),
    },
  };
}
