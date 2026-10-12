// Server Component
// Body paragraph for PortableText content: Inter, dark gray, easy line height.

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
        font-body text-[#3f3f44] text-pretty
        text-[16px] lg:text-[17px] leading-[1.75]
        ${ParagraphClassName}
      `}
    >
      {paragraph}
    </p>
  );
};

export default TextComponentParagraph;
