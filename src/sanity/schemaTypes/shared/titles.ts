import type { SchemaTypeDefinition } from "sanity";
import { bi } from "./labels";

/**
 * Bilingual Studio titles, applied to every registered schema type by
 * withTitles() (schemaTypes/index.ts). Titles only change how the Studio
 * labels things; field names, stored data and the website are unaffected.
 */

/** Document and object types, keyed by schema type name. */
export const typeTitles: Record<string, string> = {
  // Catalog
  proposalExperience: bi("Paquete de propuesta", "Proposal package"),
  romanticDinnerExperience: bi("Cena romántica", "Romantic dinner"),
  experienceAddon: bi("Extra", "Add-on"),
  menuItem: bi("Plato del menú", "Menu item"),
  beverageOption: bi("Bebida", "Drink"),
  dinnerOccasion: bi("Ocasión", "Occasion"),
  experienceCatalogSettings: bi("Textos del catálogo", "Catalog text"),
  catalogHome: bi("Página de inicio", "Home page"),
  catalogContact: bi("Página de contacto", "Contact page"),
  proposalsPage: bi("Página de propuestas", "Proposals page"),
  romanticDinnersPage: bi(
    "Página de cenas románticas",
    "Romantic dinners page",
  ),
  proposalStyle: bi("Estilo de propuesta", "Proposal style"),
  dinnerStyle: bi("Montaje de cena", "Dinner setup"),
  experienceInclusion: bi("Incluye", "Inclusion"),
  experiencePhoto: bi("Foto", "Photo"),
  experienceSeo: "SEO",
  // Site-wide
  generalLayout: bi("Negocio y redes sociales", "Business & social links"),
  legalDocument: bi("Documento legal", "Legal document"),
  localizedString: bi("Texto (EN/ES/FR/PT)", "Text (EN/ES/FR/PT)"),
  localizedText: bi("Texto largo (EN/ES/FR/PT)", "Long text (EN/ES/FR/PT)"),
  localizedBlock: bi("Contenido (EN/ES/FR/PT)", "Rich text (EN/ES/FR/PT)"),
  blogLocalizedString: bi("Texto (9 idiomas)", "Text (9 languages)"),
  blogLocalizedText: bi("Texto largo (9 idiomas)", "Long text (9 languages)"),
  // Stories
  storiesPage: bi("Página de historias", "Stories page"),
  story: bi("Historia", "Story"),
  storyType: bi("Tipo de propuesta", "Proposal type"),
  // Blog
  blogPage: bi("Página del blog", "Blog page"),
  blogPost: bi("Artículo del blog", "Blog post"),
  blogPostSeo: "SEO",
  blogCategory: bi("Categoría del blog", "Blog category"),
  // FAQ
  faqPage: bi("Preguntas frecuentes", "FAQ"),
  // How it works
  howItWorksPage: bi("Cómo funciona", "How it works"),
};

