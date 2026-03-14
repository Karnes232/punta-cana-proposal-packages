import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface FooterBottomProps {
  companyName?: string;
  allRightsReserved?: string;
  legalLinks: { label: string; href: string }[];
}

export default function FooterBottom({
  companyName = "Punta Cana Proposal Packages",
  allRightsReserved = "All rights reserved",
  legalLinks,
}: FooterBottomProps) {
  const year = new Date().getFullYear();
  const t = useTranslations("Footer");
  return (
    <div className="pb-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11.5px] font-light text-white/30 tracking-[0.04em]">
          © {year} {companyName}. {allRightsReserved}.
        </p>
        <div className="flex gap-6">
          {legalLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[11.5px] font-light text-white/30 tracking-[0.04em] transition-colors duration-300 hover:text-gold"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mt-4">
        <p className="text-[11.5px] font-light text-white/30 tracking-[0.04em] flex items-center gap-2 flex-1 justify-center md:justify-end md:mr-8">
          {t("builtBy")}
          <a
            href="https://dr-webstudio.com"
            className="flex items-center gap-1 text-[11.5px] font-light text-white/30 tracking-[0.04em] hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            <Image
              src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
              alt="DR Web Studio"
              width={17}
              height={16}
              className="h-4"
              loading="lazy"
            />
            DR Web Studio
          </a>
        </p>
      </div>
    </div>
  );
}
