import { getTranslations } from "next-intl/server";
import StoryHero from "@/components/IndividualStoryPage/HeroComponent/StoryHero";
import MoreStories from "@/components/IndividualStoryPage/MoreStories/MoreStories";
import StoryBody from "@/components/IndividualStoryPage/StoryBody/StoryBody";
import Gallery from "@/components/ui/Gallery/Gallery";
import StoryMetaBar from "@/components/IndividualStoryPage/StoryMetaBar/StoryMetaBar";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSeoMetadata,
  fallbackMissingDocumentMetadata,
  localizedSeoFields,
} from "@/lib/seo/buildMetadata";
import { siteCanonicalUrl } from "@/lib/seo/constants";
import {
  getIndividualStory,
  getMoreStories,
  getIndividualStorySeo,
} from "@/sanity/queries/StoriesPage/IndividualStory";
import { notFound } from "next/navigation";
import { requireLocale } from "@/i18n/requireLocale";
import { toSiteLocale, type SiteLocale } from "@/i18n/locales";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  requireLocale(locale);
  const tStory = await getTranslations("IndividualStoryPage");
  const localeTyped = toSiteLocale(locale);
  const [story] = await Promise.all([getIndividualStory(slug)]);
  if (!story) {
    notFound();
  }
  const moreStories = await getMoreStories(
    story.proposalType?.value ?? "",
    story.slug?.current ?? "",
  );

  return (
    <main>
      <JsonLd
        id="structured-data-schema"
        data={story.seo?.structuredData[localeTyped]}
      />
      <StoryHero
        heroImage={story.heroPhoto || null}
        names={story.names ?? ""}
        packageTag={story.packageTag[localeTyped] ?? ""}
        date={story.date ?? ""}
        location={story.location[localeTyped] ?? ""}
        locale={localeTyped}
      />
      <StoryMetaBar
        data={{
          packageTag: story.packageTag[localeTyped] ?? "",
          date: story.date ?? "",
          location: story.location[localeTyped] ?? "",
        }}
        locale={localeTyped}
      />
      <StoryBody
        data={{
          names: story.names ?? "",
          date: story.date ?? "",
          location: story.location[localeTyped] ?? "",
          packageTag: story.packageTag[localeTyped] ?? "",
          quote: story.quote[localeTyped] ?? "",
          body: story.body[localeTyped] ?? [],
        }}
      />
      <Gallery
        sectionLabel={tStory("galleryLabel")}
        photos={
          // Gallery is optional in Sanity and comes back as null when empty.
          (story.gallery ?? []).map((photo) => ({
            asset: photo.asset,
            alt: photo.alt,
            caption: photo.caption?.[localeTyped] ?? "",
          }))
        }
      />
      <MoreStories
        stories={moreStories.map((story) => ({
          slug: story.slug.current,
          names: story.names,
          date: story.date,
          location: story.location[localeTyped] ?? "",
          packageTag: story.packageTag[localeTyped] ?? "",
          quote: story.quote[localeTyped] ?? "",
          heroPhoto: story.heroPhoto,
        }))}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: SiteLocale }>;
}) {
  const { slug, locale } = await params;
  requireLocale(locale);
  const individualStory = await getIndividualStorySeo(slug);
  const path = `/stories/${slug}`;
  const canonicalUrl = siteCanonicalUrl(locale, path);
  if (!individualStory) {
    return fallbackMissingDocumentMetadata(locale, path, canonicalUrl);
  }

  return buildSeoMetadata({
    path,
    canonicalUrl,
    ...localizedSeoFields(individualStory.seo, locale),
    noIndex: individualStory.seo.noIndex,
    noFollow: individualStory.seo.noFollow,
  });
}
