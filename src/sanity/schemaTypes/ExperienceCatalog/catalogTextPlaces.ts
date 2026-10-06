import { bi } from "../shared/labels";

/**
 * Catalog text, section by section in the order a visitor meets it, with
 * where each text appears on the website. Each section is a tab and a
 * fieldset of the Catalog text document; "where" becomes the field's
 * description.
 */
export type CatalogTextSection = {
  name: string;
  title: string;
  description?: string;
  fields: [key: string, where: string][];
};

const footerLink = bi("Enlace en el pie de página", "Link in the footer");

export const CATALOG_TEXT_SECTIONS: CatalogTextSection[] = [
  {
    name: "navigation",
    title: bi("Menú y pie de página", "Menu & footer"),
    description: bi(
      "En todas las páginas: el menú de arriba y el pie de página",
      "On every page: the top menu and the footer",
    ),
    fields: [
      [
        "navHome",
        bi(
          "Enlace del menú de arriba; también el nombre del logo para lectores de pantalla",
          "Top menu link; also the logo's name for screen readers",
        ),
      ],
      ["navProposals", bi("Enlace del menú de arriba", "Top menu link")],
      ["navDinners", bi("Enlace del menú de arriba", "Top menu link")],
      ["navHow", bi("Enlace del menú de arriba", "Top menu link")],
      ["navFaq", bi("Enlace del menú de arriba", "Top menu link")],
      [
        "planProposal",
        bi(
          "Botón dorado a la derecha del menú de arriba, en todas las páginas menos Cenas románticas",
          "Gold button at the right of the top menu, on every page except Romantic dinners",
        ),
      ],
      [
        "planCelebration",
        bi(
          "El mismo botón dorado, solo en las páginas de Cenas románticas",
          "The same gold button, only on the Romantic dinners pages",
        ),
      ],
      [
        "contactUsLabel",
        bi(
          "Enlace del menú de arriba y del pie de página; también el título de la página Contacto cuando ese está vacío",
          "Top menu and footer link; also the Contact page heading when that one is empty",
        ),
      ],
      [
        "menu",
        bi(
          "Botón «Menú» que abre el menú en teléfonos y tabletas",
          "The «Menu» button that opens the menu on phones and tablets",
        ),
      ],
      [
        "proposalSectionTitle",
        bi(
          "Enlace en el pie de página; también el título de la pestaña de Propuestas si su SEO no tiene título",
          "Footer link; also the Proposals browser-tab title when its SEO has no title",
        ),
      ],
      [
        "dinnerSectionTitle",
        bi(
          "Enlace en el pie de página; también el título de la pestaña de Cenas románticas si su SEO no tiene título",
          "Footer link; also the Romantic dinners browser-tab title when its SEO has no title",
        ),
      ],
      ["blog", footerLink],
      ["faq", footerLink],
      ["privacy", footerLink],
      ["terms", footerLink],
      [
        "rightsReserved",
        bi(
          "Pie de página, después de «© año Empresa.»",
          "Footer, after «© year Company.»",
        ),
      ],
    ],
  },
  {
    name: "cards",
    title: bi("Tarjetas", "Cards"),
    description: bi(
      "Las tarjetas de paquetes (Propuestas y la página de cada paquete) y de cenas",
      "The package cards (Proposals and each package's page) and dinner cards",
    ),
    fields: [
      [
        "startingAtLabel",
        bi(
          "Antes del precio en cada tarjeta de Propuestas y en las propuestas destacadas de Inicio",
          "Before the price on each Proposals card and on Home's featured proposals",
        ),
      ],
      [
        "selectStyleLabel",
        bi(
          "Encima de la elección de estilo de una tarjeta (solo si el paquete tiene estilos)",
          "Above a card's style choice (only when the package has styles)",
        ),
      ],
      [
        "selectPackage",
        bi(
          "Botón dorado al pie de una tarjeta de Propuestas, antes de elegirla",
          "Gold button at the bottom of a Proposals card, before it's chosen",
        ),
      ],
      [
        "selectedPackage",
        bi(
          "El mismo botón, después de elegir la tarjeta",
          "The same button, after the card is chosen",
        ),
      ],
      [
        "includedLabel",
        bi(
          "Título de la sección desplegable «Incluye» en la página de cada paquete y en las cenas; también «2 incluidos» junto a invitados y bebidas",
          "Title of the «Included» fold-out on each package's page and on dinners; also «2 included» next to guests and drinks",
        ),
      ],
      [
        "currencySymbol",
        bi(
          "Reemplaza el símbolo de moneda en todos los precios de las tarjetas. Vacío = «$»",
          "Replaces the currency symbol in every card price. Empty = «$»",
        ),
      ],
    ],
  },
  {
    name: "price",
    title: bi("Precio y extras", "Price & extras"),
    description: bi(
      "Bajo las tarjetas, alrededor del precio. En Propuestas aparecen después de elegir un paquete",
      "Under the cards, around the price. On Proposals they appear after a package is chosen",
    ),
    fields: [
      [
        "extras",
        bi(
          "Título de la sección desplegable «Extras» y fila del detalle del precio",
          "Title of the «Extras» fold-out and a row in the price details",
        ),
      ],
      [
        "noExtras",
        bi(
          "Resumen de la sección Extras cuando no hay ninguno marcado",
          "Summary of the Extras fold-out when none is ticked",
        ),
      ],
      [
        "quantity",
        bi(
          "Casilla de cantidad al marcar un extra por unidad o por hora",
          "Quantity box after ticking a per-unit or per-hour extra",
        ),
      ],
      [
        "quotePending",
        bi(
          "En lugar del precio de un extra a cotizar, y debajo del total cuando hace falta una cotización",
          "Instead of the price of a quote-only extra, and under the total when a quote is needed",
        ),
      ],
      [
        "estimatedTotalLabel",
        bi(
          "Junto al total grande del recuadro del precio, y última fila del detalle",
          "Next to the big total in the price box, and the last row of the details",
        ),
      ],
      [
        "priceDetails",
        bi(
          "Título del desplegable pequeño debajo del total",
          "Title of the small fold-out under the total",
        ),
      ],
      [
        "baseExperience",
        bi(
          "Fila del detalle del precio (si es mayor que 0)",
          "Price details row (when above 0)",
        ),
      ],
      [
        "additionalGuests",
        bi(
          "Fila del detalle del precio (si es mayor que 0)",
          "Price details row (when above 0)",
        ),
      ],
      [
        "menuSupplements",
        bi(
          "Fila del detalle del precio (si es mayor que 0)",
          "Price details row (when above 0)",
        ),
      ],
      [
        "drinkSupplements",
        bi(
          "Fila del detalle del precio (si es mayor que 0)",
          "Price details row (when above 0)",
        ),
      ],
      [
        "duration",
        bi(
          "«Duración: …» debajo del total, en las cenas",
          "«Duration: …» under the total, on dinners",
        ),
      ],
      [
        "minutes",
        bi(
          "Después de la duración en las cenas, y en las propuestas destacadas de Inicio",
          "After the duration on dinners, and on Home's featured proposals",
        ),
      ],
      [
        "completeHint",
        bi(
          "Aviso encima del botón de solicitud mientras falta elegir algo",
          "Hint above the request button while something is still to be chosen",
        ),
      ],
      [
        "availabilityButtonLabel",
        bi(
          "Botón de solicitud bajo el precio de las propuestas, y título de la ventana de solicitud en Propuestas",
          "Request button under the price on proposals, and the title of the request pop-up on Proposals",
        ),
      ],
      [
        "requestDinnerDate",
        bi(
          "El mismo botón de solicitud, en las cenas",
          "The same request button, on dinners",
        ),
      ],
    ],
  },
  {
    name: "dinner",
    title: bi("Opciones de la cena", "Dinner options"),
    description: bi(
      "En las tarjetas de cenas, y en el recuadro de cena de una propuesta al marcar «Cena romántica para dos»",
      "On dinner cards, and in a proposal's dinner box after ticking «Romantic dinner for two»",
    ),
    fields: [
      [
        "occasionGuests",
        bi(
          "Título del desplegable de ocasión e invitados",
          "Title of the occasion & guests fold-out",
        ),
      ],
      [
        "guests",
        bi(
          "Junto al contador de invitados y en el resumen de ese desplegable",
          "Next to the guest counter and in that fold-out's summary",
        ),
      ],
      [
        "occasion",
        bi(
          "Etiqueta del selector de ocasión, y resumen cuando aún no hay ocasión",
          "Label of the occasion dropdown, and the summary when none is chosen yet",
        ),
      ],
      [
        "customOccasion",
        bi(
          "Primera opción del selector de ocasión y etiqueta de la casilla para escribirla",
          "First option of the occasion dropdown and the label of the box to write it",
        ),
      ],
      [
        "capacityPending",
        bi(
          "Nota bajo el contador de invitados cuando la cena no tiene un máximo",
          "Note under the guest counter when the dinner has no maximum",
        ),
      ],
      [
        "foodMenu",
        bi(
          "Título del desplegable del menú de comida",
          "Title of the food menu fold-out",
        ),
      ],
      [
        "menusCompleted",
        bi(
          "Resumen «1 / 2 menús completos»",
          "Summary «1 / 2 menus completed»",
        ),
      ],
      [
        "guest",
        bi(
          "Subtítulos «Invitado 1», «Invitado 2» en el menú, las bebidas y la cena de una propuesta",
          "«Guest 1», «Guest 2» sub-headings in the menu, the drinks and a proposal's dinner",
        ),
      ],
      [
        "chooseMenu",
        bi(
          "Resumen de un invitado mientras su menú está incompleto",
          "A guest's summary while their menu is incomplete",
        ),
      ],
      [
        "menuSelected",
        bi(
          "Resumen de un invitado cuando su menú está completo",
          "A guest's summary once their menu is complete",
        ),
      ],
      [
        "starter",
        bi(
          "Etiqueta del selector de entrada de cada invitado",
          "Label of each guest's starter dropdown",
        ),
      ],
      [
        "main",
        bi(
          "Etiqueta del selector de plato principal de cada invitado",
          "Label of each guest's main course dropdown",
        ),
      ],
      [
        "dessert",
        bi(
          "Etiqueta del selector de postre de cada invitado",
          "Label of each guest's dessert dropdown",
        ),
      ],
      [
        "select",
        bi(
          "Primera opción vacía de los selectores de plato y cóctel",
          "Empty first option of the dish and cocktail dropdowns",
        ),
      ],
      [
        "vegan",
        bi(
          "Etiqueta bajo un plato vegano elegido, en las cenas",
          "Badge under a chosen vegan dish, on dinners",
        ),
      ],
      [
        "vegetarian",
        bi(
          "Etiqueta bajo un plato vegetariano elegido, en las cenas",
          "Badge under a chosen vegetarian dish, on dinners",
        ),
      ],
      [
        "welcomeCocktail",
        bi(
          "Selector de cóctel de cada invitado y título en las bebidas (si la cena ofrece cócteles)",
          "Each guest's cocktail dropdown and a heading in the drinks (when the dinner offers cocktails)",
        ),
      ],
      [
        "drinksWine",
        bi(
          "Título del desplegable de bebidas y vino",
          "Title of the drinks & wine fold-out",
        ),
      ],
      [
        "cocktails",
        bi(
          "Resumen de las bebidas, p. ej. «2 cócteles»",
          "Drinks summary, e.g. «2 cocktails»",
        ),
      ],
      [
        "cocktailHint",
        bi(
          "Aviso bajo el título del cóctel de bienvenida",
          "Hint under the welcome cocktail heading",
        ),
      ],
      [
        "wineSelection",
        bi(
          "Línea encima de las casillas de vino",
          "Line above the wine checkboxes",
        ),
      ],
      [
        "proposalDinnerEyebrow",
        bi(
          "Línea pequeña arriba del recuadro de cena de una propuesta",
          "Small top line of a proposal's dinner box",
        ),
      ],
      [
        "proposalDinnerTitle",
        bi(
          "Título del recuadro de cena de una propuesta",
          "Heading of a proposal's dinner box",
        ),
      ],
      [
        "proposalDinnerIntro",
        bi(
          "Texto de introducción del recuadro de cena de una propuesta",
          "Intro text of a proposal's dinner box",
        ),
      ],
      [
        "dietaryLegend",
        bi(
          "Nota pequeña al pie del recuadro de cena de una propuesta",
          "Small note at the bottom of a proposal's dinner box",
        ),
      ],
    ],
  },
  {
    name: "requestForm",
    title: bi("Formulario de solicitud", "Request form"),
    description: bi(
      "En la página Contacto, en la ventana de solicitud de Propuestas y bajo el precio en la página de cada paquete y en las cenas",
      "On the Contact page, in the Proposals request pop-up, and under the price on each package's page and on dinners",
    ),
    fields: [
      ["fullName", bi("Etiqueta del campo", "Field label")],
      ["email", bi("Etiqueta del campo", "Field label")],
      ["phone", bi("Etiqueta del campo", "Field label")],
      ["hotelAccommodation", bi("Etiqueta del campo", "Field label")],
      ["preferredDate", bi("Primer campo de fecha", "First date field")],
      ["alternativeDate", bi("Segundo campo de fecha", "Second date field")],
      [
        "datesFlexible",
        bi("Texto de la casilla de fechas", "Dates checkbox text"),
      ],
      [
        "datePreferenceNote",
        bi("Nota bajo los campos de fecha", "Note under the date fields"),
      ],
      ["requestComments", bi("Etiqueta del mensaje", "Message box label")],
      ["fragranceSensitivity", bi("Etiqueta del campo", "Field label")],
      ["send", bi("Botón de envío", "Send button")],
      [
        "success",
        bi(
          "Mensaje tras enviar en Contacto y en las propuestas",
          "Message after sending on Contact and on proposals",
        ),
      ],
      ["error", bi("Mensaje si el envío falla", "Message when sending fails")],
    ],
  },
  {
    name: "policy",
    title: bi("Cenas: depósito y avisos", "Dinner deposit & notes"),
    description: bi(
      "Escribe {deposit} en un texto para mostrar el monto del depósito",
      "Write {deposit} in a text to show the deposit amount",
    ),
    fields: [
      [
        "dinnerDepositAmount",
        bi(
          "Solo en inglés; vale para todos los idiomas. Llena {deposit} aquí y en los textos de Inicio",
          "English only; used for every language. Fills {deposit} here and in the Home texts",
        ),
      ],
      [
        "dinnerExclusivity",
        bi(
          "Sección «Cena privada» de Inicio y recuadro de la introducción de Cenas románticas",
          "Home's «Private dinner» section and the Romantic dinners intro box",
        ),
      ],
      [
        "dinnerRequestNote",
        bi(
          "Encima del botón de envío en las cenas, y en el recuadro de la introducción de Cenas románticas",
          "Above the send button on dinners, and in the Romantic dinners intro box",
        ),
      ],
      [
        "dinnerPaymentNote",
        bi(
          "Encima del botón de envío en las cenas, en el recuadro de Cenas románticas y en «Cena privada» de Inicio",
          "Above the send button on dinners, in the Romantic dinners intro box and in Home's «Private dinner»",
        ),
      ],
      [
        "dinnerRequestSuccess",
        bi(
          "Mensaje tras enviar la solicitud de una cena",
          "Message after sending a dinner request",
        ),
      ],
    ],
  },
  {
    name: "accessibility",
    title: bi("Lectores de pantalla", "Screen readers"),
    description: bi(
      "No se ven en la página: los lee en voz alta el lector de pantalla de las personas ciegas",
      "Not visible on the page: read aloud by blind visitors' screen readers",
    ),
    fields: [
      [
        "photo",
        bi(
          "Nombre de la galería de fotos de una tarjeta y de sus puntos",
          "Name of a card's photo gallery and its dots",
        ),
      ],
      [
        "previous",
        bi(
          "Flecha ← de la galería de una tarjeta",
          "← arrow of a card gallery",
        ),
      ],
      [
        "next",
        bi(
          "Flecha → de la galería de una tarjeta",
          "→ arrow of a card gallery",
        ),
      ],
      [
        "close",
        bi(
          "Botón X de la ventana de solicitud de Propuestas",
          "X button of the Proposals request pop-up",
        ),
      ],
      [
        "siteLinks",
        bi("Lista de enlaces del pie de página", "Footer link list"),
      ],
      ["addGuest", bi("Botón «+» de invitados", "Guest «+» button")],
      ["removeGuest", bi("Botón «−» de invitados", "Guest «−» button")],
    ],
  },
  {
    name: "preview",
    title: bi("Sitio de prueba", "Preview site"),
    description: bi(
      "Solo en el sitio de prueba, en la cena de ejemplo de Cenas románticas",
      "Only on the preview site, on the Romantic dinners example card",
    ),
    fields: [
      [
        "previewOnly",
        bi(
          "Nota arriba del formulario de la cena de ejemplo",
          "Note at the top of the example card's form",
        ),
      ],
      [
        "setupTemplate",
        bi(
          "Etiqueta en la foto de muestra cuando el estilo no tiene foto",
          "Label on the placeholder photo when the style has none",
        ),
      ],
      [
        "photoPending",
        bi(
          "Texto pequeño en esa misma foto de muestra",
          "Small text on that same placeholder photo",
        ),
      ],
      [
        "priceToBeDefined",
        bi(
          "En lugar del precio en una tarjeta de propuesta de ejemplo sin precio (hoy no aparece en el sitio)",
          "Instead of the price on an example proposal card with no price (not shown on the site today)",
        ),
      ],
    ],
  },
];
