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
export const experienceProjection = `{${entry},_type,slug,shortDescription,longDescription,basePrice,currency,priceLabel,includedGuests,maximumGuests,additionalGuestPrice,includedDurationMinutes,maximumDurationMinutes,inclusions[]{${entry},icon},gallery[]${photo},styles[]{${entry},price,mainImage${img},gallery[]${photo}},availableAddons[]->{${entry},price,pricingType,applicableTo,minimumQuantity,maximumQuantity,durationMinutesPerUnit,icon,image${img}},menuItems[]->{${entry},courseType,included,supplementPrice,dietaryTags,allergenInformation},beverages[]->{${entry},type,included,supplementPrice},occasions[]->{${entry},allowCustomMessage},seo{...,image${img}}}`;
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
