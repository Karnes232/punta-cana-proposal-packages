export type Locale = "en" | "es";
export type Localized = Partial<Record<Locale, string>>;
export type Image = { url?: string; alt?: Localized };
export type Entry = {
  _id?: string;
  _key?: string;
  name?: Localized;
  description?: Localized;
  active?: boolean;
  displayOrder?: number;
};
export type Photo = {
  _key?: string;
  image?: Image;
  alt?: Localized;
  caption?: Localized;
  displayOrder?: number;
};
export type Style = Entry & {
  mainImage?: Image;
  price?: number;
  gallery?: Photo[];
};
export type Addon = Entry & {
  price?: number;
  pricingType:
    | "fixed"
    | "perPerson"
    | "perUnit"
    | "perHour"
    | "per30Minutes"
    | "quoteOnly";
  applicableTo?: ("proposal" | "romanticDinner")[];
  minimumQuantity?: number;
  maximumQuantity?: number;
  durationMinutesPerUnit?: number;
  image?: Image;
  icon?: string;
};
export type Course = "starter" | "main" | "dessert";
export type MenuItem = Entry & {
  courseType: Course;
  included?: boolean;
  supplementPrice?: number;
  dietaryTags?: string[];
  allergenInformation?: Localized;
};
export type Beverage = Entry & {
  type: string;
  included?: boolean;
  supplementPrice?: number;
};
export type Occasion = Entry & { allowCustomMessage?: boolean };
export type Seo = {
  title?: Localized;
  description?: Localized;
  image?: Image;
  noIndex?: boolean;
};
export type Experience = Entry & {
  _id: string;
  _type: "proposalExperience" | "romanticDinnerExperience";
  slug?: { current: string };
  shortDescription?: Localized;
  longDescription?: Localized;
  basePrice?: number;
  currency?: string;
  priceLabel?: Localized;
  gallery: Photo[];
  styles: Style[];
  inclusions: Entry[];
  availableAddons: Addon[];
  menuItems: MenuItem[];
  beverages: Beverage[];
  occasions: Occasion[];
  includedGuests?: number;
  maximumGuests?: number;
  additionalGuestPrice?: number;
  includedDurationMinutes?: number;
  maximumDurationMinutes?: number;
  seo?: Seo;
};
export type Selection = {
  selectedStyleId?: string;
  addons: Record<string, number>;
  guestCount: number;
  guestMenus: Partial<Record<Course, string>>[];
  beverages: string[];
  selectedOccasionId?: string;
  customOccasion?: string;
};
export type Settings = Record<string, Localized | undefined>;
export type Home = {
  heroImage?: Image;
  eyebrow?: Localized;
  headline?: Localized;
  subheadline?: Localized;
  primaryCTA?: Localized;
  secondaryCTA?: Localized;
  contactHeading?: Localized;
  seo?: Seo;
};
export type Contact = {
  heading?: Localized;
  description?: Localized;
  businessInformation?: Localized;
  telephone?: string;
  email?: string;
  whatsapp?: string;
  seo?: Seo;
};