/** Fields, keyed by field name (the same meaning on every type). */
export const fieldTitles: Record<string, string> = {
  // Names, text, identity
  internalTitle: bi("Nombre interno", "Internal name"),
  name: bi("Nombre", "Name"),
  names: bi("Nombres de la pareja", "Couple's names"),
  title: bi("Título", "Title"),
  description: bi("Descripción", "Description"),
  shortDescription: bi("Descripción corta", "Short description"),
  longDescription: bi("Descripción larga", "Long description"),
  excerpt: bi("Resumen", "Excerpt"),
  body: bi("Contenido", "Body"),
  content: bi("Contenido", "Content"),
  quote: bi("Cita", "Quote"),
  signature: bi("Firma", "Signature"),
  slug: bi("URL (slug)", "URL slug"),
  label: bi("Nombre visible", "Display name"),
  value: bi("Identificador (no cambiar)", "Identifier (don't change)"),
  pageName: bi("Página", "Page"),
  language: bi("Idioma del artículo", "Post language"),
  translationGroup: bi("Grupo de traducción", "Translation group"),
  location: bi("Lugar", "Location"),
  badge: bi("Etiqueta destacada", "Badge"),
  date: bi("Fecha", "Date"),
  publishedAt: bi("Fecha de publicación", "Published on"),
  readingTime: bi("Minutos de lectura", "Reading time (minutes)"),
  category: bi("Categoría", "Category"),
  categories: bi("Categorías", "Categories"),
  categoryTag: bi("Etiqueta de categoría", "Category tag"),
  proposalType: bi("Tipo de propuesta", "Proposal type"),
  packageTag: bi("Paquete", "Package"),
  coupleName: bi("Nombres de la pareja", "Couple's names"),
  packageUsed: bi("Paquete", "Package"),
  question: bi("Pregunta", "Question"),
  answer: bi("Respuesta", "Answer"),
  faqs: bi("Preguntas", "Questions"),
  step: bi("Paso", "Step"),
  steps: bi("Pasos", "Steps"),
  reassurance: bi("Garantías", "Reassurance"),
  items: bi("Elementos", "Items"),
  stories: bi("Historias", "Stories"),
  type: bi("Tipo", "Type"),
  icon: bi("Icono", "Icon"),
  // Headings and calls to action
  eyebrow: bi("Antetítulo", "Eyebrow"),
  heading: bi("Título", "Heading"),
  headingAccent: bi("Título (parte destacada)", "Heading (accent)"),
  headingLine1: bi("Título, línea 1", "Heading, line 1"),
  headingLine2: bi("Título, línea 2", "Heading, line 2"),
  headingLine3: bi("Título, línea 3", "Heading, line 3"),
  line1: bi("Línea 1", "Line 1"),
  line2: bi("Línea 2", "Line 2"),
  headline: bi("Titular", "Headline"),
  subheading: bi("Subtítulo", "Subheading"),
  subheadline: bi("Subtítulo", "Subheadline"),
  scriptLine: bi("Línea manuscrita", "Script line"),
  sublabel: bi("Texto secundario", "Sub-label"),
  text: bi("Texto", "Text"),
  cta: bi("Texto del botón", "Button text"),
  ctaLabel: bi("Texto del botón", "Button text"),
  ctaHref: bi("Enlace del botón", "Button link"),
  ctaButtonLabel: bi("Texto del botón", "Button text"),
  href: bi("Enlace", "Link"),
  primaryLabel: bi("Botón principal: texto", "Main button: text"),
  primaryHref: bi("Botón principal: enlace", "Main button: link"),
  primaryCTA: bi("Botón principal: texto", "Main button: text"),
  primaryCTAHref: bi("Botón principal: enlace", "Main button: link"),
  secondaryLabel: bi("Botón secundario: texto", "Second button: text"),
  secondaryHref: bi("Botón secundario: enlace", "Second button: link"),
  secondaryCTA: bi("Botón secundario: texto", "Second button: text"),
  secondaryCTAHref: bi("Botón secundario: enlace", "Second button: link"),
  contactHeading: bi("Título de contacto", "Contact heading"),
  // Images
  image: bi("Imagen", "Image"),
  mainImage: bi("Imagen principal", "Main image"),
  heroImage: bi("Foto de portada", "Hero photo"),
  heroPhoto: bi("Foto de portada", "Hero photo"),
  proposalSelectorImage: bi(
    "Foto del selector: propuesta",
    "Selector photo: proposal",
  ),
  dinnerSelectorImage: bi("Foto del selector: cena", "Selector photo: dinner"),
  journeyImages: bi("Fotos del recorrido", "Journey photos"),
  editorialImages: bi("Fotos editoriales", "Editorial photos"),
  moments: bi("Momentos reales (galería)", "Real moments (gallery)"),
  gallery: bi("Galería", "Gallery"),
  alt: bi("Texto alternativo", "Alt text"),
  altText: bi("Texto alternativo", "Alt text"),
  caption: bi("Pie de foto", "Caption"),
  companyLogo: "Logo",
  favicon: bi("Icono del sitio", "Favicon"),
  // Prices, capacity, ordering
  basePrice: bi("Precio base", "Base price"),
  price: bi("Precio", "Price"),
  priceLabel: bi("Texto del precio", "Price label"),
  currency: bi("Moneda (USD)", "Currency (USD)"),
  supplementPrice: bi("Precio del suplemento", "Supplement price"),
  additionalGuestPrice: bi(
    "Precio por invitado adicional",
    "Price per extra guest",
  ),
  pricingType: bi("Tipo de precio", "Pricing type"),
  included: bi("Incluido en el precio", "Included in the price"),
  includedGuests: bi("Invitados incluidos", "Included guests"),
  minimumGuests: bi("Mínimo de invitados", "Minimum guests"),
  maximumGuests: bi("Máximo de invitados", "Maximum guests"),
  includedDurationMinutes: bi(
    "Duración incluida (minutos)",
    "Included duration (minutes)",
  ),
  maximumDurationMinutes: bi(
    "Duración máxima (minutos)",
    "Maximum duration (minutes)",
  ),
  durationMinutesPerUnit: bi("Minutos por unidad", "Minutes per unit"),
  minimumQuantity: bi("Cantidad mínima", "Minimum quantity"),
  maximumQuantity: bi("Cantidad máxima", "Maximum quantity"),
  dinnerDepositAmount: bi("Depósito de la cena (USD)", "Dinner deposit (USD)"),
  active: bi("Activo (visible en el sitio)", "Active (shown on the site)"),
  featured: bi("Destacado", "Featured"),
  displayOrder: bi("Orden", "Display order"),
  internalNotes: bi("Notas internas", "Internal notes"),
  // Experience contents
  styles: bi("Estilos", "Styles"),
  inclusions: bi("Incluye", "Inclusions"),
  availableAddons: bi("Extras disponibles", "Available add-ons"),
  applicableTo: bi("Disponible para", "Available for"),
  menuItems: bi("Platos del menú", "Menu items"),
  beverages: bi("Bebidas", "Drinks"),
  occasions: bi("Ocasiones", "Occasions"),
  courseType: bi("Tiempo del menú", "Course"),
  dietaryType: bi("Tipo de dieta", "Dietary type"),
  dietaryTags: bi("Etiquetas de dieta", "Dietary tags"),
  allergenInformation: bi("Alérgenos", "Allergens"),
  allowCustomMessage: bi(
    "Permitir mensaje personalizado",
    "Allow a custom message",
  ),
  featuredProposals: bi("Propuestas destacadas", "Featured proposals"),
  featuredStory: bi("Historia destacada", "Featured story"),
  featuredPost: bi("Artículo destacado", "Featured post"),
  copy: bi("Textos de la página", "Page text"),
  // Business details
  companyName: bi("Nombre de la empresa", "Company name"),
  companyDescription: bi("Descripción de la empresa", "Company description"),
  businessInformation: bi("Información del negocio", "Business information"),
  email: "Email",
  telephone: bi("Teléfono", "Telephone"),
  whatsapp: "WhatsApp",
  socialLinks: bi("Redes sociales", "Social links"),
  facebook: "Facebook",
  instagram: "Instagram",
  xURL: "X (Twitter)",
  MessengerURL: "Messenger",
  // SEO
  seo: "SEO",
  meta: bi("Título y descripción (Google)", "Title & description (Google)"),
  keywords: bi("Palabras clave", "Keywords"),
  openGraph: bi("Al compartir en redes", "Social sharing"),
  structuredData: bi("Datos estructurados (JSON-LD)", "Structured data"),
  noIndex: bi("Ocultar de Google", "Hide from Google (noindex)"),
  noFollow: bi("No seguir enlaces", "Don't follow links (nofollow)"),
};

