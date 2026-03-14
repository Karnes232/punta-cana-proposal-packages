import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface FooterBrandProps {
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
}

export default function FooterBrand({
  logo,
  description = "Creating unforgettable proposal experiences in the heart of Punta Cana. Every detail, perfectly curated.",
}: FooterBrandProps) {
  return (
    <div className="flex flex-col">
      <Link
        href="/"
        aria-label="Punta Cana Proposal Packages — Home"
        className="inline-block mb-5"
      >
        {logo ? (
          <Image
            src={logo.asset.url}
            alt={logo.alt}
            width={100}
            height={100}
            className="h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(207,174,112,0.2)]"
          />
        ) : (
          <div className="flex flex-col leading-none">
            <span className="font-display italic text-2xl text-gold tracking-tight">
              Punta Cana
            </span>
            <span className="text-[9px] font-light tracking-[0.22em] uppercase text-gold/55 mt-1">
              Proposal Packages
            </span>
          </div>
        )}
      </Link>

      <p className="text-[13px] font-light leading-[1.85] text-gray max-w-[270px]">
        {description}
      </p>
    </div>
  );
}
