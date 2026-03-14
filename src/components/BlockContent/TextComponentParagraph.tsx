// Server Component
// Body paragraph for PortableText content — Inter, gray text, generous line height.

import React from "react";

const TextComponentParagraph = ({
  paragraph,
  ParagraphClassName = "",
}: {
  paragraph: React.ReactNode;
  ParagraphClassName?: string;
}) => {
  return (
    <p
      className={`
        font-body font-light text-gray
        text-[clamp(14px,1.4vw,16px)] leading-[1.9]
        ${ParagraphClassName}
      `}
    >
      {paragraph}
    </p>
  );
};

export default TextComponentParagraph;
