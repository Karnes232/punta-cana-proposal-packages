// Server Component
// Headings for PortableText content — Playfair Display, black text.
// Used inside BlockContent on ivory/white backgrounds.

import React from "react";

const sizeMap: Record<string, string> = {
  h1: "text-[clamp(32px,4vw,52px)]",
  h2: "text-[clamp(26px,3vw,40px)]",
  h3: "text-[clamp(22px,2.5vw,32px)]",
  h4: "text-[clamp(18px,2vw,26px)]",
  h5: "text-[clamp(16px,1.8vw,22px)]",
  h6: "text-[clamp(14px,1.6vw,18px)]",
};

const TextComponentHeading = ({
  heading,
  headingNumber,
  HeadingClassName = "",
}: {
  heading: React.ReactNode;
  headingNumber: string;
  HeadingClassName?: string;
}) => {
  const sizeClass = sizeMap[headingNumber] ?? sizeMap.h2;

  const sharedClass = `
    font-display italic font-normal text-black
    leading-[1.2] tracking-[-0.01em]
    ${sizeClass} ${HeadingClassName}
  `;

  // Gold ornament line sits below each heading
  const ornament = (
    <span className="block w-8 h-px bg-gold/50 mt-3 mb-6" aria-hidden="true" />
  );

  const content = (
    <>
      {heading}
      {ornament}
    </>
  );

  switch (headingNumber) {
    case "h1":
      return <h1 className={sharedClass}>{content}</h1>;
    case "h2":
      return <h2 className={sharedClass}>{content}</h2>;
    case "h3":
      return <h3 className={sharedClass}>{content}</h3>;
    case "h4":
      return <h4 className={sharedClass}>{content}</h4>;
    case "h5":
      return <h5 className={sharedClass}>{content}</h5>;
    case "h6":
      return <h6 className={sharedClass}>{content}</h6>;
    default:
      return <h2 className={sharedClass}>{content}</h2>;
  }
};

export default TextComponentHeading;
