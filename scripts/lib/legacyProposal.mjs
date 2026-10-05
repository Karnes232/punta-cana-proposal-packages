// Maps a legacy IndividualProposalPackage document to a proposalExperience
// (plus experienceAddon documents for its add-ons). Shared by
// migrate-legacy-proposals.mjs and migrate-studio-content.mjs.
//
// The output mirrors what the old /proposals page rendered: hero first in the
// gallery, English alt text reused for Spanish, the same style-image fallback,
// and no gallery captions unless withCaptions is set.
export const localized = (value, type = "localizedString") =>
  value
    ? { _type: type, en: value.en ?? "", es: value.es ?? value.en ?? "" }
    : undefined;

// Legacy alt text is one English string; the new model stores {en, es}.
const image = (source) =>
  source?.asset
    ? {
        _type: "image",
        asset: { _type: "reference", _ref: source.asset._ref },
        ...(source.hotspot ? { hotspot: source.hotspot } : {}),
        ...(source.crop ? { crop: source.crop } : {}),
        alt: {
          _type: "localizedString",
          en: source.alt ?? "",
          es: source.alt ?? "",
        },
      }
    : undefined;

const missingSpanish = (value) => value?.en && !value?.es;

export function mapLegacyProposal(
  pkg,
  displayOrder,
  { withCaptions = false, active = true } = {},
) {
  const slug = pkg.slug.current;
  const report = { slug, notes: [] };

  const legacyGallery = pkg.gallery ?? [];
  const photos = [{ _key: "main", ...pkg.image }, ...legacyGallery];
  const gallery = photos.map((photo, index) => {
    const img = image(photo);
    return {
      _key: photo._key,
      _type: "experiencePhoto",
      image: img,
      alt: img?.alt,
      displayOrder: index,
      ...(withCaptions && photo.caption
        ? { caption: localized(photo.caption) }
        : {}),
    };
  });
  const captions = legacyGallery.filter(
    (p) => p.caption?.en || p.caption?.es,
  ).length;
  if (captions && !withCaptions)
    report.notes.push(`${captions} gallery caption(s) not copied`);

  // Same fallback as getLegacyProposals: the hero for the first style, then the
  // gallery photo before it, so each style shows the image it shows today.
  const styles = (pkg.variants ?? []).map((variant, index) => {
    const fallback =
      index === 0 ? pkg.image : (legacyGallery[index - 1] ?? pkg.image);
    if (!variant.image?.asset)
      report.notes.push(`style ${index + 1} image from fallback`);
    if (missingSpanish(variant.name))
      report.notes.push(`style ${index + 1} name has no Spanish`);
    return {
      _key: variant._key,
      _type: "proposalStyle",
      name: localized(variant.name),
      description: localized(variant.description, "localizedText"),
      price: variant.price,
      mainImage: image(variant.image?.asset ? variant.image : fallback),
      active: true,
      displayOrder: index,
    };
  });

  const inclusions = (pkg.inclusions ?? []).map((inclusion, index) => {
    if (missingSpanish(inclusion.title))
      report.notes.push(
        `inclusion "${inclusion.title.en}" has no Spanish title`,
      );
    return {
      _key: inclusion._key,
      _type: "experienceInclusion",
      name: localized(inclusion.title),
      description: localized(inclusion.description, "localizedText"),
      icon: inclusion.icon,
      active: true,
      displayOrder: index,
    };
  });

  const addons = (pkg.addons ?? []).map((addon, index) => ({
    _id: `legacy-addon-${slug}-${addon._key}`,
    _type: "experienceAddon",
    internalTitle: `${pkg.name?.en ?? slug}: ${addon.name?.en ?? addon._key}`,
    name: localized(addon.name),
    description: localized(addon.description, "localizedText"),
    price: addon.price,
    pricingType: "fixed",
    applicableTo: ["proposal"],
    icon: addon.icon,
    active: true,
    displayOrder: index,
  }));

  const meta = pkg.seo?.meta;
  const seo = pkg.seo
    ? {
        _type: "experienceSeo",
        title: localized({ en: meta?.en?.title, es: meta?.es?.title }),
        description: localized(
          { en: meta?.en?.description, es: meta?.es?.description },
          "localizedText",
        ),
        ...(pkg.seo.openGraph?.image?.asset
          ? { image: image(pkg.seo.openGraph.image) }
          : {}),
        noIndex: pkg.seo.noIndex ?? false,
      }
    : undefined;
  if (pkg.seo)
    report.notes.push(
      "SEO keywords, Open Graph text and structured data have no field (dropped)",
    );

  const proposal = {
    _id: `proposal-${slug}`,
    _type: "proposalExperience",
    internalTitle: `${pkg.name?.en ?? slug} (migrated from ${pkg._id})`,
    name: localized(pkg.name),
    slug: { _type: "slug", current: slug },
    shortDescription: localized(pkg.description, "localizedText"),
    basePrice: pkg.price,
    currency: "USD",
    gallery,
    styles,
    inclusions,
    availableAddons: addons.map((addon) => ({
      _key: addon._id,
      _type: "reference",
      _ref: addon._id,
    })),
    active,
    displayOrder,
    ...(seo ? { seo } : {}),
  };

  Object.assign(report, {
    id: proposal._id,
    price: pkg.price,
    photos: gallery.length,
    styles: styles.length,
    inclusions: inclusions.length,
    addons: addons.length,
  });
  return { proposal, addons, report };
}
