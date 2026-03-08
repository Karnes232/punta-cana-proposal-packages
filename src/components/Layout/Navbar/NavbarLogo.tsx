import Image from "next/image";
import Link from "next/link";

interface NavbarLogoProps {
  logo: {
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
}

export default function NavbarLogo({ logo }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Punta Cana Proposal Packages — Home"
      className="flex items-center gap-3 shrink-0"
    >
      {logo ? (
        <Image
          src={logo.asset.url}
          alt={logo.alt}
          width={100}
          height={100}
          className="h-20 w-auto object-contain brightness-110"
          priority
          quality={100}
        />
      ) : (
        /* Text fallback if no logo asset is available */
        <div className="flex flex-col leading-none">
          <span className="font-display italic text-xl text-gold tracking-tight">
            Punta Cana
          </span>
          <span className="font-body text-[8.5px] font-light tracking-[0.22em] uppercase text-gold/60 mt-0.5">
            Proposal Packages
          </span>
        </div>
      )}
    </Link>
  );
}
