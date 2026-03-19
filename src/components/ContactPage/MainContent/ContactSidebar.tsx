import ContactDirectCard from "./ContactDirectCard";
import ContactLocationCard from "./ContactLocationCard";
import { ContactLabels } from "./types";

// ─── Brand contact details — update to real values ────────────────────────────
const WHATSAPP_NUMBER = "+18091234567"; // TODO: replace
const EMAIL_ADDRESS = "hello@puntacanaproposalpackages.com"; // TODO: replace

// WhatsApp icon
function WhatsAppIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CFAE70"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

// Email icon
function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CFAE70"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ContactSidebarProps {
  labels: ContactLabels;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactSidebar({ labels }: ContactSidebarProps) {
  return (
    <aside className="flex flex-col gap-6 pt-1">
      {/* Eyebrow */}
      <p className="text-[10.5px] font-body font-medium tracking-[0.14em] uppercase text-black/40">
        {labels.contactEyebrow}
      </p>

      {/* Direct contact cards */}
      <div className="flex flex-col gap-3">
        <ContactDirectCard
          label={WHATSAPP_NUMBER}
          sub={labels.whatsappSub}
          href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
          icon={<WhatsAppIcon />}
        />
        <ContactDirectCard
          label={EMAIL_ADDRESS}
          sub={labels.emailContactSub}
          href={`mailto:${EMAIL_ADDRESS}`}
          icon={<EmailIcon />}
        />
      </div>

      {/* Gold divider */}
      <div
        className="h-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, rgba(207,174,112,0.3), transparent)",
        }}
      />

      {/* Location card */}
      <ContactLocationCard
        label={labels.locationLabel}
        city={labels.locationCity}
        detail={labels.locationDetail}
        mapsLink={labels.mapsLink}
      />
    </aside>
  );
}
