import { client } from "@/sanity/lib/client";
import type {
  Experience,
  Settings,
  Home,
  Contact,
} from "@/lib/experience/types";
import { normalizeExperience } from "@/lib/experience/normalize";
const img = `{ "url":asset->url,alt }`;
const photo = `{_key,alt,caption,displayOrder,image${img}}`;
const entry = `_id,_key,name,description,active,displayOrder`;
export const experienceProjection = `{${entry},_type,slug,shortDescription,longDescription,basePrice,currency,priceLabel,includedGuests,minimumGuests,maximumGuests,additionalGuestPrice,includedDurationMinutes,maximumDurationMinutes,inclusions[]{${entry},icon},gallery[]${photo},styles[]{${entry},price,mainImage${img},gallery[]${photo}},availableAddons[]->{${entry},price,pricingType,applicableTo,minimumQuantity,maximumQuantity,durationMinutesPerUnit,icon,image${img}},menuItems[]->{${entry},courseType,included,supplementPrice,dietaryType,dietaryTags,allergenInformation,image${img}},beverages[]->{${entry},type,included,supplementPrice,image${img}},occasions[]->{${entry},allowCustomMessage},seo{...,image${img}}}`;
export const catalogQuery = `*[_type in ["proposalExperience","romanticDinnerExperience"] && active==true && coalesce(slug.current, "") != "adventure-to-yes"] | order(displayOrder asc,_id asc) ${experienceProjection}`;
const fresh = client.withConfig({ useCdn: false, perspective: "published" });
export async function getExperiences() {
  const rows = await fresh.fetch<Experience[]>(
    catalogQuery,
    {},
    { next: { revalidate: 60 } },
  );
  return rows.map(normalizeExperience);
}
export async function getExperience(id: string) {
  const e = await fresh.fetch<Experience | null>(
    `*[_id==$id && _type in ["proposalExperience","romanticDinnerExperience"] && active==true && coalesce(slug.current, "") != "adventure-to-yes"][0]${experienceProjection}`,
    { id },
    { cache: "no-store" },
  );
  return e ? normalizeExperience(e) : (await getLegacyProposals(id))[0] || null;
}
export async function getCatalogContent() {
  return fresh.fetch<{
    settings: Settings | null;
    home: Home | null;
    contact: Contact | null;
  }>(
    `{"settings":*[_id=="experienceCatalogSettings"][0],"home":*[_id=="catalogHome"][0]{...,heroImage${img},seo{...,image${img}}},"contact":*[_id=="catalogContact"][0]{...,seo{...,image${img}}}}`,
    {},
    { next: { revalidate: 60 } },
  );
}

// Only called on preview hosts. Reads the existing inactive dinner, not private drafts.
export async function getDinnerPreview() {
  return getTemplatePreview("8d9e1e5f-d981-4276-ab95-8d88a3ebd429");
}
export async function getProposalPreview() {
  return getTemplatePreview("proposal-initial-template");
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

// Published legacy packages share the catalog and server-side price validation.
export async function getLegacyProposals(id?: string) {
  const legacyImage = `{ "url":asset->url, "alt":{"en":alt,"es":alt} }`;
  const rows = await fresh.fetch<
    Array<Experience & { mainImage?: import("@/lib/experience/types").Image }>
  >(
    `*[_type=="IndividualProposalPackage" && (!defined($id) || _id==$id) && _id != "b861ebcd-1ba0-43a9-b699-8a11c2ef2e93" && coalesce(slug.current, "") != "adventure-to-yes"] | order(name.en asc) {
 _id,"_type":"proposalExperience","active":true,name,slug,"shortDescription":description,"basePrice":price,"currency":"USD",
 "mainImage":image${legacyImage},"gallery":gallery[]{_key,"image":${legacyImage}},
 "styles":variants[]{_key,name,description,price,"active":true,"mainImage":image${legacyImage}},
 "inclusions":inclusions[]{_key,"name":title,description,"active":true},
 "availableAddons":addons[]{_key,name,description,price,"active":true,"pricingType":"fixed","applicableTo":["proposal"]},
 "menuItems":[],"beverages":[],"occasions":[]
 }`,
    { id: id || null },
    { cache: "no-store" },
  );
  return rows.map((e) =>
    normalizeExperience({
      ...e,
      gallery: [{ _key: "main", image: e.mainImage }, ...(e.gallery || [])],
      styles: (e.styles || []).map((style, index) => ({
        ...style,
        mainImage: style.mainImage?.url
          ? style.mainImage
          : index === 0
            ? e.mainImage
            : e.gallery?.[index - 1]?.image || e.mainImage,
      })),
    }),
  );
}
