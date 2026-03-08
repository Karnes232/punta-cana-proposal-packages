import { LuMapPin, LuPhone } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";

/** Format phone for display: +1 (809) 000-0000. Leaves input unchanged if it looks already formatted. */
function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length >= 10) {
    return `+${digits.slice(0, digits.length - 10)} (${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(-4)}`;
  }
  return phone;
}

/** Normalize for tel: href (digits only, optional leading +). */
function formatPhoneHref(phone: string): string {
  const hasPlus = phone.trimStart().startsWith("+");
  const digits = phone.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

interface FooterContactProps {
  title?: string;
  phone?: string;
  email?: string;
  location?: string;
}

interface ContactItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ContactItem({ icon, children }: ContactItemProps) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span className="text-gold mt-0.5 shrink-0 w-4 h-4">{icon}</span>
      <span className="text-[13px] font-light text-white/55 leading-relaxed">
        {children}
      </span>
    </div>
  );
}

export default function FooterContact({
  title,
  phone = "+1 (809) 000-0000",
  email = "hello@puntacanaproposal.com",
  location = "Punta Cana, Dominican Republic",
}: FooterContactProps) {
  return (
    <div className="flex flex-col">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
        {title}
      </p>

      <ContactItem icon={<LuPhone />}>
        <a
          href={`tel:${formatPhoneHref(phone)}`}
          className="hover:text-gold transition-colors duration-300"
        >
          {formatPhoneDisplay(phone)}
        </a>
      </ContactItem>

      <ContactItem icon={<FaRegEnvelope />}>
        <a
          href={`mailto:${email}`}
          className="hover:text-gold transition-colors duration-300"
        >
          {email}
        </a>
      </ContactItem>

      <ContactItem icon={<LuMapPin />}>{location}</ContactItem>
    </div>
  );
}
