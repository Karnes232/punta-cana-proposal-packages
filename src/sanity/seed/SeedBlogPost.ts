/**
 * Seed script for Blog Posts content.
 *
 * Run with:  npx tsx src/sanity/seed/seedBlogPosts.ts
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env
 *   - SANITY_API_WRITE_TOKEN in .env (create at sanity.io/manage → API → Tokens)
 *   - The blogPost and blogPostSeo schemas must be deployed to your Studio first
 *   - BlogCategory documents are created by this script before posts (fixed IDs below)
 *
 * This script uses createOrReplace so it's safe to re-run — it will
 * overwrite existing blog post documents each time.
 *
 * NOTE: heroPhoto and gallery images require uploaded assets.
 * Upload images via the Studio or via client.assets.upload() and
 * reference them here. For now these fields are omitted — fill them
 * in the Studio after running the seed.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Portable Text helper — creates a simple paragraph block */
function block(text: string, key: string, style: string = "normal") {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  };
}

/** Portable Text helper — creates an h2 heading block */
function h2(text: string, key: string) {
  return block(text, key, "h2");
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog categories — seeded first so post references resolve
// ─────────────────────────────────────────────────────────────────────────────

const BLOG_CATEGORIES = [
  {
    _id: "blogCategory-planning-tips",
    _type: "BlogCategory" as const,
    value: "planning-tips",
    label: {
      en: "Planning Tips",
      es: "Consejos de planificación",
    },
  },
  {
    _id: "blogCategory-destination-guides",
    _type: "BlogCategory" as const,
    value: "destination-guides",
    label: {
      en: "Destination Guides",
      es: "Guías de destinos",
    },
  },
];

const CATEGORY_PLANNING_TIPS = {
  _type: "reference" as const,
  _ref: "blogCategory-planning-tips",
};

const CATEGORY_DESTINATION_GUIDES = {
  _type: "reference" as const,
  _ref: "blogCategory-destination-guides",
};

// ─────────────────────────────────────────────────────────────────────────────
// POST 1 — The Ultimate Guide to Planning a Proposal in Punta Cana
// translationGroup: proposal-planning-guide-2025
// ─────────────────────────────────────────────────────────────────────────────

const post1_en = {
  _id: "blogPost-proposal-planning-guide-en",
  _type: "blogPost",
  language: "en",
  translationGroup: "proposal-planning-guide-2025",
  slug: { _type: "slug", current: "the-ultimate-guide-to-planning-a-proposal-in-punta-cana" },
  title: "The Ultimate Guide to Planning a Proposal in Punta Cana",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Planning Tips",
  publishedAt: "2025-03-15",
  readingTime: 8,
  excerpt:
    "From choosing the perfect beach to coordinating florals, photography, and the element of surprise — everything you need to plan a flawless Caribbean proposal.",
  body: [
    h2("Why Punta Cana Is the Perfect Proposal Destination", "p1-en-b1"),
    block(
      "There is a reason Punta Cana appears on every list of dream proposal locations. With over 30 kilometers of white-sand coastline, year-round warm weather, and sunsets that paint the sky in shades of amber and rose, the Dominican Republic's eastern coast offers a backdrop that feels as though it were designed for the question you are about to ask.",
      "p1-en-b2",
    ),
    block(
      "But a stunning location alone does not guarantee a perfect moment. Behind every seamless beach proposal is meticulous planning — the kind that transforms a beautiful idea into an experience your partner will replay for the rest of their life.",
      "p1-en-b3",
    ),
    h2("Choosing Your Location", "p1-en-b4"),
    block(
      "Not every beach is created equal. Some stretches of coastline offer seclusion and tranquility; others provide dramatic cliff-top views or access to overwater structures. The right location depends on what matters most to your partner.",
      "p1-en-b5",
    ),
    block(
      "Playa Bávaro is the most popular choice for good reason — its powdery sand, shallow turquoise water, and eastward orientation deliver golden-hour light that photographers covet. For a more private affair, Cap Cana's Juanillo Beach offers a secluded cove with calm waters and limited foot traffic. If your partner loves dramatic landscapes, the rocky bluffs near Hoyo Azul create a cinematic contrast to the Caribbean's soft tones.",
      "p1-en-b6",
    ),
    h2("Timing Is Everything", "p1-en-b7"),
    block(
      "The golden hour — roughly 45 minutes before sunset — is the most requested window, and for good reason. The light is warm and soft, shadows become flattering, and the sky transforms behind you as the moment unfolds.",
      "p1-en-b8",
    ),
    block(
      "However, sunrise proposals carry their own magic. The beach is nearly empty, the air is cool, and there is a quiet intimacy that sunset cannot replicate. If your partner is an early riser, consider a dawn setup with a champagne breakfast waiting afterward.",
      "p1-en-b9",
    ),
    block(
      "We recommend booking at least six to eight weeks in advance, and ten or more during peak season (December through April) to secure your preferred date, location, and vendors.",
      "p1-en-b10",
    ),
    h2("Coordinating the Details", "p1-en-b11"),
    block(
      "A proposal in Punta Cana typically involves several moving pieces: floral design, photography or videography, decor setup and teardown, sometimes live music, and always a strategy for getting your partner to the right place at the right time without raising suspicion.",
      "p1-en-b12",
    ),
    block(
      'The most successful proposals share a common thread — a credible cover story. Perhaps it is a "sunset walk" suggested by the resort concierge, or a "special dinner reservation" that happens to route through the beach. Your planner will help you craft a natural reason to be exactly where you need to be.',
      "p1-en-b13",
    ),
    h2("What to Expect on the Day", "p1-en-b14"),
    block(
      "Your planning team will handle all logistics. Decor is set up one to two hours before the moment, hidden from public view. Your photographer will already be in position, capturing candid shots as you walk toward the setup.",
      "p1-en-b15",
    ),
    block(
      "Once you reach the location, the moment is entirely yours. There is no script, no rush. After the question, your photographer will guide you through a brief portrait session while the champagne is poured and the last light of the day fades.",
      "p1-en-b16",
    ),
    h2("Final Thoughts", "p1-en-b17"),
    block(
      "Planning a proposal in Punta Cana is not about managing every detail yourself — it is about finding the right team to bring your vision to life so that you can be fully present for the moment that matters. The beach, the light, the flowers — those are the frame. You and your partner are the story.",
      "p1-en-b18",
    ),
  ],
  seo: {
    meta: {
      title: "Planning a Proposal in Punta Cana — Ultimate Guide",
      description:
        "A complete guide to planning a beach proposal in Punta Cana. Locations, timing, florals, photography, and expert tips for an unforgettable Caribbean engagement.",
      keywords: [
        "punta cana proposal",
        "beach proposal planning",
        "caribbean engagement",
        "dominican republic proposal",
        "proposal guide",
      ],
    },
    openGraph: {
      title: "The Ultimate Guide to Planning a Proposal in Punta Cana",
      description:
        "Everything you need to plan a flawless Caribbean proposal — from choosing the perfect beach to coordinating every detail.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post1_es = {
  _id: "blogPost-proposal-planning-guide-es",
  _type: "blogPost",
  language: "es",
  translationGroup: "proposal-planning-guide-2025",
  slug: { _type: "slug", current: "guia-definitiva-planificar-propuesta-punta-cana" },
  title: "La Guía Definitiva para Planificar una Propuesta en Punta Cana",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Consejos de Planificación",
  publishedAt: "2025-03-15",
  readingTime: 8,
  excerpt:
    "Desde elegir la playa perfecta hasta coordinar flores, fotografía y el elemento sorpresa — todo lo que necesitas para planificar una propuesta impecable en el Caribe.",
  body: [
    h2("Por Qué Punta Cana Es el Destino Perfecto para una Propuesta", "p1-es-b1"),
    block(
      "Hay una razón por la que Punta Cana aparece en cada lista de lugares soñados para pedir matrimonio. Con más de 30 kilómetros de costa de arena blanca, clima cálido todo el año y atardeceres que pintan el cielo en tonos ámbar y rosa, la costa este de República Dominicana ofrece un escenario que parece diseñado para la pregunta que estás a punto de hacer.",
      "p1-es-b2",
    ),
    block(
      "Pero un lugar impresionante por sí solo no garantiza un momento perfecto. Detrás de cada propuesta de playa impecable hay una planificación meticulosa — el tipo que transforma una idea hermosa en una experiencia que tu pareja recordará por el resto de su vida.",
      "p1-es-b3",
    ),
    h2("Elegir la Ubicación Ideal", "p1-es-b4"),
    block(
      "No todas las playas son iguales. Algunas ofrecen reclusión y tranquilidad; otras brindan vistas dramáticas desde acantilados o acceso a estructuras sobre el agua. La ubicación correcta depende de lo que más le importa a tu pareja.",
      "p1-es-b5",
    ),
    block(
      "Playa Bávaro es la opción más popular por una buena razón — su arena suave, aguas turquesas poco profundas y orientación al este proporcionan una luz de hora dorada que los fotógrafos codician. Para algo más privado, la Playa Juanillo en Cap Cana ofrece una caleta aislada con aguas tranquilas y poco tránsito peatonal. Si tu pareja ama los paisajes dramáticos, los acantilados rocosos cerca de Hoyo Azul crean un contraste cinematográfico con los tonos suaves del Caribe.",
      "p1-es-b6",
    ),
    h2("El Momento lo Es Todo", "p1-es-b7"),
    block(
      "La hora dorada — aproximadamente 45 minutos antes del atardecer — es la ventana más solicitada, y con razón. La luz es cálida y suave, las sombras se vuelven favorecedoras y el cielo se transforma detrás de ti mientras el momento se despliega.",
      "p1-es-b8",
    ),
    block(
      "Sin embargo, las propuestas al amanecer tienen su propia magia. La playa está casi vacía, el aire es fresco y hay una intimidad silenciosa que el atardecer no puede replicar. Si tu pareja madruga, considera un montaje al alba con un desayuno con champán esperando después.",
      "p1-es-b9",
    ),
    block(
      "Recomendamos reservar con al menos seis a ocho semanas de anticipación, y diez o más durante temporada alta (diciembre a abril) para asegurar tu fecha, ubicación y proveedores preferidos.",
      "p1-es-b10",
    ),
    h2("Coordinar los Detalles", "p1-es-b11"),
    block(
      "Una propuesta en Punta Cana típicamente involucra varias piezas en movimiento: diseño floral, fotografía o videografía, montaje y desmontaje de decoración, a veces música en vivo, y siempre una estrategia para llevar a tu pareja al lugar correcto en el momento exacto sin levantar sospechas.",
      "p1-es-b12",
    ),
    block(
      'Las propuestas más exitosas comparten un hilo común — una historia de cobertura creíble. Quizás es una "caminata al atardecer" sugerida por el concierge del resort, o una "reservación especial para cenar" que casualmente pasa por la playa. Tu planificador te ayudará a crear una razón natural para estar exactamente donde necesitas estar.',
      "p1-es-b13",
    ),
    h2("Qué Esperar el Día de la Propuesta", "p1-es-b14"),
    block(
      "Tu equipo de planificación se encargará de toda la logística. La decoración se monta una a dos horas antes del momento, oculta de la vista pública. Tu fotógrafo ya estará en posición, capturando fotos espontáneas mientras caminas hacia el montaje.",
      "p1-es-b15",
    ),
    block(
      "Una vez que llegues al lugar, el momento es completamente tuyo. No hay guión, no hay prisa. Después de la pregunta, tu fotógrafo los guiará en una breve sesión de retratos mientras se sirve el champán y la última luz del día se desvanece.",
      "p1-es-b16",
    ),
    h2("Reflexiones Finales", "p1-es-b17"),
    block(
      "Planificar una propuesta en Punta Cana no se trata de manejar cada detalle tú mismo — se trata de encontrar al equipo correcto para dar vida a tu visión para que puedas estar completamente presente en el momento que importa. La playa, la luz, las flores — esos son el marco. Tú y tu pareja son la historia.",
      "p1-es-b18",
    ),
  ],
  seo: {
    meta: {
      title: "Planificar una Propuesta en Punta Cana — Guía Completa",
      description:
        "Guía completa para planificar una propuesta de playa en Punta Cana. Ubicaciones, horarios, flores, fotografía y consejos expertos para un compromiso inolvidable.",
      keywords: [
        "propuesta punta cana",
        "planificar propuesta playa",
        "compromiso caribe",
        "propuesta república dominicana",
      ],
    },
    openGraph: {
      title: "La Guía Definitiva para Planificar una Propuesta en Punta Cana",
      description:
        "Todo lo que necesitas para planificar una propuesta perfecta en el Caribe — desde la playa ideal hasta cada detalle.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post1_fr = {
  _id: "blogPost-proposal-planning-guide-fr",
  _type: "blogPost",
  language: "fr",
  translationGroup: "proposal-planning-guide-2025",
  slug: { _type: "slug", current: "guide-ultime-planifier-demande-mariage-punta-cana" },
  title: "Le Guide Ultime pour Planifier une Demande en Mariage à Punta Cana",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Conseils de Planification",
  publishedAt: "2025-03-15",
  readingTime: 8,
  excerpt:
    "Du choix de la plage parfaite à la coordination des fleurs, de la photographie et de l'effet de surprise — tout ce qu'il faut pour planifier une demande en mariage inoubliable dans les Caraïbes.",
  body: [
    h2("Pourquoi Punta Cana Est la Destination Idéale pour une Demande en Mariage", "p1-fr-b1"),
    block(
      "Il y a une raison pour laquelle Punta Cana figure sur toutes les listes de lieux de rêve pour une demande en mariage. Avec plus de 30 kilomètres de côte de sable blanc, un climat chaud toute l'année et des couchers de soleil qui peignent le ciel de nuances ambrées et rosées, la côte est de la République dominicaine offre un décor qui semble conçu pour la question que vous êtes sur le point de poser.",
      "p1-fr-b2",
    ),
    block(
      "Mais un lieu magnifique seul ne garantit pas un moment parfait. Derrière chaque demande en mariage sur la plage se cache une planification méticuleuse — celle qui transforme une belle idée en une expérience que votre partenaire revivra pour le reste de sa vie.",
      "p1-fr-b3",
    ),
    h2("Choisir Votre Emplacement", "p1-fr-b4"),
    block(
      "Toutes les plages ne se valent pas. Certaines offrent isolement et tranquillité ; d'autres proposent des vues spectaculaires depuis les falaises ou un accès à des structures sur l'eau. Le bon emplacement dépend de ce qui compte le plus pour votre partenaire.",
      "p1-fr-b5",
    ),
    block(
      "Playa Bávaro est le choix le plus populaire pour une bonne raison — son sable poudreux, ses eaux turquoises peu profondes et son orientation à l'est offrent une lumière dorée que les photographes convoitent. Pour un moment plus privé, la plage de Juanillo à Cap Cana propose une crique isolée aux eaux calmes. Si votre partenaire aime les paysages dramatiques, les falaises rocheuses près de Hoyo Azul créent un contraste cinématographique avec les tons doux des Caraïbes.",
      "p1-fr-b6",
    ),
    h2("Le Timing Est Essentiel", "p1-fr-b7"),
    block(
      "L'heure dorée — environ 45 minutes avant le coucher du soleil — est le créneau le plus demandé, et à juste titre. La lumière est chaude et douce, les ombres deviennent flatteuses et le ciel se transforme derrière vous tandis que le moment se déroule.",
      "p1-fr-b8",
    ),
    block(
      "Cependant, les demandes au lever du soleil ont leur propre magie. La plage est presque déserte, l'air est frais, et il y a une intimité silencieuse que le coucher de soleil ne peut pas reproduire. Si votre partenaire est matinal, envisagez une installation à l'aube avec un petit-déjeuner au champagne.",
      "p1-fr-b9",
    ),
    block(
      "Nous recommandons de réserver au moins six à huit semaines à l'avance, et dix semaines ou plus en haute saison (décembre à avril).",
      "p1-fr-b10",
    ),
    h2("Coordonner les Détails", "p1-fr-b11"),
    block(
      "Une demande en mariage à Punta Cana implique généralement plusieurs éléments : design floral, photographie ou vidéographie, installation et démontage de la décoration, parfois de la musique live, et toujours une stratégie pour amener votre partenaire au bon endroit au bon moment sans éveiller les soupçons.",
      "p1-fr-b12",
    ),
    block(
      "Les demandes les plus réussies partagent un fil conducteur — une histoire de couverture crédible. Peut-être une « promenade au coucher du soleil » suggérée par le concierge de l'hôtel, ou une « réservation spéciale pour dîner » qui passe par la plage. Votre organisateur vous aidera à créer une raison naturelle d'être exactement là où vous devez être.",
      "p1-fr-b13",
    ),
    h2("À Quoi S'attendre le Jour J", "p1-fr-b14"),
    block(
      "Votre équipe gère toute la logistique. La décoration est installée une à deux heures avant le moment, cachée de la vue publique. Votre photographe sera déjà en position, capturant des clichés spontanés tandis que vous marchez vers l'installation.",
      "p1-fr-b15",
    ),
    block(
      "Une fois sur place, le moment est entièrement le vôtre. Pas de script, pas de précipitation. Après la question, votre photographe vous guidera dans une brève séance de portraits pendant que le champagne est servi et que la dernière lumière du jour s'estompe.",
      "p1-fr-b16",
    ),
    h2("Réflexions Finales", "p1-fr-b17"),
    block(
      "Planifier une demande en mariage à Punta Cana ne consiste pas à gérer chaque détail vous-même — il s'agit de trouver la bonne équipe pour donner vie à votre vision afin que vous puissiez être pleinement présent pour le moment qui compte. La plage, la lumière, les fleurs — ce sont le cadre. Vous et votre partenaire êtes l'histoire.",
      "p1-fr-b18",
    ),
  ],
  seo: {
    meta: {
      title: "Planifier une Demande en Mariage à Punta Cana — Guide Complet",
      description:
        "Guide complet pour planifier une demande en mariage sur la plage à Punta Cana. Emplacements, timing, fleurs, photographie et conseils d'experts.",
      keywords: [
        "demande mariage punta cana",
        "planifier demande plage",
        "fiançailles caraïbes",
        "demande mariage république dominicaine",
      ],
    },
    openGraph: {
      title: "Le Guide Ultime pour Planifier une Demande en Mariage à Punta Cana",
      description:
        "Tout ce qu'il faut pour planifier une demande en mariage parfaite dans les Caraïbes.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post1_de = {
  _id: "blogPost-proposal-planning-guide-de",
  _type: "blogPost",
  language: "de",
  translationGroup: "proposal-planning-guide-2025",
  slug: { _type: "slug", current: "ultimativer-leitfaden-heiratsantrag-punta-cana" },
  title: "Der Ultimative Leitfaden für einen Heiratsantrag in Punta Cana",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Planungstipps",
  publishedAt: "2025-03-15",
  readingTime: 8,
  excerpt:
    "Von der Wahl des perfekten Strandes bis zur Koordination von Blumen, Fotografie und dem Überraschungsmoment — alles, was Sie für einen makellosen karibischen Heiratsantrag brauchen.",
  body: [
    h2("Warum Punta Cana das Perfekte Ziel für einen Heiratsantrag Ist", "p1-de-b1"),
    block(
      "Es gibt einen Grund, warum Punta Cana auf jeder Liste der Traum-Orte für Heiratsanträge erscheint. Mit über 30 Kilometern weißem Sandstrand, ganzjährig warmem Wetter und Sonnenuntergängen, die den Himmel in Bernstein- und Rosatöne tauchen, bietet die Ostküste der Dominikanischen Republik eine Kulisse, die wie geschaffen für die Frage scheint, die Sie gleich stellen werden.",
      "p1-de-b2",
    ),
    block(
      "Doch ein atemberaubender Ort allein garantiert keinen perfekten Moment. Hinter jedem nahtlosen Strand-Heiratsantrag steckt akribische Planung — die Art, die eine schöne Idee in ein Erlebnis verwandelt, das Ihr Partner ein Leben lang in Erinnerung behalten wird.",
      "p1-de-b3",
    ),
    h2("Den Richtigen Standort Wählen", "p1-de-b4"),
    block(
      "Nicht jeder Strand ist gleich. Manche Küstenabschnitte bieten Abgeschiedenheit und Ruhe; andere bieten dramatische Ausblicke von Klippen oder Zugang zu Strukturen über dem Wasser. Der richtige Standort hängt davon ab, was Ihrem Partner am wichtigsten ist.",
      "p1-de-b5",
    ),
    block(
      "Playa Bávaro ist aus gutem Grund die beliebteste Wahl — sein pudriger Sand, das flache türkisfarbene Wasser und die Ostausrichtung liefern ein goldenes Stundenlicht, das Fotografen begehren. Für einen privateren Anlass bietet der Juanillo Beach in Cap Cana eine abgelegene Bucht mit ruhigem Wasser. Wenn Ihr Partner dramatische Landschaften liebt, schaffen die Felsenklippen nahe Hoyo Azul einen filmreifen Kontrast zu den sanften Tönen der Karibik.",
      "p1-de-b6",
    ),
    h2("Das Timing Ist Entscheidend", "p1-de-b7"),
    block(
      "Die goldene Stunde — etwa 45 Minuten vor Sonnenuntergang — ist das meistgefragte Zeitfenster, und das aus gutem Grund. Das Licht ist warm und weich, Schatten werden schmeichelhaft, und der Himmel verwandelt sich hinter Ihnen, während der Moment sich entfaltet.",
      "p1-de-b8",
    ),
    block(
      "Anträge bei Sonnenaufgang haben jedoch ihren eigenen Zauber. Der Strand ist fast leer, die Luft ist kühl, und es herrscht eine stille Intimität, die der Sonnenuntergang nicht bieten kann. Wenn Ihr Partner ein Frühaufsteher ist, erwägen Sie einen Aufbau im Morgengrauen mit einem Champagner-Frühstück danach.",
      "p1-de-b9",
    ),
    block(
      "Wir empfehlen, mindestens sechs bis acht Wochen im Voraus zu buchen, und zehn oder mehr Wochen in der Hochsaison (Dezember bis April).",
      "p1-de-b10",
    ),
    h2("Die Details Koordinieren", "p1-de-b11"),
    block(
      "Ein Heiratsantrag in Punta Cana umfasst in der Regel mehrere bewegliche Teile: Blumendesign, Fotografie oder Videografie, Dekorationsauf- und -abbau, manchmal Live-Musik, und immer eine Strategie, Ihren Partner zur richtigen Zeit an den richtigen Ort zu bringen, ohne Verdacht zu erregen.",
      "p1-de-b12",
    ),
    block(
      "Die erfolgreichsten Anträge teilen einen gemeinsamen Faden — eine glaubwürdige Tarnung. Vielleicht ein „Sonnenuntergangsspaziergang, den der Hotel-Concierge vorschlägt, oder eine „besondere Dinner-Reservierung, die zufällig über den Strand führt. Ihr Planer wird Ihnen helfen, einen natürlichen Grund zu finden, genau dort zu sein, wo Sie sein müssen.",
      "p1-de-b13",
    ),
    h2("Was Sie am Tag Erwarten Können", "p1-de-b14"),
    block(
      "Ihr Planungsteam übernimmt die gesamte Logistik. Die Dekoration wird ein bis zwei Stunden vor dem Moment aufgebaut, verborgen vor der Öffentlichkeit. Ihr Fotograf ist bereits in Position und macht spontane Aufnahmen, während Sie zum Aufbau laufen.",
      "p1-de-b15",
    ),
    block(
      "Sobald Sie am Standort ankommen, gehört der Moment ganz Ihnen. Kein Drehbuch, keine Eile. Nach der Frage führt Sie Ihr Fotograf durch eine kurze Porträtsession, während der Champagner eingeschenkt wird und das letzte Licht des Tages verblasst.",
      "p1-de-b16",
    ),
    h2("Abschließende Gedanken", "p1-de-b17"),
    block(
      "Einen Heiratsantrag in Punta Cana zu planen bedeutet nicht, jedes Detail selbst zu managen — es geht darum, das richtige Team zu finden, das Ihre Vision zum Leben erweckt, damit Sie im entscheidenden Moment voll und ganz präsent sein können. Der Strand, das Licht, die Blumen — das sind der Rahmen. Sie und Ihr Partner sind die Geschichte.",
      "p1-de-b18",
    ),
  ],
  seo: {
    meta: {
      title: "Heiratsantrag in Punta Cana Planen — Ultimativer Leitfaden",
      description:
        "Kompletter Leitfaden für einen Strand-Heiratsantrag in Punta Cana. Standorte, Timing, Blumen, Fotografie und Expertentipps.",
      keywords: [
        "heiratsantrag punta cana",
        "strand heiratsantrag planen",
        "verlobung karibik",
        "heiratsantrag dominikanische republik",
      ],
    },
    openGraph: {
      title: "Der Ultimative Leitfaden für einen Heiratsantrag in Punta Cana",
      description: "Alles, was Sie für einen perfekten karibischen Heiratsantrag brauchen.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post1_it = {
  _id: "blogPost-proposal-planning-guide-it",
  _type: "blogPost",
  language: "it",
  translationGroup: "proposal-planning-guide-2025",
  slug: { _type: "slug", current: "guida-definitiva-proposta-matrimonio-punta-cana" },
  title: "La Guida Definitiva per Pianificare una Proposta di Matrimonio a Punta Cana",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Consigli di Pianificazione",
  publishedAt: "2025-03-15",
  readingTime: 8,
  excerpt:
    "Dalla scelta della spiaggia perfetta al coordinamento di fiori, fotografia e l'effetto sorpresa — tutto ciò che serve per pianificare una proposta impeccabile ai Caraibi.",
  body: [
    h2("Perché Punta Cana È la Destinazione Perfetta per una Proposta", "p1-it-b1"),
    block(
      "C'è una ragione per cui Punta Cana appare in ogni lista di luoghi da sogno per una proposta di matrimonio. Con oltre 30 chilometri di costa di sabbia bianca, clima caldo tutto l'anno e tramonti che dipingono il cielo di sfumature ambrate e rosate, la costa orientale della Repubblica Dominicana offre uno scenario che sembra progettato per la domanda che stai per fare.",
      "p1-it-b2",
    ),
    block(
      "Ma un luogo spettacolare da solo non garantisce un momento perfetto. Dietro ogni proposta di matrimonio in spiaggia impeccabile c'è una pianificazione meticolosa — quella che trasforma una bella idea in un'esperienza che il tuo partner rivivrà per il resto della vita.",
      "p1-it-b3",
    ),
    h2("Scegliere la Location Giusta", "p1-it-b4"),
    block(
      "Non tutte le spiagge sono uguali. Alcune offrono isolamento e tranquillità; altre offrono viste mozzafiato dalle scogliere o accesso a strutture sull'acqua. La location giusta dipende da ciò che conta di più per il tuo partner.",
      "p1-it-b5",
    ),
    block(
      "Playa Bávaro è la scelta più popolare per una buona ragione — la sua sabbia soffice, le acque turchesi poco profonde e l'orientamento a est regalano una luce dell'ora dorata che i fotografi desiderano. Per un momento più privato, la spiaggia di Juanillo a Cap Cana offre una caletta appartata con acque calme. Se il tuo partner ama i paesaggi drammatici, le scogliere rocciose vicino a Hoyo Azul creano un contrasto cinematografico con i toni morbidi dei Caraibi.",
      "p1-it-b6",
    ),
    h2("Il Tempismo È Tutto", "p1-it-b7"),
    block(
      "L'ora dorata — circa 45 minuti prima del tramonto — è la finestra più richiesta, e a ragione. La luce è calda e morbida, le ombre diventano lusinghiere e il cielo si trasforma dietro di voi mentre il momento si svolge.",
      "p1-it-b8",
    ),
    block(
      "Tuttavia, le proposte all'alba hanno la loro magia. La spiaggia è quasi vuota, l'aria è fresca e c'è un'intimità silenziosa che il tramonto non può replicare. Se il tuo partner è mattiniero, considera un allestimento all'alba con una colazione con champagne ad attendervi.",
      "p1-it-b9",
    ),
    block(
      "Raccomandiamo di prenotare almeno sei-otto settimane in anticipo, e dieci o più durante l'alta stagione (da dicembre ad aprile).",
      "p1-it-b10",
    ),
    h2("Coordinare i Dettagli", "p1-it-b11"),
    block(
      "Una proposta a Punta Cana coinvolge tipicamente diversi elementi: design floreale, fotografia o videografia, allestimento e smontaggio della decorazione, a volte musica dal vivo, e sempre una strategia per portare il tuo partner nel posto giusto al momento giusto senza destare sospetti.",
      "p1-it-b12",
    ),
    block(
      "Le proposte più riuscite condividono un filo comune — una storia di copertura credibile. Forse una « passeggiata al tramonto » suggerita dal concierge del resort, o una « prenotazione speciale per cena » che passa casualmente dalla spiaggia. Il tuo organizzatore ti aiuterà a creare un motivo naturale per essere esattamente dove devi essere.",
      "p1-it-b13",
    ),
    h2("Cosa Aspettarsi il Giorno della Proposta", "p1-it-b14"),
    block(
      "Il tuo team di pianificazione gestirà tutta la logistica. La decorazione viene allestita una o due ore prima del momento, nascosta alla vista pubblica. Il tuo fotografo sarà già in posizione, catturando scatti spontanei mentre cammini verso l'allestimento.",
      "p1-it-b15",
    ),
    block(
      "Una volta raggiunta la location, il momento è interamente vostro. Nessun copione, nessuna fretta. Dopo la domanda, il fotografo vi guiderà in una breve sessione di ritratti mentre lo champagne viene servito e l'ultima luce del giorno svanisce.",
      "p1-it-b16",
    ),
    h2("Considerazioni Finali", "p1-it-b17"),
    block(
      "Pianificare una proposta a Punta Cana non significa gestire ogni dettaglio da soli — significa trovare il team giusto per dare vita alla vostra visione, così da poter essere completamente presenti nel momento che conta. La spiaggia, la luce, i fiori — quelli sono la cornice. Voi e il vostro partner siete la storia.",
      "p1-it-b18",
    ),
  ],
  seo: {
    meta: {
      title: "Pianificare una Proposta di Matrimonio a Punta Cana — Guida Completa",
      description:
        "Guida completa per pianificare una proposta di matrimonio in spiaggia a Punta Cana. Location, tempismo, fiori, fotografia e consigli esperti.",
      keywords: [
        "proposta matrimonio punta cana",
        "pianificare proposta spiaggia",
        "fidanzamento caraibi",
        "proposta repubblica dominicana",
      ],
    },
    openGraph: {
      title: "La Guida Definitiva per una Proposta di Matrimonio a Punta Cana",
      description:
        "Tutto ciò che serve per pianificare una proposta di matrimonio perfetta ai Caraibi.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post1_pt = {
  _id: "blogPost-proposal-planning-guide-pt",
  _type: "blogPost",
  language: "pt",
  translationGroup: "proposal-planning-guide-2025",
  slug: { _type: "slug", current: "guia-definitivo-planejar-pedido-casamento-punta-cana" },
  title: "O Guia Definitivo para Planejar um Pedido de Casamento em Punta Cana",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Dicas de Planejamento",
  publishedAt: "2025-03-15",
  readingTime: 8,
  excerpt:
    "Da escolha da praia perfeita à coordenação de flores, fotografia e o elemento surpresa — tudo o que você precisa para planejar um pedido de casamento impecável no Caribe.",
  body: [
    h2("Por Que Punta Cana É o Destino Perfeito para um Pedido de Casamento", "p1-pt-b1"),
    block(
      "Há uma razão pela qual Punta Cana aparece em toda lista de lugares dos sonhos para pedidos de casamento. Com mais de 30 quilômetros de costa de areia branca, clima quente o ano todo e pores do sol que pintam o céu em tons de âmbar e rosa, a costa leste da República Dominicana oferece um cenário que parece ter sido projetado para a pergunta que você está prestes a fazer.",
      "p1-pt-b2",
    ),
    block(
      "Mas um local deslumbrante por si só não garante um momento perfeito. Por trás de cada pedido de casamento na praia impecável existe um planejamento meticuloso — aquele que transforma uma ideia bonita em uma experiência que seu parceiro vai reviver pelo resto da vida.",
      "p1-pt-b3",
    ),
    h2("Escolhendo a Localização Ideal", "p1-pt-b4"),
    block(
      "Nem toda praia é igual. Alguns trechos de litoral oferecem reclusão e tranquilidade; outros proporcionam vistas dramáticas de penhascos ou acesso a estruturas sobre a água. A localização certa depende do que mais importa para seu parceiro.",
      "p1-pt-b5",
    ),
    block(
      "Playa Bávaro é a escolha mais popular por uma boa razão — sua areia fina, águas turquesas rasas e orientação leste proporcionam uma luz da hora dourada que os fotógrafos cobiçam. Para um momento mais privado, a Praia Juanillo em Cap Cana oferece uma enseada isolada com águas calmas. Se seu parceiro ama paisagens dramáticas, os penhascos rochosos perto de Hoyo Azul criam um contraste cinematográfico com os tons suaves do Caribe.",
      "p1-pt-b6",
    ),
    h2("O Timing É Tudo", "p1-pt-b7"),
    block(
      "A hora dourada — aproximadamente 45 minutos antes do pôr do sol — é a janela mais requisitada, e com razão. A luz é quente e suave, as sombras se tornam lisonjeiras e o céu se transforma atrás de vocês enquanto o momento se desenrola.",
      "p1-pt-b8",
    ),
    block(
      "No entanto, pedidos ao nascer do sol têm sua própria magia. A praia está quase vazia, o ar é fresco e há uma intimidade silenciosa que o pôr do sol não consegue replicar. Se seu parceiro acorda cedo, considere uma montagem ao amanhecer com um café da manhã com champanhe esperando.",
      "p1-pt-b9",
    ),
    block(
      "Recomendamos reservar com pelo menos seis a oito semanas de antecedência, e dez ou mais durante a alta temporada (dezembro a abril).",
      "p1-pt-b10",
    ),
    h2("Coordenando os Detalhes", "p1-pt-b11"),
    block(
      "Um pedido de casamento em Punta Cana tipicamente envolve várias peças em movimento: design floral, fotografia ou videografia, montagem e desmontagem de decoração, às vezes música ao vivo, e sempre uma estratégia para levar seu parceiro ao lugar certo na hora certa sem levantar suspeitas.",
      "p1-pt-b12",
    ),
    block(
      "Os pedidos mais bem-sucedidos compartilham um fio comum — uma história de cobertura crível. Talvez uma « caminhada ao pôr do sol » sugerida pelo concierge do resort, ou uma « reserva especial para jantar » que por acaso passa pela praia. Seu planejador ajudará você a criar uma razão natural para estar exatamente onde precisa estar.",
      "p1-pt-b13",
    ),
    h2("O Que Esperar no Dia", "p1-pt-b14"),
    block(
      "Sua equipe de planejamento cuidará de toda a logística. A decoração é montada uma a duas horas antes do momento, escondida da vista pública. Seu fotógrafo já estará em posição, capturando fotos espontâneas enquanto você caminha em direção à montagem.",
      "p1-pt-b15",
    ),
    block(
      "Uma vez que chegue ao local, o momento é inteiramente seu. Não há roteiro, não há pressa. Após a pergunta, seu fotógrafo guiará vocês em uma breve sessão de retratos enquanto o champanhe é servido e a última luz do dia se desvanece.",
      "p1-pt-b16",
    ),
    h2("Considerações Finais", "p1-pt-b17"),
    block(
      "Planejar um pedido de casamento em Punta Cana não é sobre gerenciar cada detalhe pessoalmente — é sobre encontrar a equipe certa para dar vida à sua visão, para que você possa estar completamente presente no momento que importa. A praia, a luz, as flores — esses são a moldura. Você e seu parceiro são a história.",
      "p1-pt-b18",
    ),
  ],
  seo: {
    meta: {
      title: "Planejar Pedido de Casamento em Punta Cana — Guia Completo",
      description:
        "Guia completo para planejar um pedido de casamento na praia em Punta Cana. Localizações, timing, flores, fotografia e dicas de especialistas.",
      keywords: [
        "pedido casamento punta cana",
        "planejar pedido praia",
        "noivado caribe",
        "pedido casamento república dominicana",
      ],
    },
    openGraph: {
      title: "O Guia Definitivo para um Pedido de Casamento em Punta Cana",
      description:
        "Tudo o que você precisa para planejar um pedido de casamento perfeito no Caribe.",
    },
    noIndex: false,
    noFollow: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POST 2 — 5 Romantic Sunset Spots in Punta Cana You Haven't Heard Of
// translationGroup: hidden-sunset-spots-2025
// ─────────────────────────────────────────────────────────────────────────────

const post2_en = {
  _id: "blogPost-hidden-sunset-spots-en",
  _type: "blogPost",
  language: "en",
  translationGroup: "hidden-sunset-spots-2025",
  slug: { _type: "slug", current: "5-romantic-sunset-spots-punta-cana" },
  title: "5 Romantic Sunset Spots in Punta Cana You Haven't Heard Of",
  category: CATEGORY_DESTINATION_GUIDES,
  categoryTag: "Destination Guides",
  publishedAt: "2025-04-02",
  readingTime: 6,
  excerpt:
    "Beyond the resort beaches — five secluded locations where golden hour feels like it was made just for the two of you.",
  body: [
    h2("Beyond the Resort Fence", "p2-en-b1"),
    block(
      "Everyone knows the postcard sunsets of Bávaro. But Punta Cana's coastline stretches far beyond the resort strips, and some of its most breathtaking golden-hour moments happen in places most visitors never discover. Whether you are scouting for a proposal location or simply want a private evening with your partner, these five spots deliver something the crowded beaches cannot — solitude.",
      "p2-en-b2",
    ),
    h2("1. The Macao Bluffs", "p2-en-b3"),
    block(
      "A ten-minute drive north of the main hotel zone, Playa Macao is known for its raw, undeveloped beauty. But the real secret is the low bluffs at the southern end of the beach. Climb the gentle rise and you are rewarded with an unobstructed 180-degree view of the Atlantic. The wind is stronger here, the waves more dramatic, and the sense of isolation is complete. There are no lounge chairs, no vendors — just the horizon.",
      "p2-en-b4",
    ),
    block("Best for couples who love rugged landscapes and do not mind a short hike in sandals.", "p2-en-b5"),
    h2("2. Juanillo Cove at Low Tide", "p2-en-b6"),
    block(
      "Playa Juanillo in Cap Cana is no secret, but its low-tide transformation is. When the water recedes in the late afternoon, a natural sandbar emerges roughly 40 meters offshore, creating a shallow wading path. Walk out to the sandbar at golden hour and you are standing in the middle of the Caribbean with water barely reaching your ankles and a 360-degree sunset unfolding around you.",
      "p2-en-b7",
    ),
    block("Best for dramatic, once-in-a-lifetime proposal photos.", "p2-en-b8"),
    h2("3. The Trail Above Hoyo Azul", "p2-en-b9"),
    block(
      "Most visitors to Scape Park descend into the famous cenote. Few realize that the trail leading to it — particularly the elevated section before the final staircase — faces due west. In the late afternoon, the jungle canopy frames the lowering sun, casting cathedral-like light through the trees. It is quiet, cool, and completely unexpected.",
      "p2-en-b10",
    ),
    block("Best for partners who prefer forest and nature over sand and surf.", "p2-en-b11"),
    h2("4. The Lagoons of Indigenous Eyes Ecological Park", "p2-en-b12"),
    block(
      "This protected reserve within the Puntacana Resort and Club contains twelve freshwater lagoons connected by shaded jungle trails. The fourth lagoon, accessible by a 20-minute walk from the entrance, faces a small clearing to the west. At sunset, the still water mirrors the colors of the sky in near-perfect symmetry. The park closes at five, so you will need to coordinate access with the resort, but for those who manage it, the reward is extraordinary.",
      "p2-en-b13",
    ),
    block("Best for intimate, nature-immersed moments away from the coast.", "p2-en-b14"),
    h2("5. Cap Cana Marina at Dusk", "p2-en-b15"),
    block(
      "This is the only location on the list that is not a natural setting, but it earns its place. The Cap Cana Marina, modeled after Mediterranean yacht harbors, offers an entirely different kind of sunset — one framed by white architecture, polished teak decks, and the gentle clink of halyard lines against masts. Grab a table at one of the waterfront restaurants and watch the sky change from coral to violet while boats rock softly in the harbor.",
      "p2-en-b16",
    ),
    block("Best for couples who prefer elegance and a glass of wine over sand between their toes.", "p2-en-b17"),
    h2("Planning Your Sunset Moment", "p2-en-b18"),
    block(
      "Each of these locations requires different levels of access and coordination. Some are public and easy to reach; others need advance arrangements with resort staff or park management. If you are planning a proposal at any of these spots, working with a local planner who knows the logistics — tide schedules, access permits, photographer positioning — makes the difference between a good idea and a flawless moment.",
      "p2-en-b19",
    ),
  ],
  seo: {
    meta: {
      title: "5 Hidden Sunset Spots in Punta Cana for Couples",
      description:
        "Discover five secret sunset locations in Punta Cana perfect for romantic moments and proposals — beyond the typical resort beaches.",
      keywords: [
        "punta cana sunset spots",
        "romantic locations punta cana",
        "hidden beaches dominican republic",
        "proposal locations caribbean",
      ],
    },
    openGraph: {
      title: "5 Romantic Sunset Spots in Punta Cana You Haven't Heard Of",
      description:
        "Five secluded locations where golden hour feels like it was made just for the two of you.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post2_es = {
  _id: "blogPost-hidden-sunset-spots-es",
  _type: "blogPost",
  language: "es",
  translationGroup: "hidden-sunset-spots-2025",
  slug: { _type: "slug", current: "5-lugares-romanticos-atardecer-punta-cana" },
  title: "5 Lugares Románticos para el Atardecer en Punta Cana que No Conocías",
  category: CATEGORY_DESTINATION_GUIDES,
  categoryTag: "Guías de Destino",
  publishedAt: "2025-04-02",
  readingTime: 6,
  excerpt:
    "Más allá de las playas del resort — cinco ubicaciones secretas donde la hora dorada parece hecha solo para ustedes dos.",
  body: [
    h2("Más Allá de la Cerca del Resort", "p2-es-b1"),
    block(
      "Todos conocen los atardeceres de postal de Bávaro. Pero la costa de Punta Cana se extiende mucho más allá de las franjas hoteleras, y algunos de sus momentos de hora dorada más impresionantes ocurren en lugares que la mayoría de los visitantes nunca descubre. Ya sea que estés buscando ubicación para una propuesta o simplemente quieras una velada privada con tu pareja, estos cinco lugares ofrecen algo que las playas concurridas no pueden — soledad.",
      "p2-es-b2",
    ),
    h2("1. Los Acantilados de Macao", "p2-es-b3"),
    block(
      "A diez minutos en auto al norte de la zona hotelera principal, Playa Macao es conocida por su belleza cruda y sin desarrollar. Pero el verdadero secreto son los acantilados bajos en el extremo sur de la playa. Sube la suave pendiente y serás recompensado con una vista de 180 grados del Atlántico sin obstáculos. El viento es más fuerte aquí, las olas más dramáticas, y la sensación de aislamiento es completa. No hay tumbonas ni vendedores — solo el horizonte.",
      "p2-es-b4",
    ),
    block("Ideal para parejas que aman paisajes agrestes y no les importa una caminata corta en sandalias.", "p2-es-b5"),
    h2("2. Caleta de Juanillo en Marea Baja", "p2-es-b6"),
    block(
      "Playa Juanillo en Cap Cana no es un secreto, pero su transformación en marea baja sí lo es. Cuando el agua retrocede a media tarde, emerge un banco de arena natural a unos 40 metros de la costa, creando un camino de vadeo poco profundo. Camina hasta el banco de arena a la hora dorada y estarás de pie en medio del Caribe con el agua apenas llegándote a los tobillos y un atardecer de 360 grados desplegándose a tu alrededor.",
      "p2-es-b7",
    ),
    block("Ideal para fotos de propuesta dramáticas e irrepetibles.", "p2-es-b8"),
    h2("3. El Sendero Sobre Hoyo Azul", "p2-es-b9"),
    block(
      "La mayoría de los visitantes de Scape Park descienden al famoso cenote. Pocos se dan cuenta de que el sendero que lleva a él — particularmente la sección elevada antes de la escalera final — mira directo al oeste. A media tarde, el dosel de la selva enmarca el sol descendente, proyectando una luz tipo catedral entre los árboles. Es silencioso, fresco y completamente inesperado.",
      "p2-es-b10",
    ),
    block("Ideal para parejas que prefieren el bosque y la naturaleza al mar y la arena.", "p2-es-b11"),
    h2("4. Las Lagunas del Parque Ecológico Indigenous Eyes", "p2-es-b12"),
    block(
      "Esta reserva protegida dentro del Puntacana Resort and Club contiene doce lagunas de agua dulce conectadas por senderos sombreados de selva. La cuarta laguna, accesible tras una caminata de 20 minutos desde la entrada, da a un pequeño claro hacia el oeste. Al atardecer, el agua quieta refleja los colores del cielo en simetría casi perfecta. El parque cierra a las cinco, así que necesitarás coordinar el acceso con el resort, pero para quienes lo logran, la recompensa es extraordinaria.",
      "p2-es-b13",
    ),
    block("Ideal para momentos íntimos inmersos en la naturaleza, lejos de la costa.", "p2-es-b14"),
    h2("5. Marina de Cap Cana al Anochecer", "p2-es-b15"),
    block(
      "Esta es la única ubicación de la lista que no es un entorno natural, pero se gana su lugar. La Marina de Cap Cana, inspirada en puertos de yates mediterráneos, ofrece un tipo de atardecer completamente diferente — uno enmarcado por arquitectura blanca, cubiertas de teca pulida y el suave tintineo de las drizas contra los mástiles. Toma una mesa en uno de los restaurantes frente al agua y observa cómo el cielo cambia de coral a violeta mientras los barcos se mecen suavemente en el puerto.",
      "p2-es-b16",
    ),
    block("Ideal para parejas que prefieren la elegancia y una copa de vino a la arena entre los dedos.", "p2-es-b17"),
    h2("Planificando Tu Momento al Atardecer", "p2-es-b18"),
    block(
      "Cada una de estas ubicaciones requiere diferentes niveles de acceso y coordinación. Algunas son públicas y fáciles de alcanzar; otras necesitan arreglos previos con el personal del resort o la administración del parque. Si estás planificando una propuesta en alguno de estos lugares, trabajar con un planificador local que conozca la logística — horarios de mareas, permisos de acceso, posicionamiento del fotógrafo — marca la diferencia entre una buena idea y un momento impecable.",
      "p2-es-b19",
    ),
  ],
  seo: {
    meta: {
      title: "5 Lugares Ocultos para el Atardecer en Punta Cana",
      description:
        "Descubre cinco lugares secretos de atardecer en Punta Cana perfectos para momentos románticos y propuestas.",
      keywords: [
        "atardecer punta cana",
        "lugares románticos punta cana",
        "playas escondidas república dominicana",
        "propuesta caribe",
      ],
    },
    openGraph: {
      title: "5 Lugares Románticos para el Atardecer en Punta Cana",
      description: "Cinco ubicaciones secretas donde la hora dorada parece hecha solo para ustedes dos.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post2_fr = {
  _id: "blogPost-hidden-sunset-spots-fr",
  _type: "blogPost",
  language: "fr",
  translationGroup: "hidden-sunset-spots-2025",
  slug: { _type: "slug", current: "5-spots-romantiques-coucher-soleil-punta-cana" },
  title: "5 Spots Romantiques au Coucher du Soleil à Punta Cana que Vous ne Connaissez Pas",
  category: CATEGORY_DESTINATION_GUIDES,
  categoryTag: "Guides de Destination",
  publishedAt: "2025-04-02",
  readingTime: 6,
  excerpt:
    "Au-delà des plages de resort — cinq lieux isolés où l'heure dorée semble avoir été créée rien que pour vous deux.",
  body: [
    h2("Au-Delà de la Clôture du Resort", "p2-fr-b1"),
    block(
      "Tout le monde connaît les couchers de soleil de carte postale de Bávaro. Mais le littoral de Punta Cana s'étend bien au-delà des zones hôtelières, et certains de ses moments les plus époustouflants à l'heure dorée se produisent dans des endroits que la plupart des visiteurs ne découvrent jamais. Que vous repériez un lieu pour une demande en mariage ou que vous souhaitiez simplement une soirée privée avec votre partenaire, ces cinq spots offrent quelque chose que les plages bondées ne peuvent pas — la solitude.",
      "p2-fr-b2",
    ),
    h2("1. Les Falaises de Macao", "p2-fr-b3"),
    block(
      "À dix minutes en voiture au nord de la zone hôtelière principale, Playa Macao est connue pour sa beauté brute et préservée. Mais le vrai secret réside dans les falaises basses à l'extrémité sud de la plage. Gravissez la pente douce et vous êtes récompensé par une vue dégagée à 180 degrés sur l'Atlantique. Le vent est plus fort ici, les vagues plus dramatiques, et le sentiment d'isolement est total. Pas de transats, pas de vendeurs — juste l'horizon.",
      "p2-fr-b4",
    ),
    block("Idéal pour les couples qui aiment les paysages sauvages et ne craignent pas une courte marche en sandales.", "p2-fr-b5"),
    h2("2. La Crique de Juanillo à Marée Basse", "p2-fr-b6"),
    block(
      "Playa Juanillo à Cap Cana n'est pas un secret, mais sa transformation à marée basse l'est. Quand l'eau se retire en fin d'après-midi, un banc de sable naturel émerge à environ 40 mètres du rivage, créant un chemin de gué peu profond. Marchez jusqu'au banc de sable à l'heure dorée et vous vous tenez au milieu des Caraïbes, l'eau atteignant à peine vos chevilles, un coucher de soleil à 360 degrés se déployant autour de vous.",
      "p2-fr-b7",
    ),
    block("Idéal pour des photos de demande en mariage dramatiques et uniques.", "p2-fr-b8"),
    h2("3. Le Sentier Au-Dessus de Hoyo Azul", "p2-fr-b9"),
    block(
      "La plupart des visiteurs de Scape Park descendent dans le fameux cénote. Peu réalisent que le sentier qui y mène — en particulier la section élevée avant l'escalier final — fait face plein ouest. En fin d'après-midi, la canopée de la jungle encadre le soleil couchant, projetant une lumière de cathédrale à travers les arbres. C'est silencieux, frais et totalement inattendu.",
      "p2-fr-b10",
    ),
    block("Idéal pour les partenaires qui préfèrent la forêt et la nature au sable et au surf.", "p2-fr-b11"),
    h2("4. Les Lagons du Parc Écologique Indigenous Eyes", "p2-fr-b12"),
    block(
      "Cette réserve protégée au sein du Puntacana Resort and Club contient douze lagons d'eau douce reliés par des sentiers ombragés de jungle. Le quatrième lagon, accessible après une marche de 20 minutes depuis l'entrée, fait face à une petite clairière à l'ouest. Au coucher du soleil, l'eau immobile reflète les couleurs du ciel en symétrie presque parfaite. Le parc ferme à dix-sept heures, vous devrez donc coordonner l'accès avec le resort, mais pour ceux qui y parviennent, la récompense est extraordinaire.",
      "p2-fr-b13",
    ),
    block("Idéal pour des moments intimes immergés dans la nature, loin de la côte.", "p2-fr-b14"),
    h2("5. La Marina de Cap Cana au Crépuscule", "p2-fr-b15"),
    block(
      "C'est le seul lieu de la liste qui n'est pas un cadre naturel, mais il mérite sa place. La Marina de Cap Cana, inspirée des ports de yachts méditerranéens, offre un type de coucher de soleil entièrement différent — encadré par une architecture blanche, des ponts en teck poli et le tintement délicat des drisses contre les mâts. Prenez une table dans l'un des restaurants en bord de l'eau et regardez le ciel passer du corail au violet tandis que les bateaux se balancent doucement dans le port.",
      "p2-fr-b16",
    ),
    block("Idéal pour les couples qui préfèrent l'élégance et un verre de vin au sable entre les orteils.", "p2-fr-b17"),
    h2("Planifier Votre Moment au Coucher du Soleil", "p2-fr-b18"),
    block(
      "Chacun de ces lieux nécessite différents niveaux d'accès et de coordination. Certains sont publics et faciles d'accès ; d'autres nécessitent des arrangements préalables avec le personnel du resort ou la direction du parc. Si vous planifiez une demande à l'un de ces endroits, travailler avec un organisateur local qui connaît la logistique — horaires des marées, permis d'accès, positionnement du photographe — fait la différence entre une bonne idée et un moment impeccable.",
      "p2-fr-b19",
    ),
  ],
  seo: {
    meta: {
      title: "5 Spots Cachés pour le Coucher du Soleil à Punta Cana",
      description:
        "Découvrez cinq lieux secrets de coucher du soleil à Punta Cana, parfaits pour les moments romantiques et les demandes en mariage.",
      keywords: [
        "coucher soleil punta cana",
        "lieux romantiques punta cana",
        "plages cachées république dominicaine",
        "demande mariage caraïbes",
      ],
    },
    openGraph: {
      title: "5 Spots Romantiques au Coucher du Soleil à Punta Cana",
      description: "Cinq lieux isolés où l'heure dorée semble créée rien que pour vous deux.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post2_de = {
  _id: "blogPost-hidden-sunset-spots-de",
  _type: "blogPost",
  language: "de",
  translationGroup: "hidden-sunset-spots-2025",
  slug: { _type: "slug", current: "5-romantische-sonnenuntergang-orte-punta-cana" },
  title: "5 Romantische Sonnenuntergangs-Orte in Punta Cana, die Sie Noch Nicht Kennen",
  category: CATEGORY_DESTINATION_GUIDES,
  categoryTag: "Reiseziel-Guides",
  publishedAt: "2025-04-02",
  readingTime: 6,
  excerpt:
    "Jenseits der Resort-Strände — fünf abgelegene Orte, an denen die goldene Stunde sich anfühlt, als wäre sie nur für Sie beide geschaffen.",
  body: [
    h2("Jenseits des Resort-Zauns", "p2-de-b1"),
    block(
      "Jeder kennt die Postkarten-Sonnenuntergänge von Bávaro. Aber Punta Canas Küste erstreckt sich weit über die Hotel-Streifen hinaus, und einige der atemberaubendsten Momente der goldenen Stunde finden an Orten statt, die die meisten Besucher nie entdecken. Ob Sie einen Ort für einen Heiratsantrag erkunden oder einfach einen privaten Abend mit Ihrem Partner verbringen möchten — diese fünf Orte bieten etwas, das die überfüllten Strände nicht können: Einsamkeit.",
      "p2-de-b2",
    ),
    h2("1. Die Klippen von Macao", "p2-de-b3"),
    block(
      "Zehn Autominuten nördlich der Haupthotelzone ist Playa Macao für seine unberührte, unentwickelte Schönheit bekannt. Das wahre Geheimnis sind aber die niedrigen Klippen am südlichen Ende des Strandes. Erklimmen Sie den sanften Anstieg und werden mit einem ungehinderten 180-Grad-Blick auf den Atlantik belohnt. Der Wind ist hier stärker, die Wellen dramatischer, und das Gefühl der Abgeschiedenheit ist vollkommen. Keine Liegestühle, keine Verkäufer — nur der Horizont.",
      "p2-de-b4",
    ),
    block("Ideal für Paare, die raue Landschaften lieben und eine kurze Wanderung in Sandalen nicht scheuen.", "p2-de-b5"),
    h2("2. Die Juanillo-Bucht bei Ebbe", "p2-de-b6"),
    block(
      "Playa Juanillo in Cap Cana ist kein Geheimnis, aber seine Verwandlung bei Ebbe schon. Wenn das Wasser am späten Nachmittag zurückweicht, entsteht etwa 40 Meter vor der Küste eine natürliche Sandbank, die einen flachen Watweg schafft. Gehen Sie bei goldener Stunde zur Sandbank hinaus und stehen mitten in der Karibik, das Wasser reicht kaum bis zu Ihren Knöcheln, während sich ein 360-Grad-Sonnenuntergang um Sie herum entfaltet.",
      "p2-de-b7",
    ),
    block("Ideal für dramatische, einmalige Antragfotos.", "p2-de-b8"),
    h2("3. Der Pfad Über Hoyo Azul", "p2-de-b9"),
    block(
      "Die meisten Besucher des Scape Parks steigen in den berühmten Cenote hinab. Wenige bemerken, dass der Weg dorthin — insbesondere der erhöhte Abschnitt vor der letzten Treppe — nach Westen ausgerichtet ist. Am späten Nachmittag rahmt das Dschungeldach die untergehende Sonne ein und wirft ein kathedralenartiges Licht durch die Bäume. Es ist still, kühl und völlig unerwartet.",
      "p2-de-b10",
    ),
    block("Ideal für Partner, die Wald und Natur dem Sand und der Brandung vorziehen.", "p2-de-b11"),
    h2("4. Die Lagunen des Ökologischen Parks Indigenous Eyes", "p2-de-b12"),
    block(
      "Dieses Schutzgebiet innerhalb des Puntacana Resort and Club enthält zwölf Süßwasserlagunen, verbunden durch schattige Dschungelpfade. Die vierte Lagune, erreichbar nach einem 20-minütigen Fußmarsch vom Eingang, grenzt an eine kleine Lichtung nach Westen. Bei Sonnenuntergang spiegelt das stille Wasser die Farben des Himmels in nahezu perfekter Symmetrie. Der Park schließt um fünf Uhr, Sie müssen also den Zugang mit dem Resort koordinieren, aber für diejenigen, die es schaffen, ist die Belohnung außergewöhnlich.",
      "p2-de-b13",
    ),
    block("Ideal für intime, naturverbundene Momente abseits der Küste.", "p2-de-b14"),
    h2("5. Die Marina von Cap Cana in der Abenddämmerung", "p2-de-b15"),
    block(
      "Dies ist der einzige Ort auf der Liste, der kein natürliches Setting ist, aber er verdient seinen Platz. Die Marina von Cap Cana, angelehnt an mediterrane Yachthäfen, bietet eine ganz andere Art von Sonnenuntergang — eingerahmt von weißer Architektur, polierten Teakholzdecks und dem sanften Klirren der Fallen gegen die Masten. Nehmen Sie einen Tisch in einem der Uferrestaurants und beobachten Sie, wie der Himmel von Koralle zu Violett wechselt, während Boote sanft im Hafen schaukeln.",
      "p2-de-b16",
    ),
    block("Ideal für Paare, die Eleganz und ein Glas Wein dem Sand zwischen den Zehen vorziehen.", "p2-de-b17"),
    h2("Planen Sie Ihren Sonnenuntergangs-Moment", "p2-de-b18"),
    block(
      "Jeder dieser Orte erfordert unterschiedliche Zugangs- und Koordinationslevel. Manche sind öffentlich und leicht erreichbar; andere benötigen Vorab-Arrangements mit dem Resort-Personal oder der Parkverwaltung. Wenn Sie an einem dieser Orte einen Antrag planen, macht die Zusammenarbeit mit einem lokalen Planer, der die Logistik kennt — Gezeitenzeiten, Zugangsgenehmigungen, Fotografen-Positionierung — den Unterschied zwischen einer guten Idee und einem makellosen Moment.",
      "p2-de-b19",
    ),
  ],
  seo: {
    meta: {
      title: "5 Versteckte Sonnenuntergangs-Orte in Punta Cana für Paare",
      description:
        "Entdecken Sie fünf geheime Sonnenuntergangs-Orte in Punta Cana — perfekt für romantische Momente und Heiratsanträge.",
      keywords: [
        "sonnenuntergang punta cana",
        "romantische orte punta cana",
        "versteckte strände dominikanische republik",
        "heiratsantrag karibik",
      ],
    },
    openGraph: {
      title: "5 Romantische Sonnenuntergangs-Orte in Punta Cana",
      description: "Fünf abgelegene Orte, an denen die goldene Stunde nur für Sie beide geschaffen scheint.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post2_it = {
  _id: "blogPost-hidden-sunset-spots-it",
  _type: "blogPost",
  language: "it",
  translationGroup: "hidden-sunset-spots-2025",
  slug: { _type: "slug", current: "5-spot-romantici-tramonto-punta-cana" },
  title: "5 Spot Romantici al Tramonto a Punta Cana che Non Conoscevi",
  category: CATEGORY_DESTINATION_GUIDES,
  categoryTag: "Guide alla Destinazione",
  publishedAt: "2025-04-02",
  readingTime: 6,
  excerpt:
    "Oltre le spiagge del resort — cinque luoghi appartati dove l'ora dorata sembra creata solo per voi due.",
  body: [
    h2("Oltre la Recinzione del Resort", "p2-it-b1"),
    block(
      "Tutti conoscono i tramonti da cartolina di Bávaro. Ma la costa di Punta Cana si estende ben oltre le zone alberghiere, e alcuni dei suoi momenti più mozzafiato all'ora dorata si verificano in posti che la maggior parte dei visitatori non scopre mai. Che stiate cercando una location per una proposta o vogliate semplicemente una serata privata con il vostro partner, questi cinque spot offrono qualcosa che le spiagge affollate non possono — solitudine.",
      "p2-it-b2",
    ),
    h2("1. Le Scogliere di Macao", "p2-it-b3"),
    block(
      "A dieci minuti di auto a nord della zona alberghiera principale, Playa Macao è conosciuta per la sua bellezza grezza e incontaminata. Ma il vero segreto sono le basse scogliere all'estremità sud della spiaggia. Salite il dolce pendio e sarete ricompensati con una vista libera a 180 gradi sull'Atlantico. Il vento è più forte qui, le onde più drammatiche, e la sensazione di isolamento è totale. Nessun lettino, nessun venditore — solo l'orizzonte.",
      "p2-it-b4",
    ),
    block("Ideale per coppie che amano paesaggi selvaggi e non temono una breve passeggiata in sandali.", "p2-it-b5"),
    h2("2. La Caletta di Juanillo con la Bassa Marea", "p2-it-b6"),
    block(
      "Playa Juanillo a Cap Cana non è un segreto, ma la sua trasformazione con la bassa marea sì. Quando l'acqua si ritira nel tardo pomeriggio, emerge un banco di sabbia naturale a circa 40 metri dalla riva, creando un sentiero di guado poco profondo. Camminate fino al banco di sabbia all'ora dorata e vi troverete in mezzo ai Caraibi con l'acqua che vi arriva appena alle caviglie e un tramonto a 360 gradi che si dispiega intorno a voi.",
      "p2-it-b7",
    ),
    block("Ideale per foto di proposta drammatiche e irripetibili.", "p2-it-b8"),
    h2("3. Il Sentiero Sopra Hoyo Azul", "p2-it-b9"),
    block(
      "La maggior parte dei visitatori dello Scape Park scende nel famoso cenote. Pochi si rendono conto che il sentiero che vi conduce — in particolare la sezione sopraelevata prima della scalinata finale — è rivolto a ovest. Nel tardo pomeriggio, la volta della giungla incornicia il sole calante, proiettando una luce da cattedrale attraverso gli alberi. È silenzioso, fresco e completamente inaspettato.",
      "p2-it-b10",
    ),
    block("Ideale per partner che preferiscono foresta e natura alla sabbia e al mare.", "p2-it-b11"),
    h2("4. Le Lagune del Parco Ecologico Indigenous Eyes", "p2-it-b12"),
    block(
      "Questa riserva protetta all'interno del Puntacana Resort and Club contiene dodici lagune d'acqua dolce collegate da sentieri ombreggiati nella giungla. La quarta laguna, raggiungibile dopo una camminata di 20 minuti dall'ingresso, si affaccia su una piccola radura a ovest. Al tramonto, l'acqua immobile riflette i colori del cielo in simmetria quasi perfetta. Il parco chiude alle cinque, quindi dovrete coordinare l'accesso con il resort, ma per chi ci riesce, la ricompensa è straordinaria.",
      "p2-it-b13",
    ),
    block("Ideale per momenti intimi immersi nella natura, lontani dalla costa.", "p2-it-b14"),
    h2("5. Il Marina di Cap Cana al Crepuscolo", "p2-it-b15"),
    block(
      "Questa è l'unica location della lista che non è un ambiente naturale, ma si guadagna il suo posto. Il Marina di Cap Cana, ispirato ai porti turistici mediterranei, offre un tipo di tramonto completamente diverso — incorniciato da architettura bianca, ponti in teak lucidato e il delicato tintinnio delle drizze contro gli alberi maestri. Prendete un tavolo in uno dei ristoranti sul lungomare e guardate il cielo passare dal corallo al viola mentre le barche ondoleggiano dolcemente nel porto.",
      "p2-it-b16",
    ),
    block("Ideale per coppie che preferiscono l'eleganza e un calice di vino alla sabbia tra le dita dei piedi.", "p2-it-b17"),
    h2("Pianificare il Vostro Momento al Tramonto", "p2-it-b18"),
    block(
      "Ognuna di queste location richiede diversi livelli di accesso e coordinamento. Alcune sono pubbliche e facili da raggiungere; altre necessitano di accordi preventivi con il personale del resort o la gestione del parco. Se state pianificando una proposta in uno di questi luoghi, lavorare con un organizzatore locale che conosce la logistica — orari delle maree, permessi di accesso, posizionamento del fotografo — fa la differenza tra una buona idea e un momento impeccabile.",
      "p2-it-b19",
    ),
  ],
  seo: {
    meta: {
      title: "5 Spot Nascosti per il Tramonto a Punta Cana per Coppie",
      description:
        "Scopri cinque location segrete per il tramonto a Punta Cana, perfette per momenti romantici e proposte di matrimonio.",
      keywords: [
        "tramonto punta cana",
        "luoghi romantici punta cana",
        "spiagge nascoste repubblica dominicana",
        "proposta matrimonio caraibi",
      ],
    },
    openGraph: {
      title: "5 Spot Romantici al Tramonto a Punta Cana",
      description: "Cinque luoghi appartati dove l'ora dorata sembra creata solo per voi due.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post2_pt = {
  _id: "blogPost-hidden-sunset-spots-pt",
  _type: "blogPost",
  language: "pt",
  translationGroup: "hidden-sunset-spots-2025",
  slug: { _type: "slug", current: "5-lugares-romanticos-por-do-sol-punta-cana" },
  title: "5 Lugares Românticos para o Pôr do Sol em Punta Cana que Você Não Conhecia",
  category: CATEGORY_DESTINATION_GUIDES,
  categoryTag: "Guias de Destino",
  publishedAt: "2025-04-02",
  readingTime: 6,
  excerpt:
    "Além das praias do resort — cinco locais isolados onde a hora dourada parece ter sido feita só para vocês dois.",
  body: [
    h2("Além da Cerca do Resort", "p2-pt-b1"),
    block(
      "Todo mundo conhece os pores do sol de cartão-postal de Bávaro. Mas a costa de Punta Cana se estende muito além das faixas hoteleiras, e alguns dos seus momentos mais deslumbrantes da hora dourada acontecem em lugares que a maioria dos visitantes nunca descobre. Seja procurando um local para um pedido de casamento ou simplesmente querendo uma noite privada com seu parceiro, esses cinco lugares oferecem algo que as praias lotadas não conseguem — solidão.",
      "p2-pt-b2",
    ),
    h2("1. Os Penhascos de Macao", "p2-pt-b3"),
    block(
      "A dez minutos de carro ao norte da zona hoteleira principal, Playa Macao é conhecida por sua beleza crua e intocada. Mas o verdadeiro segredo são os penhascos baixos na extremidade sul da praia. Suba a suave elevação e será recompensado com uma vista desimpedida de 180 graus do Atlântico. O vento é mais forte aqui, as ondas mais dramáticas, e a sensação de isolamento é completa. Sem espreguiçadeiras, sem vendedores — apenas o horizonte.",
      "p2-pt-b4",
    ),
    block("Ideal para casais que amam paisagens agrestes e não se importam com uma curta caminhada de sandálias.", "p2-pt-b5"),
    h2("2. A Enseada de Juanillo na Maré Baixa", "p2-pt-b6"),
    block(
      "Playa Juanillo em Cap Cana não é segredo, mas sua transformação na maré baixa é. Quando a água recua no final da tarde, um banco de areia natural emerge a cerca de 40 metros da costa, criando um caminho de vau raso. Caminhe até o banco de areia na hora dourada e estará de pé no meio do Caribe com a água mal chegando aos tornozelos e um pôr do sol de 360 graus se desdobrando ao seu redor.",
      "p2-pt-b7",
    ),
    block("Ideal para fotos de pedido de casamento dramáticas e irrepetíveis.", "p2-pt-b8"),
    h2("3. A Trilha Acima de Hoyo Azul", "p2-pt-b9"),
    block(
      "A maioria dos visitantes do Scape Park desce ao famoso cenote. Poucos percebem que a trilha que leva até ele — particularmente a seção elevada antes da escada final — está voltada para o oeste. No final da tarde, o dossel da selva emoldura o sol poente, projetando uma luz de catedral através das árvores. É silencioso, fresco e completamente inesperado.",
      "p2-pt-b10",
    ),
    block("Ideal para parceiros que preferem floresta e natureza à areia e ao mar.", "p2-pt-b11"),
    h2("4. As Lagoas do Parque Ecológico Indigenous Eyes", "p2-pt-b12"),
    block(
      "Esta reserva protegida dentro do Puntacana Resort and Club contém doze lagoas de água doce conectadas por trilhas sombreadas na selva. A quarta lagoa, acessível após uma caminhada de 20 minutos da entrada, dá para uma pequena clareira a oeste. Ao pôr do sol, a água parada espelha as cores do céu em simetria quase perfeita. O parque fecha às cinco, então será preciso coordenar o acesso com o resort, mas para quem consegue, a recompensa é extraordinária.",
      "p2-pt-b13",
    ),
    block("Ideal para momentos íntimos imersos na natureza, longe da costa.", "p2-pt-b14"),
    h2("5. A Marina de Cap Cana ao Entardecer", "p2-pt-b15"),
    block(
      "Este é o único local da lista que não é um cenário natural, mas merece seu lugar. A Marina de Cap Cana, inspirada em portos de iates mediterrâneos, oferece um tipo completamente diferente de pôr do sol — emoldurado por arquitetura branca, decks de teca polida e o suave tilintar das adriças contra os mastros. Pegue uma mesa em um dos restaurantes à beira d'água e assista o céu mudar de coral para violeta enquanto os barcos balançam suavemente no porto.",
      "p2-pt-b16",
    ),
    block("Ideal para casais que preferem elegância e uma taça de vinho à areia entre os dedos dos pés.", "p2-pt-b17"),
    h2("Planejando Seu Momento ao Pôr do Sol", "p2-pt-b18"),
    block(
      "Cada um desses locais exige diferentes níveis de acesso e coordenação. Alguns são públicos e fáceis de alcançar; outros precisam de arranjos prévios com a equipe do resort ou a administração do parque. Se você está planejando um pedido de casamento em algum desses lugares, trabalhar com um planejador local que conhece a logística — horários das marés, permissões de acesso, posicionamento do fotógrafo — faz a diferença entre uma boa ideia e um momento impecável.",
      "p2-pt-b19",
    ),
  ],
  seo: {
    meta: {
      title: "5 Lugares Secretos para o Pôr do Sol em Punta Cana",
      description:
        "Descubra cinco locais secretos de pôr do sol em Punta Cana perfeitos para momentos românticos e pedidos de casamento.",
      keywords: [
        "por do sol punta cana",
        "lugares romanticos punta cana",
        "praias escondidas republica dominicana",
        "pedido casamento caribe",
      ],
    },
    openGraph: {
      title: "5 Lugares Românticos para o Pôr do Sol em Punta Cana",
      description: "Cinco locais isolados onde a hora dourada parece feita só para vocês dois.",
    },
    noIndex: false,
    noFollow: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POST 3 — What to Wear When Your Partner Proposes in the Caribbean
// translationGroup: proposal-outfit-guide-2025
// ─────────────────────────────────────────────────────────────────────────────

const post3_en = {
  _id: "blogPost-proposal-outfit-guide-en",
  _type: "blogPost",
  language: "en",
  translationGroup: "proposal-outfit-guide-2025",
  slug: { _type: "slug", current: "what-to-wear-partner-proposes-caribbean" },
  title: "What to Wear When Your Partner Proposes in the Caribbean",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Planning Tips",
  publishedAt: "2025-04-20",
  readingTime: 5,
  excerpt:
    "You want the photos to be timeless. Here is how to dress for a proposal without giving away the surprise — for both of you.",
  body: [
    h2("The Challenge: Look Amazing Without Raising Suspicion", "p3-en-b1"),
    block(
      'Here is the dilemma every proposer faces: you want your partner to look stunning in the photos, but you cannot exactly say, "Wear something beautiful tonight — no reason." The trick is subtlety. The goal is not to orchestrate a wardrobe but to nudge toward choices that will photograph beautifully in Caribbean light and feel natural in the moment.',
      "p3-en-b2",
    ),
    h2("For Her: Flowing Fabrics and Soft Colors", "p3-en-b3"),
    block(
      "The Caribbean wind is both your best friend and your wardrobe consultant. Flowing fabrics — a midi sundress, a maxi skirt, a light wrap — move beautifully in the breeze and create the kind of effortless motion that photographers dream of. Solid colors or very subtle prints work best against the ocean backdrop. Think soft white, champagne, blush, sage, or light blue.",
      "p3-en-b4",
    ),
    block(
      "Avoid heavy patterns, logos, or neon colors — they compete with the scenery and date photos quickly. If you are the one being proposed to and suspect something might be happening, trust your instincts and reach for something you feel confident in. Your comfort will show.",
      "p3-en-b5",
    ),
    block(
      "For footwear, leave the heels at the hotel. Elegant flat sandals or bare feet on the sand will keep the look relaxed and the walk to the location stress-free.",
      "p3-en-b6",
    ),
    h2("For Him: Linen Is Your Best Friend", "p3-en-b7"),
    block(
      "A well-fitted linen shirt — white, ivory, or light blue — paired with tailored chinos or linen trousers is the gold standard for Caribbean proposals. It strikes the balance between dressed-up and beach-appropriate, and it photographs exceptionally well in warm light. Roll the sleeves once or twice for a relaxed feel.",
      "p3-en-b8",
    ),
    block(
      'Avoid suits, ties, or anything that screams "I planned something." The best proposal outfits look intentional but not formal. If you normally wear a casual polo and shorts, stepping up to a linen shirt and chinos is noticeable but not suspicious.',
      "p3-en-b9",
    ),
    h2("Coordinating Without Matching", "p3-en-b10"),
    block(
      "You do not need to match. In fact, you should not. The most photogenic couples coordinate their color palette without wearing identical tones. If she is in white, he can wear light blue. If she is in blush, he can wear ivory. The goal is harmony — colors that live in the same family without looking costumey.",
      "p3-en-b11",
    ),
    block(
      "A good rule of thumb: stand in front of a mirror together before leaving. If the combination looks like a catalog photo, dial it back. If it looks like two people heading to a nice dinner by the water, you have it right.",
      "p3-en-b12",
    ),
    h2("Accessories That Elevate", "p3-en-b13"),
    block(
      "Small details make a difference in photos. A delicate necklace, a woven bracelet, a straw hat carried in hand — these add texture and personality without overpowering the frame. For him, a quality watch and clean leather sandals signal intention without effort.",
      "p3-en-b14",
    ),
    block(
      "One practical note: if the proposal involves walking on sand or wading into shallow water, plan footwear accordingly. There is nothing wrong with carrying your sandals — it actually makes for beautiful candid shots.",
      "p3-en-b15",
    ),
    h2("The Most Important Thing to Wear", "p3-en-b16"),
    block(
      "Confidence. Seriously. The couples whose proposal photos feel timeless are the ones who felt like themselves in the moment. Do not wear something uncomfortable to look a certain way. Choose what makes you feel good, adapt it slightly for the setting, and then forget about it entirely. The moment itself — the question, the answer, the embrace — is what makes the photo.",
      "p3-en-b17",
    ),
  ],
  seo: {
    meta: {
      title: "What to Wear for a Caribbean Proposal — Outfit Guide",
      description:
        "How to dress for a beach proposal in the Caribbean without giving away the surprise. Outfit tips for her, for him, and for flawless proposal photos.",
      keywords: [
        "proposal outfit",
        "what to wear proposal",
        "caribbean proposal dress code",
        "beach proposal clothing",
        "proposal photos outfit",
      ],
    },
    openGraph: {
      title: "What to Wear When Your Partner Proposes in the Caribbean",
      description: "How to dress for a proposal without giving away the surprise — for both of you.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post3_es = {
  _id: "blogPost-proposal-outfit-guide-es",
  _type: "blogPost",
  language: "es",
  translationGroup: "proposal-outfit-guide-2025",
  slug: { _type: "slug", current: "que-vestir-propuesta-matrimonio-caribe" },
  title: "Qué Vestir Cuando Tu Pareja Te Propone Matrimonio en el Caribe",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Consejos de Planificación",
  publishedAt: "2025-04-20",
  readingTime: 5,
  excerpt:
    "Quieres que las fotos sean atemporales. Aquí te contamos cómo vestirse para una propuesta sin arruinar la sorpresa — para ambos.",
  body: [
    h2("El Desafío: Lucir Increíble Sin Levantar Sospechas", "p3-es-b1"),
    block(
      'Este es el dilema que enfrenta cada persona que va a proponer: quieres que tu pareja luzca espectacular en las fotos, pero no puedes exactamente decir "Ponte algo bonito esta noche — sin razón alguna." El truco está en la sutileza. El objetivo no es orquestar un guardarropa sino orientar hacia elecciones que se vean hermosas en la luz del Caribe y se sientan naturales en el momento.',
      "p3-es-b2",
    ),
    h2("Para Ella: Telas Fluidas y Colores Suaves", "p3-es-b3"),
    block(
      "El viento del Caribe es tanto tu mejor amigo como tu consultor de moda. Las telas fluidas — un vestido midi, una falda larga, un pareo ligero — se mueven hermosamente con la brisa y crean ese tipo de movimiento sin esfuerzo que los fotógrafos sueñan capturar. Los colores sólidos o estampados muy sutiles funcionan mejor contra el fondo oceánico. Piensa en blanco suave, champán, rosa empolvado, salvia o azul claro.",
      "p3-es-b4",
    ),
    block(
      "Evita patrones pesados, logos o colores neón — compiten con el paisaje y envejecen las fotos rápidamente. Si eres a quien van a proponer y sospechas que algo puede estar pasando, confía en tu instinto y elige algo en lo que te sientas segura. Tu comodidad se notará.",
      "p3-es-b5",
    ),
    block(
      "Para el calzado, deja los tacones en el hotel. Sandalias planas elegantes o pies descalzos en la arena mantendrán el look relajado y la caminata al lugar libre de estrés.",
      "p3-es-b6",
    ),
    h2("Para Él: El Lino Es Tu Mejor Aliado", "p3-es-b7"),
    block(
      "Una camisa de lino bien cortada — blanca, marfil o azul claro — combinada con chinos entallados o pantalones de lino es el estándar dorado para propuestas en el Caribe. Logra el equilibrio entre elegante y apropiado para la playa, y se fotografía excepcionalmente bien en luz cálida. Enrolla las mangas una o dos veces para un toque relajado.",
      "p3-es-b8",
    ),
    block(
      'Evita trajes, corbatas o cualquier cosa que grite "planeé algo." Las mejores vestimentas de propuesta lucen intencionales pero no formales. Si normalmente usas polo casual y shorts, subir a una camisa de lino y chinos es notorio pero no sospechoso.',
      "p3-es-b9",
    ),
    h2("Coordinar Sin Combinar", "p3-es-b10"),
    block(
      "No necesitan combinar. De hecho, no deberían. Las parejas más fotogénicas coordinan su paleta de colores sin usar tonos idénticos. Si ella va de blanco, él puede usar azul claro. Si ella va de rosa, él puede ir de marfil. El objetivo es armonía — colores que vivan en la misma familia sin parecer un disfraz.",
      "p3-es-b11",
    ),
    block(
      "Una buena regla: párense frente al espejo juntos antes de salir. Si la combinación parece una foto de catálogo, redúzcanla. Si parece dos personas yendo a una cena agradable junto al agua, lo tienen perfecto.",
      "p3-es-b12",
    ),
    h2("Accesorios que Elevan", "p3-es-b13"),
    block(
      "Los pequeños detalles marcan la diferencia en las fotos. Un collar delicado, una pulsera tejida, un sombrero de paja en la mano — estos agregan textura y personalidad sin dominar el encuadre. Para él, un reloj de calidad y sandalias de cuero limpias señalan intención sin esfuerzo.",
      "p3-es-b14",
    ),
    block(
      "Una nota práctica: si la propuesta involucra caminar en la arena o vadear agua poco profunda, planifica el calzado en consecuencia. No hay nada malo en llevar las sandalias en la mano — de hecho, resulta en hermosas fotos espontáneas.",
      "p3-es-b15",
    ),
    h2("Lo Más Importante que Debes Usar", "p3-es-b16"),
    block(
      "Confianza. En serio. Las parejas cuyas fotos de propuesta se sienten atemporales son las que se sintieron como ellas mismas en el momento. No uses algo incómodo para lucir de cierta manera. Elige lo que te haga sentir bien, adáptalo ligeramente para el entorno, y luego olvídate de ello por completo. El momento en sí — la pregunta, la respuesta, el abrazo — es lo que hace la foto.",
      "p3-es-b17",
    ),
  ],
  seo: {
    meta: {
      title: "Qué Vestir para una Propuesta en el Caribe — Guía de Outfits",
      description:
        "Cómo vestirse para una propuesta en la playa del Caribe sin arruinar la sorpresa. Consejos de outfit para ella, para él, y para fotos impecables.",
      keywords: ["outfit propuesta", "que vestir propuesta", "vestimenta propuesta caribe", "ropa propuesta playa"],
    },
    openGraph: {
      title: "Qué Vestir Cuando Tu Pareja Te Propone en el Caribe",
      description: "Cómo vestirse para una propuesta sin arruinar la sorpresa — para ambos.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post3_fr = {
  _id: "blogPost-proposal-outfit-guide-fr",
  _type: "blogPost",
  language: "fr",
  translationGroup: "proposal-outfit-guide-2025",
  slug: { _type: "slug", current: "comment-shabiller-demande-mariage-caraibes" },
  title: "Comment S'habiller Quand Votre Partenaire Vous Demande en Mariage aux Caraïbes",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Conseils de Planification",
  publishedAt: "2025-04-20",
  readingTime: 5,
  excerpt:
    "Vous voulez que les photos soient intemporelles. Voici comment s'habiller pour une demande en mariage sans gâcher la surprise — pour vous deux.",
  body: [
    h2("Le Défi : Être Magnifique Sans Éveiller les Soupçons", "p3-fr-b1"),
    block(
      "Voici le dilemme de chaque demandeur : vous voulez que votre partenaire soit sublime sur les photos, mais vous ne pouvez pas exactement dire « Porte quelque chose de beau ce soir — pour aucune raison. » L'astuce est dans la subtilité. L'objectif n'est pas d'orchestrer une garde-robe mais d'orienter vers des choix qui se photographient magnifiquement sous la lumière caribéenne et semblent naturels dans le moment.",
      "p3-fr-b2",
    ),
    h2("Pour Elle : Tissus Fluides et Couleurs Douces", "p3-fr-b3"),
    block(
      "Le vent des Caraïbes est à la fois votre meilleur ami et votre conseiller mode. Les tissus fluides — une robe midi, une jupe longue, un paréo léger — bougent magnifiquement dans la brise et créent ce mouvement sans effort dont les photographes rêvent. Les couleurs unies ou les imprimés très subtils fonctionnent le mieux contre le décor océanique. Pensez blanc doux, champagne, rose poudré, sauge ou bleu clair.",
      "p3-fr-b4",
    ),
    block(
      "Évitez les motifs lourds, les logos ou les couleurs fluo — ils rivalisent avec le paysage et datent les photos rapidement. Si c'est vous qui allez recevoir la demande et que vous soupçonnez que quelque chose se prépare, faites confiance à votre instinct et choisissez quelque chose dans lequel vous vous sentez bien. Votre confort se verra.",
      "p3-fr-b5",
    ),
    block(
      "Pour les chaussures, laissez les talons à l'hôtel. Des sandales plates élégantes ou les pieds nus dans le sable garderont le look détendu et la marche vers le lieu sans stress.",
      "p3-fr-b6",
    ),
    h2("Pour Lui : Le Lin Est Votre Meilleur Allié", "p3-fr-b7"),
    block(
      "Une chemise en lin bien coupée — blanche, ivoire ou bleu clair — associée à un chino ajusté ou un pantalon en lin est la référence pour les demandes en mariage aux Caraïbes. Elle trouve l'équilibre entre habillé et adapté à la plage, et se photographie exceptionnellement bien en lumière chaude. Retroussez les manches une ou deux fois pour un effet décontracté.",
      "p3-fr-b8",
    ),
    block(
      "Évitez les costumes, les cravates ou tout ce qui crie « j'ai préparé quelque chose ». Les meilleures tenues de demande paraissent intentionnelles mais pas formelles. Si vous portez habituellement un polo décontracté et un short, passer à une chemise en lin et un chino est notable mais pas suspect.",
      "p3-fr-b9",
    ),
    h2("Coordonner Sans Assortir", "p3-fr-b10"),
    block(
      "Vous n'avez pas besoin de vous assortir. En fait, vous ne devriez pas. Les couples les plus photogéniques coordonnent leur palette de couleurs sans porter des tons identiques. Si elle est en blanc, il peut porter du bleu clair. Si elle est en rose, il peut choisir l'ivoire. L'objectif est l'harmonie — des couleurs qui vivent dans la même famille sans avoir l'air déguisé.",
      "p3-fr-b11",
    ),
    block(
      "Une bonne règle : tenez-vous devant un miroir ensemble avant de sortir. Si la combinaison ressemble à une photo de catalogue, réduisez l'intensité. Si elle ressemble à deux personnes se rendant à un beau dîner au bord de l'eau, c'est parfait.",
      "p3-fr-b12",
    ),
    h2("Les Accessoires qui Font la Différence", "p3-fr-b13"),
    block(
      "Les petits détails font la différence sur les photos. Un collier délicat, un bracelet tressé, un chapeau de paille porté à la main — ils ajoutent de la texture et de la personnalité sans dominer le cadre. Pour lui, une montre de qualité et des sandales en cuir propres signalent l'intention sans effort.",
      "p3-fr-b14",
    ),
    block(
      "Une note pratique : si la demande implique de marcher dans le sable ou de patauger dans l'eau peu profonde, prévoyez les chaussures en conséquence. Il n'y a rien de mal à porter ses sandales à la main — cela fait en réalité de belles photos spontanées.",
      "p3-fr-b15",
    ),
    h2("La Chose la Plus Importante à Porter", "p3-fr-b16"),
    block(
      "La confiance. Sérieusement. Les couples dont les photos de demande semblent intemporelles sont ceux qui se sentaient eux-mêmes dans le moment. Ne portez pas quelque chose d'inconfortable pour avoir un certain look. Choisissez ce qui vous fait vous sentir bien, adaptez-le légèrement au cadre, puis oubliez-le complètement. Le moment lui-même — la question, la réponse, l'étreinte — c'est ce qui fait la photo.",
      "p3-fr-b17",
    ),
  ],
  seo: {
    meta: {
      title: "Comment S'habiller pour une Demande en Mariage aux Caraïbes",
      description:
        "Comment s'habiller pour une demande en mariage sur la plage sans gâcher la surprise. Conseils de tenue pour elle, pour lui, et pour des photos parfaites.",
      keywords: [
        "tenue demande mariage",
        "comment shabiller demande",
        "dress code demande caraïbes",
        "vêtements demande plage",
      ],
    },
    openGraph: {
      title: "Comment S'habiller pour une Demande en Mariage aux Caraïbes",
      description: "Comment s'habiller pour une demande sans gâcher la surprise — pour vous deux.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post3_de = {
  _id: "blogPost-proposal-outfit-guide-de",
  _type: "blogPost",
  language: "de",
  translationGroup: "proposal-outfit-guide-2025",
  slug: { _type: "slug", current: "was-anziehen-heiratsantrag-karibik" },
  title: "Was Anziehen, Wenn Ihr Partner Ihnen in der Karibik einen Antrag Macht",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Planungstipps",
  publishedAt: "2025-04-20",
  readingTime: 5,
  excerpt:
    "Sie möchten, dass die Fotos zeitlos sind. So kleiden Sie sich für einen Heiratsantrag, ohne die Überraschung zu verraten — für Sie beide.",
  body: [
    h2("Die Herausforderung: Großartig Aussehen, Ohne Verdacht zu Erregen", "p3-de-b1"),
    block(
      "Hier ist das Dilemma jedes Antragstellers: Sie möchten, dass Ihr Partner auf den Fotos umwerfend aussieht, aber Sie können nicht einfach sagen: „Zieh heute Abend etwas Schönes an — ohne besonderen Grund.' Der Trick liegt in der Subtilität. Das Ziel ist nicht, eine Garderobe zu inszenieren, sondern sanft zu Entscheidungen zu lenken, die im karibischen Licht wunderschön fotografiert werden und sich im Moment natürlich anfühlen.",
      "p3-de-b2",
    ),
    h2("Für Sie: Fließende Stoffe und Sanfte Farben", "p3-de-b3"),
    block(
      "Der karibische Wind ist sowohl Ihr bester Freund als auch Ihr Modeberater. Fließende Stoffe — ein Midi-Sommerkleid, ein Maxirock, ein leichter Wickel — bewegen sich wunderschön in der Brise und erzeugen jene mühelose Bewegung, von der Fotografen träumen. Einfarbige Töne oder sehr dezente Muster funktionieren am besten vor dem Meereshintergrund. Denken Sie an sanftes Weiß, Champagner, zartes Rosa, Salbei oder Hellblau.",
      "p3-de-b4",
    ),
    block(
      "Vermeiden Sie auffällige Muster, Logos oder Neonfarben — sie konkurrieren mit der Kulisse und lassen Fotos schnell veraltet wirken. Wenn Sie diejenige sind, die den Antrag bekommt, und etwas ahnen, vertrauen Sie Ihrem Instinkt und greifen Sie zu etwas, worin Sie sich sicher fühlen. Ihr Wohlbefinden wird sich zeigen.",
      "p3-de-b5",
    ),
    block(
      "Beim Schuhwerk: Lassen Sie die Absätze im Hotel. Elegante flache Sandalen oder barfuß im Sand halten den Look entspannt und den Weg zum Ort stressfrei.",
      "p3-de-b6",
    ),
    h2("Für Ihn: Leinen Ist Ihr Bester Freund", "p3-de-b7"),
    block(
      "Ein gut sitzendes Leinenhemd — weiß, elfenbein oder hellblau — kombiniert mit taillierten Chinos oder Leinenhosen ist der Goldstandard für karibische Heiratsanträge. Es trifft die Balance zwischen schick und strandtauglich und fotografiert sich außergewöhnlich gut in warmem Licht. Krempeln Sie die Ärmel ein- oder zweimal hoch für ein lockeres Gefühl.",
      "p3-de-b8",
    ),
    block(
      "Vermeiden Sie Anzüge, Krawatten oder alles, was schreit: „Ich habe etwas geplant.' Die besten Antrags-Outfits wirken durchdacht, aber nicht förmlich. Wenn Sie normalerweise lässiges Polo und Shorts tragen, ist der Wechsel zu Leinenhemd und Chinos auffällig, aber nicht verdächtig.",
      "p3-de-b9",
    ),
    h2("Koordinieren Ohne zu Matchen", "p3-de-b10"),
    block(
      "Sie müssen nicht gleich gekleidet sein. Tatsächlich sollten Sie es nicht. Die fotogensten Paare koordinieren ihre Farbpalette, ohne identische Töne zu tragen. Wenn sie Weiß trägt, kann er Hellblau wählen. Wenn sie Rosa trägt, kann er Elfenbein nehmen. Das Ziel ist Harmonie — Farben, die in derselben Familie leben, ohne wie ein Kostüm auszusehen.",
      "p3-de-b11",
    ),
    block(
      "Eine gute Faustregel: Stellen Sie sich zusammen vor einen Spiegel, bevor Sie das Haus verlassen. Wenn die Kombination wie ein Katalogfoto aussieht, nehmen Sie es etwas zurück. Wenn es aussieht wie zwei Menschen auf dem Weg zu einem schönen Dinner am Wasser, haben Sie es richtig.",
      "p3-de-b12",
    ),
    h2("Accessoires, die den Unterschied Machen", "p3-de-b13"),
    block(
      "Kleine Details machen einen Unterschied auf Fotos. Eine zarte Halskette, ein geflochtenes Armband, ein Strohhut in der Hand — sie fügen Textur und Persönlichkeit hinzu, ohne das Bild zu dominieren. Für ihn signalisieren eine hochwertige Uhr und saubere Ledersandalen Absicht ohne Anstrengung.",
      "p3-de-b14",
    ),
    block(
      "Ein praktischer Hinweis: Wenn der Antrag das Gehen im Sand oder Waten in flachem Wasser beinhaltet, planen Sie das Schuhwerk entsprechend. Es ist überhaupt nichts dabei, die Sandalen in der Hand zu tragen — es ergibt tatsächlich wunderschöne spontane Aufnahmen.",
      "p3-de-b15",
    ),
    h2("Das Wichtigste, Was Sie Tragen Sollten", "p3-de-b16"),
    block(
      "Selbstvertrauen. Wirklich. Die Paare, deren Antragsfotos zeitlos wirken, sind diejenigen, die sich im Moment wie sie selbst fühlten. Tragen Sie nichts Unbequemes, um auf eine bestimmte Weise auszusehen. Wählen Sie, was Ihnen ein gutes Gefühl gibt, passen Sie es leicht an die Umgebung an, und vergessen Sie es dann vollständig. Der Moment selbst — die Frage, die Antwort, die Umarmung — das ist es, was das Foto ausmacht.",
      "p3-de-b17",
    ),
  ],
  seo: {
    meta: {
      title: "Was Anziehen beim Heiratsantrag in der Karibik — Outfit-Guide",
      description:
        "Wie man sich für einen Strand-Heiratsantrag in der Karibik kleidet, ohne die Überraschung zu verraten. Outfit-Tipps für sie und ihn.",
      keywords: [
        "outfit heiratsantrag",
        "was anziehen antrag",
        "karibik heiratsantrag kleidung",
        "strand antrag outfit",
      ],
    },
    openGraph: {
      title: "Was Anziehen beim Heiratsantrag in der Karibik",
      description: "So kleiden Sie sich für einen Antrag, ohne die Überraschung zu verraten — für Sie beide.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post3_it = {
  _id: "blogPost-proposal-outfit-guide-it",
  _type: "blogPost",
  language: "it",
  translationGroup: "proposal-outfit-guide-2025",
  slug: { _type: "slug", current: "come-vestirsi-proposta-matrimonio-caraibi" },
  title: "Come Vestirsi Quando il Tuo Partner Ti Propone ai Caraibi",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Consigli di Pianificazione",
  publishedAt: "2025-04-20",
  readingTime: 5,
  excerpt:
    "Vuoi che le foto siano senza tempo. Ecco come vestirsi per una proposta senza rovinare la sorpresa — per entrambi.",
  body: [
    h2("La Sfida: Essere Bellissimi Senza Destare Sospetti", "p3-it-b1"),
    block(
      "Ecco il dilemma di ogni proponente: vuoi che il tuo partner sia splendido nelle foto, ma non puoi esattamente dire « Metti qualcosa di bello stasera — senza motivo. » Il trucco sta nella sottigliezza. L'obiettivo non è orchestrare un guardaroba ma orientare verso scelte che si fotografano magnificamente nella luce caraibica e sembrano naturali nel momento.",
      "p3-it-b2",
    ),
    h2("Per Lei: Tessuti Fluidi e Colori Morbidi", "p3-it-b3"),
    block(
      "Il vento dei Caraibi è sia il vostro migliore amico che il vostro consulente di moda. I tessuti fluidi — un vestito midi, una gonna lunga, un pareo leggero — si muovono magnificamente nella brezza e creano quel tipo di movimento senza sforzo che i fotografi sognano. I colori solidi o le stampe molto sottili funzionano meglio contro lo sfondo oceanico. Pensate a bianco morbido, champagne, rosa cipria, salvia o azzurro.",
      "p3-it-b4",
    ),
    block(
      "Evitate fantasie pesanti, loghi o colori neon — competono con il paesaggio e invecchiano le foto rapidamente. Se siete voi a ricevere la proposta e sospettate che qualcosa stia per succedere, fidatevi del vostro istinto e scegliete qualcosa in cui vi sentite sicure. Il vostro comfort si vedrà.",
      "p3-it-b5",
    ),
    block(
      "Per le scarpe, lasciate i tacchi in hotel. Sandali bassi eleganti o piedi nudi sulla sabbia manterranno il look rilassato e la camminata verso la location senza stress.",
      "p3-it-b6",
    ),
    h2("Per Lui: Il Lino È il Vostro Migliore Amico", "p3-it-b7"),
    block(
      "Una camicia di lino ben tagliata — bianca, avorio o azzurra — abbinata a chinos su misura o pantaloni di lino è il gold standard per le proposte ai Caraibi. Trova l'equilibrio tra elegante e appropriato per la spiaggia, e si fotografa eccezionalmente bene in luce calda. Arrotolate le maniche una o due volte per un tocco rilassato.",
      "p3-it-b8",
    ),
    block(
      "Evitate abiti, cravatte o qualsiasi cosa che gridi « ho pianificato qualcosa. » I migliori outfit da proposta sembrano intenzionali ma non formali. Se normalmente indossate polo casual e pantaloncini, passare a una camicia di lino e chinos è notevole ma non sospetto.",
      "p3-it-b9",
    ),
    h2("Coordinare Senza Abbinare", "p3-it-b10"),
    block(
      "Non c'è bisogno di abbinarsi. Anzi, non dovreste. Le coppie più fotogeniche coordinano la palette colori senza indossare tonalità identiche. Se lei è in bianco, lui può indossare azzurro. Se lei è in rosa, lui può scegliere avorio. L'obiettivo è l'armonia — colori che vivono nella stessa famiglia senza sembrare un costume.",
      "p3-it-b11",
    ),
    block(
      "Una buona regola: mettetevi davanti allo specchio insieme prima di uscire. Se la combinazione sembra una foto di catalogo, ridimensionatela. Se sembra che due persone stiano andando a una bella cena vista mare, avete fatto centro.",
      "p3-it-b12",
    ),
    h2("Accessori che Elevano", "p3-it-b13"),
    block(
      "I piccoli dettagli fanno la differenza nelle foto. Una collana delicata, un bracciale intrecciato, un cappello di paglia portato in mano — aggiungono texture e personalità senza sovrastare l'inquadratura. Per lui, un orologio di qualità e sandali in pelle puliti comunicano intenzione senza sforzo.",
      "p3-it-b14",
    ),
    block(
      "Una nota pratica: se la proposta prevede di camminare sulla sabbia o guadare acqua bassa, pianificate le calzature di conseguenza. Non c'è nulla di male nel portare i sandali in mano — in realtà produce bellissimi scatti spontanei.",
      "p3-it-b15",
    ),
    h2("La Cosa Più Importante da Indossare", "p3-it-b16"),
    block(
      "Sicurezza. Sul serio. Le coppie le cui foto di proposta risultano senza tempo sono quelle che si sentivano se stesse nel momento. Non indossate qualcosa di scomodo per apparire in un certo modo. Scegliete ciò che vi fa sentire bene, adattatelo leggermente all'ambiente, e poi dimenticatevene completamente. Il momento stesso — la domanda, la risposta, l'abbraccio — è ciò che rende la foto.",
      "p3-it-b17",
    ),
  ],
  seo: {
    meta: {
      title: "Come Vestirsi per una Proposta di Matrimonio ai Caraibi",
      description:
        "Come vestirsi per una proposta di matrimonio in spiaggia ai Caraibi senza rovinare la sorpresa. Consigli di outfit per lei, per lui, e per foto perfette.",
      keywords: [
        "outfit proposta matrimonio",
        "come vestirsi proposta",
        "dress code proposta caraibi",
        "abbigliamento proposta spiaggia",
      ],
    },
    openGraph: {
      title: "Come Vestirsi per una Proposta di Matrimonio ai Caraibi",
      description: "Come vestirsi per una proposta senza rovinare la sorpresa — per entrambi.",
    },
    noIndex: false,
    noFollow: false,
  },
};

const post3_pt = {
  _id: "blogPost-proposal-outfit-guide-pt",
  _type: "blogPost",
  language: "pt",
  translationGroup: "proposal-outfit-guide-2025",
  slug: { _type: "slug", current: "como-se-vestir-pedido-casamento-caribe" },
  title: "Como Se Vestir Quando Seu Parceiro Faz o Pedido no Caribe",
  category: CATEGORY_PLANNING_TIPS,
  categoryTag: "Dicas de Planejamento",
  publishedAt: "2025-04-20",
  readingTime: 5,
  excerpt:
    "Você quer que as fotos sejam atemporais. Veja como se vestir para um pedido de casamento sem estragar a surpresa — para vocês dois.",
  body: [
    h2("O Desafio: Ficar Incrível Sem Levantar Suspeitas", "p3-pt-b1"),
    block(
      'Eis o dilema de quem vai pedir: você quer que seu parceiro esteja deslumbrante nas fotos, mas não pode exatamente dizer "Vista algo bonito hoje à noite — sem motivo especial." O truque está na sutileza. O objetivo não é orquestrar um guarda-roupa, mas direcionar para escolhas que ficarão lindas na luz do Caribe e parecerão naturais no momento.',
      "p3-pt-b2",
    ),
    h2("Para Ela: Tecidos Fluidos e Cores Suaves", "p3-pt-b3"),
    block(
      "O vento do Caribe é tanto seu melhor amigo quanto seu consultor de moda. Tecidos fluidos — um vestido midi, uma saia longa, um sarongue leve — movem-se lindamente na brisa e criam aquele tipo de movimento sem esforço que os fotógrafos sonham em capturar. Cores sólidas ou estampas muito sutis funcionam melhor contra o cenário oceânico. Pense em branco suave, champanhe, rosa empoeirado, sálvia ou azul claro.",
      "p3-pt-b4",
    ),
    block(
      "Evite estampas pesadas, logos ou cores neon — elas competem com a paisagem e envelhecem as fotos rapidamente. Se é você quem vai receber o pedido e suspeita que algo pode estar acontecendo, confie no seu instinto e escolha algo em que se sinta segura. Seu conforto vai transparecer.",
      "p3-pt-b5",
    ),
    block(
      "Para os pés, deixe os saltos no hotel. Sandálias rasteiras elegantes ou pés descalços na areia manterão o visual relaxado e a caminhada até o local livre de estresse.",
      "p3-pt-b6",
    ),
    h2("Para Ele: O Linho É Seu Melhor Amigo", "p3-pt-b7"),
    block(
      "Uma camisa de linho bem cortada — branca, marfim ou azul claro — combinada com chinos ajustados ou calças de linho é o padrão ouro para pedidos de casamento no Caribe. Encontra o equilíbrio entre arrumado e apropriado para a praia, e fotografa excepcionalmente bem em luz quente. Dobre as mangas uma ou duas vezes para um toque descontraído.",
      "p3-pt-b8",
    ),
    block(
      'Evite ternos, gravatas ou qualquer coisa que grite "planejei algo." Os melhores trajes de pedido parecem intencionais mas não formais. Se você normalmente usa polo casual e bermuda, subir para camisa de linho e chino é notável mas não suspeito.',
      "p3-pt-b9",
    ),
    h2("Coordenar Sem Combinar", "p3-pt-b10"),
    block(
      "Vocês não precisam combinar. Na verdade, não deveriam. Os casais mais fotogênicos coordenam sua paleta de cores sem usar tons idênticos. Se ela está de branco, ele pode vestir azul claro. Se ela está de rosa, ele pode escolher marfim. O objetivo é harmonia — cores que vivem na mesma família sem parecer fantasia.",
      "p3-pt-b11",
    ),
    block(
      "Uma boa regra: fiquem juntos na frente do espelho antes de sair. Se a combinação parece uma foto de catálogo, reduza a intensidade. Se parece dois pessoas indo para um jantar agradável à beira-mar, está perfeito.",
      "p3-pt-b12",
    ),
    h2("Acessórios que Elevam", "p3-pt-b13"),
    block(
      "Pequenos detalhes fazem a diferença nas fotos. Um colar delicado, uma pulseira trançada, um chapéu de palha na mão — eles adicionam textura e personalidade sem dominar o enquadramento. Para ele, um relógio de qualidade e sandálias de couro limpas sinalizam intenção sem esforço.",
      "p3-pt-b14",
    ),
    block(
      "Uma nota prática: se o pedido envolve caminhar na areia ou vadear em água rasa, planeje o calçado adequadamente. Não há nada de errado em carregar as sandálias na mão — na verdade, resulta em lindas fotos espontâneas.",
      "p3-pt-b15",
    ),
    h2("A Coisa Mais Importante para Vestir", "p3-pt-b16"),
    block(
      "Confiança. Sério. Os casais cujas fotos de pedido parecem atemporais são aqueles que se sentiram como si mesmos no momento. Não vista algo desconfortável para parecer de certa forma. Escolha o que faz você se sentir bem, adapte ligeiramente para o ambiente, e depois esqueça completamente. O momento em si — a pergunta, a resposta, o abraço — é o que faz a foto.",
      "p3-pt-b17",
    ),
  ],
  seo: {
    meta: {
      title: "Como Se Vestir para um Pedido de Casamento no Caribe",
      description:
        "Como se vestir para um pedido de casamento na praia do Caribe sem estragar a surpresa. Dicas de outfit para ela, para ele, e para fotos perfeitas.",
      keywords: [
        "outfit pedido casamento",
        "como se vestir pedido",
        "dress code pedido caribe",
        "roupa pedido praia",
      ],
    },
    openGraph: {
      title: "Como Se Vestir para um Pedido de Casamento no Caribe",
      description: "Como se vestir para um pedido sem estragar a surpresa — para vocês dois.",
    },
    noIndex: false,
    noFollow: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

const ALL_POSTS = [
  // Post 1 — Planning Guide (6 languages)
  post1_en,
  post1_es,
  post1_fr,
  post1_de,
  post1_it,
  post1_pt,
  // Post 2 — Sunset Spots (6 languages)
  post2_en,
  post2_es,
  post2_fr,
  post2_de,
  post2_it,
  post2_pt,
  // Post 3 — What to Wear (6 languages)
  post3_en,
  post3_es,
  post3_fr,
  post3_de,
  post3_it,
  post3_pt,
];

async function seed() {
  console.log("📝 Seeding BlogCategory documents (required for post references)...\n");

  for (const doc of BLOG_CATEGORIES) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ ${doc._id} — ${doc.label.en}`);
    } catch (error) {
      console.error(`  ❌ ${doc._id} — FAILED:`, error);
      console.error("\nAborting: fix category errors before seeding posts.\n");
      process.exit(1);
    }
  }

  console.log("\n📝 Seeding Blog Posts (3 posts × 6 languages = 18 documents)...\n");

  let success = 0;
  let failed = 0;

  for (const post of ALL_POSTS) {
    try {
      await client.createOrReplace(post);
      console.log(`  ✅ ${post._id} — "${post.title}"`);
      success++;
    } catch (error) {
      console.error(`  ❌ ${post._id} — FAILED:`, error);
      failed++;
    }
  }

  console.log(`\n🏁 Done! ${success} seeded, ${failed} failed.\n`);

  if (failed === 0) {
    console.log("📝 Next steps:");
    console.log("   1. Open your Studio at /studio");
    console.log("   2. Go to each Blog Post and upload a hero photo");
    console.log("   3. Optionally add gallery images");
    console.log(
      "   4. BlogCategory docs were seeded at the start of this run (planning-tips, destination-guides)\n",
    );
  }
}

seed();