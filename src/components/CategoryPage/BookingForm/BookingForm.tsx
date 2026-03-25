import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookingFormClient from "./BookingFormClient";

interface BookingFormProps {
  locale?: string;
}

const content: Record<
  string,
  {
    eyebrow: string;
    line1: string;
    line2: string;
    description: string;
    heading: string;
    subheading: string;
    name: string;
    hotel: string;
    phone: string;
    email: string;
    date: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    summaryPackage: string;
    summaryTier: string;
    summaryColor: string;
    summaryFloral: string;
    summaryTone: string;
    summaryEstimated: string;
    summaryNoPackage: string;
    summaryStandard: string;
    summaryPremium: string;
    summaryNotSelected: string;
  }
> = {
  en: {
    eyebrow: "Book Your Proposal",
    line1: "Ready to",
    line2: "Begin?",
    description:
      "Fill out the form below and we'll get back to you within 24 hours.",
    heading: "Ready to Begin?",
    subheading:
      "Fill out the form below and we'll get back to you within 24 hours.",
    name: "Full Name",
    hotel: "Hotel / Resort",
    phone: "Phone Number",
    email: "Email Address",
    date: "Proposal Date",
    notes: "Anything else you'd like us to know?",
    notesPlaceholder: "Special requests, timing preferences, surprises…",
    submit: "Submit Booking Request",
    submitting: "Sending…",
    successTitle: "Thank You!",
    successMessage:
      "We've received your request and will be in touch within 24 hours to start planning your perfect moment.",
    summaryPackage: "Package",
    summaryTier: "Tier",
    summaryColor: "Color",
    summaryFloral: "Floral",
    summaryTone: "Tone",
    summaryEstimated: "Estimated Total",
    summaryNoPackage: "No package selected",
    summaryStandard: "Standard",
    summaryPremium: "Premium",
    summaryNotSelected: "Not selected",
  },
  es: {
    eyebrow: "Reserva Tu Propuesta",
    line1: "¿Listo para",
    line2: "Comenzar?",
    description:
      "Completa el formulario y te responderemos en menos de 24 horas.",
    heading: "¿Listo para Comenzar?",
    subheading:
      "Completa el formulario y te responderemos en menos de 24 horas.",
    name: "Nombre Completo",
    hotel: "Hotel / Resort",
    phone: "Número de Teléfono",
    email: "Correo Electrónico",
    date: "Fecha de la Propuesta",
    notes: "¿Algo más que quieras contarnos?",
    notesPlaceholder:
      "Solicitudes especiales, preferencias de horario, sorpresas…",
    submit: "Enviar Solicitud de Reserva",
    submitting: "Enviando…",
    successTitle: "¡Gracias!",
    successMessage:
      "Hemos recibido tu solicitud y nos pondremos en contacto en menos de 24 horas para comenzar a planificar tu momento perfecto.",
    summaryPackage: "Paquete",
    summaryTier: "Nivel",
    summaryColor: "Color",
    summaryFloral: "Floral",
    summaryTone: "Tono",
    summaryEstimated: "Total Estimado",
    summaryNoPackage: "Ningún paquete seleccionado",
    summaryStandard: "Estándar",
    summaryPremium: "Premium",
    summaryNotSelected: "No seleccionado",
  },
};

export default function BookingForm({ locale = "en" }: BookingFormProps) {
  const t = content[locale] ?? content.en;

  return (
    <section
      id="booking"
      className="relative bg-black overflow-hidden"
      aria-label={t.heading}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(207,174,112,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[640px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        {/* Section header */}
        <div className="flex flex-col items-center gap-5 mb-12 lg:mb-14">
          <RevealOnScroll delay={0}>
            <div className="flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
              <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
                {t.eyebrow}
              </p>
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h2 className="font-display font-normal text-center leading-[1.1] tracking-tight text-[clamp(28px,3.5vw,48px)]">
              <span className="block text-white">{t.line1}</span>
              <span className="block italic text-gold">{t.line2}</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div
              className="flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="block w-12 h-px bg-gold/30" />
              <span className="block w-1 h-1 rotate-45 bg-gold/50" />
              <span className="block w-12 h-px bg-gold/30" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={250}>
            <p className="text-center font-light text-white/55 leading-[1.85] text-[clamp(14px,1.5vw,17px)] max-w-[520px] mx-auto">
              {t.description}
            </p>
          </RevealOnScroll>
        </div>

        {/* Form */}
        <RevealOnScroll delay={350}>
          <BookingFormClient
            labels={{
              heading: t.heading,
              subheading: t.subheading,
              name: t.name,
              hotel: t.hotel,
              phone: t.phone,
              email: t.email,
              date: t.date,
              notes: t.notes,
              notesPlaceholder: t.notesPlaceholder,
              submit: t.submit,
              submitting: t.submitting,
              successTitle: t.successTitle,
              successMessage: t.successMessage,
              summaryPackage: t.summaryPackage,
              summaryTier: t.summaryTier,
              summaryColor: t.summaryColor,
              summaryFloral: t.summaryFloral,
              summaryTone: t.summaryTone,
              summaryEstimated: t.summaryEstimated,
              summaryNoPackage: t.summaryNoPackage,
              summaryStandard: t.summaryStandard,
              summaryPremium: t.summaryPremium,
              summaryNotSelected: t.summaryNotSelected,
            }}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
