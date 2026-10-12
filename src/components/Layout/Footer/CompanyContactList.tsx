import type { IconType } from "react-icons";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { dialNumber, formatPhone, isProfileLink } from "./contact";

// The social links shown, by their Business info field.
const socialNetworks: Record<string, { name: string; icon?: IconType }> = {
  instagram: { name: "Instagram", icon: FiInstagram },
  facebook: { name: "Facebook", icon: FiFacebook },
  MessengerURL: { name: "Messenger", icon: FiMessageCircle },
  xURL: { name: "X" },
};

const icon = "shrink-0 text-gold";

/**
 * The company's phone, email, WhatsApp and the social profiles that are
 * set, one link per line. Used by the footer and the contact page.
 */
export default function CompanyContactList({
  company,
  linkClass,
}: {
  company: GeneralLayout | null;
  linkClass: string;
}) {
  const socials = Object.entries(company?.socialLinks || {}).filter(
    ([network, url]) => socialNetworks[network] && isProfileLink(url),
  );
  const whatsapp = company?.whatsapp?.replace(/\D/g, "");

  return (
    <ul>
      {company?.telephone && (
        <li>
          <a
            href={`tel:${dialNumber(company.telephone)}`}
            className={linkClass}
          >
            <FiPhone aria-hidden className={icon} />
            {formatPhone(company.telephone)}
          </a>
        </li>
      )}
      {company?.email && (
        <li>
          <a
            href={`mailto:${company.email}`}
            className={`${linkClass} max-w-full [overflow-wrap:anywhere]`}
          >
            <FiMail aria-hidden className={icon} />
            {company.email}
          </a>
        </li>
      )}
      {whatsapp && (
        <li>
          <a
            href={`https://wa.me/${whatsapp}`}
            rel="noopener noreferrer"
            target="_blank"
            className={linkClass}
          >
            <FiMessageCircle aria-hidden className={icon} />
            WhatsApp
          </a>
        </li>
      )}
      {socials.map(([network, url]) => {
        const { name, icon: Icon } = socialNetworks[network];
        return (
          <li key={network}>
            <a
              href={url}
              rel="noopener noreferrer"
              target="_blank"
              className={linkClass}
            >
              {Icon && <Icon aria-hidden className={icon} />}
              {name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