/** Field group tabs, keyed by group name. */
export const groupTitles: Record<string, string> = {
  general: bi("General", "General"),
  basic: bi("General", "General"),
  media: bi("Fotos", "Photos"),
  styles: bi("Estilos", "Styles"),
  inclusions: bi("Incluye", "Inclusions"),
  addons: bi("Extras", "Add-ons"),
  display: bi("Publicación", "Display"),
  menu: bi("Menú", "Menu"),
  beverages: bi("Bebidas", "Drinks"),
  occasions: bi("Ocasiones", "Occasions"),
  capacity: bi("Invitados y horario", "Guests & time"),
  blogPost: bi("Artículo", "Post"),
  story: bi("Historia", "Story"),
  content: bi("Contenido", "Content"),
  faq: bi("Preguntas", "Questions"),
  steps: bi("Pasos", "Steps"),
  reassurance: bi("Garantías", "Reassurance"),
  seo: "SEO",
  social: bi("Redes sociales", "Social media"),
  structured: bi("Datos estructurados", "Structured data"),
  hero: bi("Portada", "Hero"),
  form: bi("Formulario", "Form"),
  trustBar: bi("Franja de confianza", "Trust bar"),
};

/** Fields whose meaning depends on the type they are in. */
export const fieldTitleOverrides: Record<string, Record<string, string>> = {
  catalogContact: {
    heading: bi("Título de la página", "Page heading"),
    description: bi("Introducción", "Introduction"),
  },
  beverageOption: { type: bi("Tipo de bebida", "Drink type") },
  generalLayout: { description: bi("Descripción", "Description") },
};

type FieldLike = {
  name?: string;
  title?: string;
  fields?: FieldLike[];
  of?: FieldLike[];
  groups?: { name: string; title?: string }[];
};

function titleFields(
  fields: FieldLike[] | undefined,
  typeName: string,
): FieldLike[] | undefined {
  return fields?.map((f) => ({
    ...f,
    // A title that is already bilingual was chosen on purpose (e.g. a site
    // text titled with the words it shows); keep it.
    title: f.title?.includes(" / ")
      ? f.title
      : (f.name && fieldTitleOverrides[typeName]?.[f.name]) ||
        (f.name && fieldTitles[f.name]) ||
        f.title,
    ...(f.fields ? { fields: titleFields(f.fields, typeName) } : {}),
    ...(f.of
      ? {
          of: f.of.map((m) =>
            m.fields ? { ...m, fields: titleFields(m.fields, typeName) } : m,
          ),
        }
      : {}),
  }));
}

/** Applies typeTitles / fieldTitles / groupTitles to schema types (titles only). */
export function withTitles(
  types: SchemaTypeDefinition[],
): SchemaTypeDefinition[] {
  return types.map((type) => {
    const t = type as SchemaTypeDefinition & FieldLike;
    return {
      ...t,
      title: typeTitles[t.name] ?? t.title,
      ...(t.fields ? { fields: titleFields(t.fields, t.name) } : {}),
      ...(t.groups
        ? {
            groups: t.groups.map((g) => ({
              ...g,
              title: groupTitles[g.name] ?? g.title,
            })),
          }
        : {}),
    } as SchemaTypeDefinition;
  });
}
