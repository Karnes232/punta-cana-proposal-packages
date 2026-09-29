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
export const catalogQuery = `*[_type in ["proposalExperience","romanticDinnerExperience"] && active==true] | order(displayOrder asc,_id asc) ${experienceProjection}`;
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
    `*[_id==$id && _type in ["proposalExperience","romanticDinnerExperience"] && active==true][0]${experienceProjection}`,
    { id },
    { cache: "no-store" },
  );
  return e ? normalizeExperience(e) : null;
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
  const row = await fresh.fetch<Experience | null>(
    `*[_id=="8d9e1e5f-d981-4276-ab95-8d88a3ebd429"][0]${experienceProjection}`,
    {},
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
