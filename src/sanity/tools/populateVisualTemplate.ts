import type { SanityClient } from "@sanity/client";
import type { Localized } from "@/lib/experience/types";
import { dinnerTemplateId } from "@/lib/experience/dinnerTemplate";
import { proposalTemplateId } from "@/lib/experience/proposalTemplate";
const l = (en: string, es: string) => ({ en, es });
type Media = {
  _key?: string;
  asset?: { _ref: string; _type: string };
  alt?: string | Localized;
};
/**
 * Reference content for the templates: published proposals migrated from the
 * former proposal packages. The query maps them back into the shape this tool
 * was written for (hero image + gallery, variants, inclusions with titles,
 * add-ons keyed like the original inline add-ons, so the template's
 * proposal-template-reference-addon-* documents keep their IDs).
 */
const TEMPLATE_SOURCE_IDS = {
  dinner: "proposal-elegant-dinner-proposal",
  proposal: "proposal-everlasting-flame",
};
const sourceQuery = /* groq */ `*[_id == $id][0] {
  name,
  "description": shortDescription,
  "price": basePrice,
  "image": gallery[0].image { asset, "alt": alt.en },
  "gallery": gallery[1..-1] { _key, "asset": image.asset, "alt": image.alt.en },
  "variants": styles[] { _key, name, description, price },
  "inclusions": inclusions[] { _key, "title": name, description },
  "addons": availableAddons[]-> {
    // legacy-addon-<slug>-<key>: the key is the last segment (hex, no hyphens).
    "_key": string::split(_id, "-")[-1],
    name,
    description,
    price
  }
}`;
type Source = {
  name: Localized;
  description: Localized;
  price: number;
  image: Media;
  gallery: Media[];
  variants?: {
    _key: string;
    name: Localized;
    description?: Localized;
    price: number;
    image?: Media;
  }[];
  inclusions?: { _key: string; title: Localized; description?: Localized }[];
  addons?: {
    _key: string;
    name: Localized;
    description?: Localized;
    price: number;
  }[];
};
export async function populateVisualTemplate(
  client: SanityClient,
  kind: "dinner" | "proposal",
) {
  const dinner = kind === "dinner";
  const targetId = dinner ? dinnerTemplateId : proposalTemplateId;
  const sourceId = dinner
    ? TEMPLATE_SOURCE_IDS.dinner
    : TEMPLATE_SOURCE_IDS.proposal;
  const source = await client.fetch<Source>(
    sourceQuery,
    { id: sourceId },
    {
      perspective: "published",
    },
  );
  if (!source?.image?.asset)
    throw new Error("La referencia visual no está disponible.");
  const images = [source.image, ...(source.gallery || [])].filter(
    (image, index, all) =>
      image.asset &&
      all.findIndex((m) => m.asset?._ref === image.asset?._ref) === index,
  );
  if (images.length < 3)
    throw new Error("Se requieren al menos tres imágenes existentes.");
  const image = (media: Media, index: number) => ({
    _type: "image",
    asset: media.asset,
    alt: l(
      `${dinner ? "Romantic dinner" : "Marriage proposal"} setup reference ${index + 1} in Punta Cana`,
      `${dinner ? "Cena romántica" : "Propuesta de matrimonio"}: montaje de referencia ${index + 1} en Punta Cana`,
    ),
  });
  const gallery = images.slice(0, 5).map((media, index) => ({
    _key: "reference-photo-" + index,
    _type: "experiencePhoto",
    image: image(media, index),
    alt: image(media, index).alt,
    displayOrder: index,
  }));
  const rows = await client.fetch<
    Array<Record<string, unknown> & { _id: string; _rev: string }>
  >(
    "*[_id in $ids]",
    { ids: [targetId, "drafts." + targetId] },
    { perspective: "raw" },
  );
  const current = rows.find((d) => d._id.startsWith("drafts.")) || rows[0];
  if (!current) throw new Error("No se encontró la plantilla existente.");
  const oldStyles = (current.styles || []) as Array<Record<string, unknown>>;
  const fields: Record<string, unknown> = { gallery };
  let tx = client.transaction();
  if (dinner) {
    const names = [
      l("Setup 1 · Sunset", "Montaje 1 · Atardecer"),
      l("Setup 2 · Candlelight", "Montaje 2 · Luz de velas"),
      l("Setup 3 · Seaside", "Montaje 3 · Frente al mar"),
    ];
    fields.styles = names.map((name, index) => ({
      ...oldStyles[index],
      _key: oldStyles[index]?._key || "setup-" + (index + 1),
      _type: "dinnerStyle",
      name,
      description: l(
        "Illustrative setup using existing Sanity imagery. Replace with the final décor and photograph.",
        "Montaje ilustrativo con una imagen existente de Sanity. Sustituye la decoración y fotografía por la versión definitiva.",
      ),
      mainImage: image(images[[0, 3, 4][index]] || images[index], index),
      active: false,
      displayOrder: index,
    }));
  } else {
    fields.name = source.name;
    fields.shortDescription = source.description;
    fields.basePrice = source.price;
    fields.currency = "USD";
    fields.priceLabel = l("From", "Desde");
    fields.styles = (
      source.variants?.length
        ? source.variants
        : [
            {
              _key: "reference-style",
              name: source.name,
              description: source.description,
              price: source.price,
            },
          ]
    ).map((v, index) => ({
      _key: oldStyles[index]?._key || v._key,
      _type: "proposalStyle",
      name: v.name,
      description: v.description,
      price: v.price,
      mainImage: image(
        v.image?.asset ? v.image : images[index % images.length],
        index,
      ),
      active: false,
      displayOrder: index,
    }));
    fields.inclusions = (source.inclusions || []).map((v, index) => ({
      _key: v._key,
      _type: "experienceInclusion",
      name: v.title,
      description: v.description,
      active: true,
      displayOrder: index,
    }));
    const extras = (source.addons || []).map((v, index) => ({
      _id: "proposal-template-reference-addon-" + v._key,
      _type: "experienceAddon",
      name: v.name,
      description: v.description,
      price: v.price,
      pricingType: "fixed",
      applicableTo: ["proposal"],
      active: true,
      displayOrder: index,
    }));
    for (const extra of extras) tx = tx.createIfNotExists(extra);
    fields.availableAddons = extras.map((extra) => ({
      _key: extra._id,
      _type: "reference",
      _ref: extra._id,
    }));
  }
  // Update only the requested template. Original packages and assets remain untouched.
  const { _id, _rev, _createdAt, _updatedAt, _system, ...content } = current;
  void _id;
  void _rev;
  void _createdAt;
  void _updatedAt;
  void _system;
  if (!rows.some((d) => d._id === targetId))
    tx = tx.createIfNotExists({
      ...content,
      _id: targetId,
      _type: dinner ? "romanticDinnerExperience" : "proposalExperience",
      active: false,
    });
  tx = tx.patch(targetId, (p) => {
    const existing = rows.find((d) => d._id === targetId);
    return existing ? p.ifRevisionId(existing._rev).set(fields) : p.set(fields);
  });
  const draft = rows.find((d) => d._id === "drafts." + targetId);
  if (draft)
    tx = tx.patch(draft._id, (p) => p.ifRevisionId(draft._rev).set(fields));
  await tx.commit();
}
