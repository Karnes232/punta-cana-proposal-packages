import { useTranslations } from "next-intl";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterNavColumn from "./FooterNavColumn";
import FooterSocial from "./FooterSocial";
import FooterBottom from "./FooterBottom";

interface FooterProps {
  companyName?: string;
  logo?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  } | null;
  description?: string;
  telephone?: string;
  email?: string;
  socialLinks?: {
    facebook: string;
    instagram: string;
    xURL: string;
    MessengerURL: string;
  };
  location?: string;
}

export default function Footer({
  logo,
  description,
  socialLinks = { facebook: "", instagram: "", xURL: "", MessengerURL: "" },
  telephone = "",
  email = "",
  companyName = "",
}: FooterProps) {
  const t = useTranslations("Footer");

  const FOOTER_PACKAGE_LINKS: { label: string; href: string }[] = [
    { label: t("classicProposals"), href: "/classic-proposals" },
    { label: t("modernProposals"), href: "/modern-proposals" },
    { label: t("diningProposals"), href: "/dining-proposals" },
    { label: t("adventureProposals"), href: "/adventure-proposals" },
    { label: t("stories"), href: "/stories" },
  ];

  const FOOTER_COMPANY_LINKS: { label: string; href: string }[] = [
    { label: t("howItWorks"), href: "/how-it-works" },
    { label: t("contactUs"), href: "/contact" },
    { label: t("faq"), href: "/faq" },
    { label: t("blog"), href: "/blog" },
  ];

  const FOOTER_LEGAL_LINKS: { label: string; href: string }[] = [
    { label: t("privacyPolicy"), href: "/privacy-policy" },
    { label: t("termsOfService"), href: "/terms-of-service" },
  ];

  return (
    <footer className="bg-black border-t border-gold/15">
      {/* Main content grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Brand + Social */}
          <div>
            <FooterBrand logo={logo} description={description} />
            <FooterSocial links={socialLinks} telephone={telephone} />
          </div>

          {/* Packages column */}
          <FooterNavColumn title={t("packages")} links={FOOTER_PACKAGE_LINKS} />

          {/* Company column */}
          <FooterNavColumn title={t("company")} links={FOOTER_COMPANY_LINKS} />

          {/* Contact column */}
          <FooterContact
            title={t("getInTouch")}
            phone={telephone}
            email={email}
            location={t("location")}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="h-px bg-gold/10" />
      </div>

      {/* Bottom bar */}
      <FooterBottom
        companyName={companyName}
        allRightsReserved={t("allRightsReserved")}
        legalLinks={FOOTER_LEGAL_LINKS}
      />
    </footer>
  );
}
