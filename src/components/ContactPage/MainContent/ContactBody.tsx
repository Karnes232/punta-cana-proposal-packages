import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import { CONTACT_LABELS } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ContactBodyProps {
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactBody({ locale }: ContactBodyProps) {
  const labels = CONTACT_LABELS[locale];

  return (
    <section className="bg-[#F7F5F1] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-20">
          {/* ── Left column — Form ──────────────────────────────── */}
          <div>
            <RevealOnScroll>
              {/* Form section heading */}
              <div className="flex flex-col gap-4 mb-10">
                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <span
                    className="block w-8 h-px bg-gold/60"
                    aria-hidden="true"
                  />
                  <p className="text-[10.5px] font-body font-light tracking-[0.28em] uppercase text-gold/80">
                    {labels.formEyebrow}
                  </p>
                </div>

                {/* Heading */}
                <h2 className="font-display font-normal text-[clamp(28px,3.5vw,44px)] leading-[1.1] tracking-tight">
                  <span className="block text-black">
                    {labels.formHeading.split(" ").slice(0, -2).join(" ")}
                  </span>
                  <span className="block italic text-gold">
                    {labels.formHeading.split(" ").slice(-2).join(" ")}
                  </span>
                </h2>

                {/* Diamond divider */}
                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="block w-10 h-px bg-gold/30" />
                  <span className="block w-1 h-1 rotate-45 bg-gold/50" />
                  <span className="block w-10 h-px bg-gold/30" />
                </div>
              </div>
            </RevealOnScroll>

            {/* ContactForm is a client component — sits inside a server wrapper */}
            <ContactForm locale={locale} labels={labels} />
          </div>

          {/* ── Right column — Sidebar ───────────────────────────── */}
          <RevealOnScroll delay={150}>
            <ContactSidebar labels={labels} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
