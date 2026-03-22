import { useTranslations } from "next-intl";
import ContactDirectCard from "./ContactDirectCard";
import ContactLocationCard from "./ContactLocationCard";

// ─── Brand contact details — update to real values ────────────────────────────
const WHATSAPP_NUMBER = "+18091234567"; // TODO: replace
const EMAIL_ADDRESS = "hello@puntacanaproposalpackages.com"; // TODO: replace

/** NANP-style display (+1 and 10-digit); otherwise returns trimmed raw string. */
function formatPhoneForDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    const area = digits.slice(1, 4);
    const mid = digits.slice(4, 7);
    const line = digits.slice(7, 11);
    return `+1 (${area}) ${mid}-${line}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw.trim();
}

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
  email: string;
  telephone: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactSidebar({
  email,
  telephone,
}: ContactSidebarProps) {
  const t = useTranslations("ContactPageForm");
  return (
    <aside className="flex flex-col gap-6 pt-1">
      {/* Eyebrow */}
      <p className="text-[10.5px] font-body font-medium tracking-[0.14em] uppercase text-black/40">
        {t("contactEyebrow")}
      </p>

      {/* Direct contact cards */}
      <div className="flex flex-col gap-3">
        <ContactDirectCard
          label={formatPhoneForDisplay(telephone)}
          sub={t("whatsappSub")}
          href={`https://wa.me/${telephone.replace(/\D/g, "")}`}
          icon={<WhatsAppIcon />}
          labelClassName="tabular-nums"
        />
        <ContactDirectCard
          label={email}
          sub={t("emailContactSub")}
          href={`mailto:${email}`}
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
        label={t("locationLabel")}
        city={t("locationCity")}
        detail={t("locationDetail")}
      />
    </aside>
  );
}
