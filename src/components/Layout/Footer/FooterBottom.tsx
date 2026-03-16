import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import BuiltBy from "./BuiltBy";

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
  const locale = useLocale();

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
      <BuiltBy />
    </div>
  );
}
