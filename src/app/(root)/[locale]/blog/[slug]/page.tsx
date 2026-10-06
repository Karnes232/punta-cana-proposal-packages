import { getTranslations } from "next-intl/server";
import type { PortableTextBlock } from "@portabletext/react";
import PostHero from "@/components/IndividualBlogPage/HeroComponent/PostHero";
import MoreBlogs from "@/components/IndividualBlogPage/MoreBlogs/MoreBlogs";
import PostBody from "@/components/IndividualBlogPage/PostBody/PostBody";
import PostMetaBar from "@/components/IndividualBlogPage/PostMetaBar/PostMetaBar";
import Gallery from "@/components/ui/Gallery/Gallery";
import JsonLd from "@/components/seo/JsonLd";
import { buildBlogHreflangMap } from "@/i18n/hreflang";
import {
  buildSeoMetadata,
  fallbackMissingDocumentMetadata,
  fallbackSiteMetadata,
  seoFields,
} from "@/lib/seo/buildMetadata";
import { toSiteLocale } from "@/i18n/locales";
import { blogPostPath, siteCanonicalUrl } from "@/lib/seo/constants";
import {
  getBlogPostLocaleBySlug,
  getMoreBlogs,
  getIndividualBlogMetadata,
  getIndividualBlog,
} from "@/sanity/queries/BlogPage/IndividualBlog";
import { notFound, permanentRedirect } from "next/navigation";
import { requireLocale } from "@/i18n/requireLocale";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  requireLocale(locale);
  const tBlog = await getTranslations("BlogPost");

  const individualBlog = await getIndividualBlog(slug, locale);
  const moreBlogs = individualBlog
    ? await getMoreBlogs(slug, individualBlog.language)
    : [];

  if (!individualBlog) {
    const existingPost = await getBlogPostLocaleBySlug(slug);
    if (existingPost) {
      const lang = existingPost.language;
      const path = lang === "en" ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
      permanentRedirect(path);
    }
    notFound();
  }

  if (individualBlog.language !== locale) {
    notFound();
  }

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={individualBlog.seo.structuredData}
      />
      <PostHero
        post={{
          title: individualBlog.title,
          publishedAt: individualBlog.publishedAt,
          categoryTag: individualBlog.categoryTag,
          readingTime: individualBlog.readingTime,
          photo: individualBlog.heroPhoto?.asset?.url
            ? {
                asset: {
                  url: individualBlog.heroPhoto.asset.url,
                  metadata: { dimensions: { width: 200, height: 300 } },
                },
                alt: individualBlog.heroPhoto.alt,
              }
            : null,
        }}
        locale={locale}
      />

      <PostMetaBar
        data={{
          categoryTag: individualBlog.categoryTag,
          publishedAt: individualBlog.publishedAt,
          readingTime: individualBlog.readingTime,
        }}
        locale={locale}
      />
      <PostBody
        locale={locale}
        data={{
          title: individualBlog.title,
          publishedAt: individualBlog.publishedAt,
          categoryTag: individualBlog.categoryTag,
          readingTime: individualBlog.readingTime,
          excerpt: individualBlog.excerpt,
          body: individualBlog.body as PortableTextBlock[],
        }}
      />
      <Gallery
        sectionLabel={tBlog("galleryLabel")}
        photos={
          // Gallery is optional in Sanity and comes back as null when empty.
          (individualBlog.gallery ?? []).map((photo) => ({
            asset: photo.asset,
            alt: photo.alt,
            caption: photo.caption ?? "",
          }))
        }
      />
      {moreBlogs.length > 0 && (
        <MoreBlogs
          blogs={moreBlogs.map((blog) => ({
            slug: blog.slug.current,
            title: blog.title,
            categoryTag: blog.categoryTag,
            publishedAt: blog.publishedAt,
            readingTime: blog.readingTime,
            excerpt: blog.excerpt,
            heroPhoto: blog.heroPhoto,
          }))}
        />
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  requireLocale(locale);
  const path = blogPostPath(slug);
  const canonicalUrl = siteCanonicalUrl(locale, path);
  const row = await getIndividualBlogMetadata(slug, locale);
  if (!row) {
    return fallbackMissingDocumentMetadata(locale, path, canonicalUrl);
  }
  if (row.language !== locale) {
    return fallbackMissingDocumentMetadata(locale, path, canonicalUrl);
  }

  const fields = seoFields(row.seo);
  if (!fields.meta.title) {
    return fallbackSiteMetadata(toSiteLocale(locale), path, canonicalUrl);
  }
  return buildSeoMetadata({
    path,
    canonicalUrl,
    ...fields,
    hreflangLanguages: buildBlogHreflangMap(row.hreflangSiblings),
  });
}
