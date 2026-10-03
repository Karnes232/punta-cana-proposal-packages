import { client } from "@/sanity/lib/client";
import type {
  Experience,
  Settings,
  Home,
  Contact,
} from "@/lib/experience/types";
import { normalizeExperience } from "@/lib/experience/normalize";
import { withProposalExtras } from "@/lib/experience/proposalExtras";
const img = `{ "url":asset->url,alt }`;
const photo = `{_key,alt,caption,displayOrder,image${img}}`;
const entry = `_id,_key,name,description,active,displayOrder`;
export const experienceProjection = `{${entry},_type,slug,shortDescription,longDescription,basePrice,currency,priceLabel,location,badge,includedGuests,minimumGuests,maximumGuests,additionalGuestPrice,includedDurationMinutes,maximumDurationMinutes,inclusions[]{${entry},icon},gallery[]${photo},styles[]{${entry},price,mainImage${img},gallery[]${photo}},availableAddons[]->{${entry},price,pricingType,applicableTo,minimumQuantity,maximumQuantity,durationMinutesPerUnit,icon,image${img}},menuItems[]->{${entry},courseType,included,supplementPrice,dietaryType,dietaryTags,allergenInformation,image${img}},beverages[]->{${entry},type,included,supplementPrice,image${img}},occasions[]->{${entry},allowCustomMessage},seo{...,image${img}}}`;
export const catalogQuery = `*[_type in ["proposalExperience","romanticDinnerExperience"] && active==true && coalesce(slug.current, "") != "adventure-to-yes"] | order(displayOrder asc,_id asc) ${experienceProjection}`;
const fresh = client.withConfig({ useCdn: false, perspective: "published" });
export async function getExperiences() {
  const rows = await fresh.fetch<Experience[]>(
    catalogQuery,
    {},
    { next: { revalidate: 60 } },
  );
  const menu = rows.some((e) => e._type === "proposalExperience")
    ? (await getDinnerPreview())?.menuItems || []
    : [];
  return rows.map((e) => withProposalExtras(normalizeExperience(e), menu));
}
export async function getExperience(id: string) {
  const e = await fresh.fetch<Experience | null>(
    `*[_id==$id && _type in ["proposalExperience","romanticDinnerExperience"] && active==true && coalesce(slug.current, "") != "adventure-to-yes"][0]${experienceProjection}`,
    { id },
    { cache: "no-store" },
  );
  return e
    ? withProposalExtras(
        normalizeExperience(e),
        e._type === "proposalExperience"
          ? (await getDinnerPreview())?.menuItems || []
          : [],
      )
    : null;
}
export async function getCatalogContent() {
  return fresh.fetch<{
    settings: Settings | null;
    home: Home | null;
    contact: Contact | null;
  }>(
    `{"settings":*[_id=="experienceCatalogSettings"][0],"home":*[_id=="catalogHome"][0]{...,heroImage${img},proposalHeroImage${img},dinnerHeroImage${img},proposalSelectorImage${img},dinnerSelectorImage${img},journeyImages[]${img},editorialImages[]${img},moments[]${img},seo{...,image${img}}},"contact":*[_id=="catalogContact"][0]{...,seo{...,image${img}}}}`,
    {},
    { next: { revalidate: 60 } },
  );
}

// Only called on preview hosts. Reads the existing inactive dinner, not private drafts.
export async function getDinnerPreview() {
  return getTemplatePreview("8d9e1e5f-d981-4276-ab95-8d88a3ebd429");
}
async function getTemplatePreview(id: string) {
  const row = await fresh.fetch<Experience | null>(
    `*[_id==$id][0]${experienceProjection}`,
    { id },
    { cache: "no-store" },
  );
  return row
    ? normalizeExperience({
        ...row,
        active: true,
        styles: (row.styles || []).map((s) => ({ ...s, active: true })),
      })
    : null;
}

// The published dinner example accepts inquiries, never confirmed reservations.
export async function getRequestExperience(id: string) {
  const active = await getExperience(id);
  return (
    active ||
    (id === "8d9e1e5f-d981-4276-ab95-8d88a3ebd429"
      ? await getDinnerPreview()
      : null)
  );
}

// Only selected summaries reach Home; the complete catalog stays on its own pages.
export async function getHomePresentation() {
  const config = await fresh.fetch<{
    ids: string[] | null;
    hero?: import("@/lib/experience/types").Image;
  }>(
    `{"ids": *[_id=="catalogHome"][0].featuredProposals[0...3]._ref,
      "hero": *[_type=="HomePageHero"][0].image{"url":asset->url,"alt":{"en":alt,"es":alt}}}`,
    {},
    { next: { revalidate: 60 } },
  );
  const ids =
    config.ids ??
    (await fresh.fetch<string[]>(
      `*[_type=="proposalExperience" && active==true && slug.current in ["love-signature","path-of-love","marry-me-sign"]] | order(name.en asc)[0...3]._id`,
      {},
      { next: { revalidate: 60 } },
    ));
  const proposals = (await Promise.all(ids.map(getExperience))).filter(
    (e): e is Experience => !!e && e._type === "proposalExperience",
  );
  return { proposals, hero: config.hero };
}
