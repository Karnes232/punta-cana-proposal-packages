// GROQ building blocks for the experience catalog (proposals and romantic
// dinners). Whitespace inside GROQ is insignificant, so these are written
// one field per line for readability.

/** An image as {url, alt}; alt is the localized {en, es} object. */
export const imageWithAlt = /* groq */ `{
  "url": asset->url,
  alt
}`;

/** One photo in a gallery array (experiencePhoto). */
export const galleryPhoto = /* groq */ `{
  _key,
  alt,
  caption,
  displayOrder,
  image ${imageWithAlt}
}`;

/** Fields every catalog entry shares: styles, inclusions, add-ons, menu items… */
export const catalogEntryFields = /* groq */ `
  _id,
  _key,
  name,
  description,
  active,
  displayOrder
`;

/** Everything the site renders for a proposal or romantic dinner. */
export const experienceProjection = /* groq */ `{
  ${catalogEntryFields},
  _type,
  slug,
  shortDescription,
  longDescription,
  basePrice,
  currency,
  priceLabel,
  location,
  badge,
  includedGuests,
  minimumGuests,
  maximumGuests,
  additionalGuestPrice,
  includedDurationMinutes,
  maximumDurationMinutes,
  inclusions[] {
    ${catalogEntryFields},
    icon
  },
  gallery[] ${galleryPhoto},
  styles[] {
    ${catalogEntryFields},
    price,
    mainImage ${imageWithAlt},
    gallery[] ${galleryPhoto}
  },
  availableAddons[]-> {
    ${catalogEntryFields},
    price,
    pricingType,
    applicableTo,
    minimumQuantity,
    maximumQuantity,
    durationMinutesPerUnit,
    icon,
    image ${imageWithAlt}
  },
  menuItems[]-> {
    ${catalogEntryFields},
    courseType,
    included,
    supplementPrice,
    dietaryType,
    dietaryTags,
    allergenInformation,
    image ${imageWithAlt}
  },
  beverages[]-> {
    ${catalogEntryFields},
    type,
    included,
    supplementPrice,
    image ${imageWithAlt}
  },
  occasions[]-> {
    ${catalogEntryFields},
    allowCustomMessage
  },
  seo {
    ...,
    image ${imageWithAlt}
  }
}`;

/** Public, active experiences. */
export const activeExperienceFilter = /* groq */ `
  _type in ["proposalExperience", "romanticDinnerExperience"]
  && active == true
`;
