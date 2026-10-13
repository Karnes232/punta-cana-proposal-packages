import type { ReactNode } from "react";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";

interface MoreSectionProps {
  label: string;
  heading: string;
  headingAccent: string;
  children: ReactNode;
}

/** The "more posts / more stories" band at the end of a blog post or story. */
export default function MoreSection({
  label,
  heading,
  headingAccent,
  children,
}: MoreSectionProps) {
  return (
    <section className="border-t border-black/10 bg-ivory">
      <div className="mx-auto max-w-site px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-col gap-4">
          <div className="flex items-center gap-5">
            <p className={`${eyebrowClass()} shrink-0`}>{label}</p>
            <span
              aria-hidden="true"
              className="block h-px flex-1 bg-black/10"
            />
          </div>
          {/* The accent is the darker gold: #CFAE70 fails 3:1 on ivory. */}
          <h2 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.15] font-normal text-balance text-black">
            {heading} <span className="text-[#9b773d]">{headingAccent}</span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
