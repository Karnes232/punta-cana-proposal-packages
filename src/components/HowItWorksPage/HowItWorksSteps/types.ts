// ─── Step data type ───────────────────────────────────────────────────────────

export interface Step {
  number: string; // "01" – "05"
  label: string; // eyebrow tag
  title: string;
  description: string;
}

// ─── Bilingual content ────────────────────────────────────────────────────────

export const stepsContent = {
  en: {
    eyebrow: "Step by Step",
    heading: "Everything Taken",
    headingAccent: "Care Of",
    subheading:
      "A seamless journey from first click to the moment she says yes.",
    steps: [
      {
        number: "01",
        label: "Choose",
        title: "Browse & Choose Your Package",
        description:
          "Explore our curated collection of Classic, Modern, and Dining proposal packages. Each one has been designed to feel intimate, exclusive, and completely unforgettable.",
      },
      {
        number: "02",
        label: "Connect",
        title: "Reach Out & Share Your Vision",
        description:
          "Contact us via the booking form or WhatsApp. We'll confirm your date, walk you through personalisation options, and answer every question you have.",
      },
      {
        number: "03",
        label: "Confirm",
        title: "Secure Your Date with a Deposit",
        description:
          "A simple deposit locks in your reservation. The remaining balance is settled closer to the date. All payments are handled securely and with full transparency.",
      },
      {
        number: "04",
        label: "Relax",
        title: "We Handle Every Detail",
        description:
          "Our team sets up the full décor, coordinates photography, and manages all logistics on the ground. You don't lift a finger — just arrive and be present.",
      },
      {
        number: "05",
        label: "The Moment",
        title: "Live the Proposal",
        description:
          "This is your moment. Every second is captured by our professional photographer. You'll receive your full gallery within days, ready to share forever.",
      },
    ] as Step[],
  },
  es: {
    eyebrow: "Paso a Paso",
    heading: "Todo Está",
    headingAccent: "Bajo Control",
    subheading:
      "Un camino sin complicaciones desde el primer mensaje hasta el sí.",
    steps: [
      {
        number: "01",
        label: "Elige",
        title: "Explora y Elige tu Paquete",
        description:
          "Descubre nuestra colección de paquetes Clásicos, Modernos y de Cena. Cada uno ha sido diseñado para ser íntimo, exclusivo e inolvidable.",
      },
      {
        number: "02",
        label: "Conéctate",
        title: "Escríbenos y Cuéntanos tu Visión",
        description:
          "Contáctanos por el formulario o por WhatsApp. Confirmamos tu fecha, te explicamos las opciones de personalización y respondemos todas tus preguntas.",
      },
      {
        number: "03",
        label: "Confirma",
        title: "Asegura tu Fecha con un Depósito",
        description:
          "Un depósito sencillo bloquea tu reserva. El saldo restante se paga más cerca de la fecha. Todos los pagos son seguros y completamente transparentes.",
      },
      {
        number: "04",
        label: "Relájate",
        title: "Nosotros Nos Encargamos de Todo",
        description:
          "Nuestro equipo instala la decoración, coordina la fotografía y gestiona toda la logística. Tú solo tienes que llegar y vivirlo.",
      },
      {
        number: "05",
        label: "El Momento",
        title: "Vive la Propuesta",
        description:
          "Este es tu momento. Cada segundo queda capturado por nuestro fotógrafo profesional. Recibirás tu galería completa en pocos días, lista para compartir siempre.",
      },
    ] as Step[],
  },
} as const;
