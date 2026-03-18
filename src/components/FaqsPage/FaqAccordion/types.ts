export interface FaqItem {
  id: string;
  category: string;
  questionEn: string;
  questionEs: string;
  answerEn: string;
  answerEs: string;
}

// ─── Static seed data ─────────────────────────────────────────────────────────
// Replace with a Sanity GROQ query when CMS is ready.
// Shape maps 1-to-1 to a Sanity document type with a `category` field.

export const FAQ_ITEMS: FaqItem[] = [
  // Booking & Reservations
  {
    id: "booking-1",
    category: "booking",
    questionEn: "How far in advance should I book my proposal?",
    questionEs: "¿Con cuánta anticipación debo reservar mi propuesta?",
    answerEn:
      "We recommend booking at least 4–6 weeks in advance to ensure full availability of your preferred date, location, and add-ons. During peak season — December through April — booking 8–10 weeks ahead is strongly advised.",
    answerEs:
      "Recomendamos reservar con al menos 4 a 6 semanas de anticipación para garantizar disponibilidad en la fecha, ubicación y servicios adicionales de tu preferencia. En temporada alta — de diciembre a abril — se aconseja reservar con 8 a 10 semanas de anticipación.",
  },
  {
    id: "booking-2",
    category: "booking",
    questionEn: "Can I make changes to my booking after confirming?",
    questionEs: "¿Puedo hacer cambios a mi reserva después de confirmar?",
    answerEn:
      "Yes. You may request changes up to 14 days before your proposal date at no extra charge, subject to availability. Changes requested within 14 days may incur a modification fee depending on the nature of the adjustment.",
    answerEs:
      "Sí. Puedes solicitar cambios hasta 14 días antes de tu propuesta sin costo adicional, sujeto a disponibilidad. Los cambios solicitados dentro de ese plazo pueden generar un cargo por modificación según el tipo de ajuste.",
  },
  {
    id: "booking-3",
    category: "booking",
    questionEn: "What if I need to cancel my reservation?",
    questionEs: "¿Qué sucede si necesito cancelar mi reserva?",
    answerEn:
      "Cancellations made 30 or more days before the event receive a full refund minus the deposit. Cancellations within 15–29 days receive a 50% refund. Cancellations within 14 days of the event are non-refundable. We strongly recommend travel insurance.",
    answerEs:
      "Las cancelaciones realizadas con 30 días o más de anticipación reciben reembolso completo menos el depósito. Entre 15 y 29 días antes del evento, el reembolso es del 50%. Las cancelaciones dentro de los 14 días previos al evento no son reembolsables. Recomendamos contratar un seguro de viaje.",
  },

  // Packages & Inclusions
  {
    id: "packages-1",
    category: "packages",
    questionEn: "What is included in the Classic Proposal package?",
    questionEs: "¿Qué incluye el paquete Classic Proposal?",
    answerEn:
      "The Classic Proposal includes a curated beach or garden setup with floral arrangements, candles, and a champagne toast for two. A professional photographer is included for up to 60 minutes of coverage, and a personal coordinator is on-site to manage every detail.",
    answerEs:
      "El Classic Proposal incluye una ambientación en playa o jardín con arreglos florales, velas y un brindis de champán para dos. Se incluye un fotógrafo profesional por hasta 60 minutos y un coordinador personal presente para gestionar cada detalle.",
  },
  {
    id: "packages-2",
    category: "packages",
    questionEn: "What makes the Modern Proposal different?",
    questionEs: "¿En qué se diferencia el Modern Proposal?",
    answerEn:
      "The Modern Proposal features a contemporary aesthetic — clean lines, minimalist décor, and premium lighting — ideal for rooftop or sunset locations. It includes extended photographer coverage (90 minutes), a short highlight video, and a private butler for the evening.",
    answerEs:
      "El Modern Proposal presenta una estética contemporánea — líneas limpias, decoración minimalista e iluminación premium — ideal para terrazas o atardeceres. Incluye cobertura fotográfica extendida (90 minutos), un video destacado y un mayordomo privado para la velada.",
  },
  {
    id: "packages-3",
    category: "packages",
    questionEn: "What does the Dining Proposal include?",
    questionEs: "¿Qué incluye el Dining Proposal?",
    answerEn:
      "The Dining Proposal is a fully private dining experience at a premium restaurant or exclusive beach table. It includes a personalized menu, wine pairing, floral centerpiece, ambient music, and a photographer for the proposal moment.",
    answerEs:
      "El Dining Proposal es una experiencia gastronómica completamente privada en un restaurante de lujo o mesa exclusiva en la playa. Incluye menú personalizado, maridaje de vinos, centro floral, música de ambiente y un fotógrafo para el momento de la propuesta.",
  },

  // Logistics & Location
  {
    id: "logistics-1",
    category: "logistics",
    questionEn: "Where exactly in Punta Cana do proposals take place?",
    questionEs: "¿Dónde exactamente en Punta Cana se realizan las propuestas?",
    answerEn:
      "We operate across multiple premium locations in the Punta Cana and Bávaro area, including private beaches, luxury resort grounds, scenic rooftops, and exclusive restaurant settings. The exact location is confirmed during your planning consultation based on your package and preferences.",
    answerEs:
      "Operamos en múltiples ubicaciones premium en la zona de Punta Cana y Bávaro, incluyendo playas privadas, instalaciones de resorts de lujo, terrazas panorámicas y restaurantes exclusivos. La ubicación exacta se confirma durante la consulta de planificación.",
  },
  {
    id: "logistics-2",
    category: "logistics",
    questionEn: "Do I need to be staying at a specific resort to book?",
    questionEs: "¿Debo estar hospedado en un resort específico para reservar?",
    answerEn:
      "No. Our services are available to all visitors in the Punta Cana area regardless of where you are staying. We coordinate logistics directly with the venue and handle all necessary arrangements on your behalf.",
    answerEs:
      "No. Nuestros servicios están disponibles para todos los visitantes de la zona de Punta Cana, independientemente de dónde se hospeden. Coordinamos la logística directamente con el lugar y gestionamos todos los arreglos necesarios.",
  },
  {
    id: "logistics-3",
    category: "logistics",
    questionEn: "What happens if it rains on the day of my proposal?",
    questionEs: "¿Qué pasa si llueve el día de mi propuesta?",
    answerEn:
      "We monitor weather conditions closely and have contingency plans for every setup. In the event of rain, we will offer a same-day relocation to a covered indoor alternative, or reschedule to the next available date at no additional cost.",
    answerEs:
      "Monitoreamos las condiciones climáticas de cerca y contamos con planes de contingencia para cada ambientación. En caso de lluvia, ofreceremos una reubicación el mismo día a una alternativa cubierta, o reprogramaremos para la próxima fecha disponible sin costo adicional.",
  },

  // Payment & Pricing
  {
    id: "payment-1",
    category: "payment",
    questionEn: "How does the payment process work?",
    questionEs: "¿Cómo funciona el proceso de pago?",
    answerEn:
      "A 50% deposit is required at the time of booking to secure your date. The remaining balance is due 7 days before your event. All payments are processed securely online via credit card or bank transfer.",
    answerEs:
      "Se requiere un depósito del 50% al momento de la reserva para asegurar tu fecha. El saldo restante vence 7 días antes del evento. Todos los pagos se procesan de forma segura en línea mediante tarjeta de crédito o transferencia bancaria.",
  },
  {
    id: "payment-2",
    category: "payment",
    questionEn: "Are there any hidden fees I should be aware of?",
    questionEs: "¿Existen cargos ocultos que deba conocer?",
    answerEn:
      "No. The price quoted during booking is all-inclusive for your selected package. Any optional add-ons are presented transparently during planning, and you choose what to include. There are no surprise charges.",
    answerEs:
      "No. El precio cotizado durante la reserva es todo incluido para el paquete seleccionado. Cualquier servicio adicional opcional se presenta de forma transparente durante la planificación. No hay sorpresas.",
  },
  {
    id: "payment-3",
    category: "payment",
    questionEn: "Do you offer payment plans?",
    questionEs: "¿Ofrecen planes de pago?",
    answerEn:
      "Yes. For packages above a certain value, we can arrange a structured payment plan. Please contact us directly to discuss your situation and we will do our best to accommodate you.",
    answerEs:
      "Sí. Para paquetes a partir de cierto valor, podemos acordar un plan de pago estructurado. Contáctanos directamente para conversar sobre tu situación.",
  },

  // Customization
  {
    id: "customization-1",
    category: "customization",
    questionEn: "Can I customize the décor and color palette?",
    questionEs: "¿Puedo personalizar la decoración y la paleta de colores?",
    answerEn:
      "Absolutely. Every element of the setup — florals, candles, linens, signage, and lighting — can be tailored to your vision. During your planning consultation, our coordinator will walk you through options and help you create a look that reflects your relationship.",
    answerEs:
      "Por supuesto. Cada elemento de la ambientación — florería, velas, manteles, letreros e iluminación — puede adaptarse a tu visión. Durante la consulta, nuestro coordinador te mostrará las opciones y te ayudará a crear un estilo que refleje vuestra relación.",
  },
  {
    id: "customization-2",
    category: "customization",
    questionEn: "Can I add a live musician or special entertainment?",
    questionEs:
      "¿Puedo agregar un músico en vivo u otro entretenimiento especial?",
    answerEn:
      "Yes. We can arrange live acoustic guitar, violin, saxophone, or a small ensemble as part of your setup. Fireworks, mariachi, and other entertainment are also available as premium add-ons depending on the location.",
    answerEs:
      "Sí. Podemos organizar guitarra acústica en vivo, violín, saxofón o un pequeño conjunto musical. Fuegos artificiales, mariachi y otros entretenimientos también están disponibles como servicios premium adicionales según la ubicación.",
  },
  {
    id: "customization-3",
    category: "customization",
    questionEn:
      "Can you incorporate a personal detail like our initials or anniversary date?",
    questionEs:
      "¿Pueden incorporar un detalle personal como nuestras iniciales o fecha de aniversario?",
    answerEn:
      "Of course. Many clients request custom signage, monogrammed details, rose petal arrangements spelling initials, or specific flowers with personal significance. Share your ideas during consultation and our team will make it happen.",
    answerEs:
      "Por supuesto. Muchos clientes solicitan letreros personalizados, iniciales en los arreglos, pétalos de rosa formando letras o flores con un significado especial. Comparte tus ideas en la consulta y nuestro equipo lo hará realidad.",
  },

  // Photos & Media
  {
    id: "photos-1",
    category: "photos",
    questionEn: "Are photos delivered in color and black & white?",
    questionEs: "¿Las fotos se entregan en color y en blanco y negro?",
    answerEn:
      "Yes. Your edited gallery includes a curated selection in both color and black & white. The photographer applies professional retouching to ensure every image meets a premium standard before delivery.",
    answerEs:
      "Sí. Tu galería editada incluye una selección curada en color y en blanco y negro. El fotógrafo aplica retoque profesional para garantizar que cada imagen cumpla un estándar premium antes de la entrega.",
  },
  {
    id: "photos-2",
    category: "photos",
    questionEn: "How long does it take to receive the photos?",
    questionEs: "¿Cuánto tiempo tarda en recibir las fotos?",
    answerEn:
      "Edited photos are delivered within 7–10 business days via a private online gallery. You will receive a download link to access and share your full gallery. Rush delivery within 48 hours is available as a paid add-on.",
    answerEs:
      "Las fotos editadas se entregan en un plazo de 7 a 10 días hábiles a través de una galería privada en línea. Recibirás un enlace de descarga para acceder y compartir tu galería completa. La entrega urgente en 48 horas está disponible como servicio adicional.",
  },
  {
    id: "photos-3",
    category: "photos",
    questionEn: "Is video coverage available?",
    questionEs: "¿Está disponible la cobertura en video?",
    answerEn:
      "Yes. A short cinematic highlight video (2–3 minutes) is included in select packages and available as an add-on for others. Longer documentary-style films and drone footage are also available — ask during your consultation.",
    answerEs:
      "Sí. Un video cinematográfico de resumen (2 a 3 minutos) está incluido en algunos paquetes y disponible como servicio adicional en otros. También se pueden contratar videos estilo documental o cobertura con dron — consúltanos durante la planificación.",
  },
];
