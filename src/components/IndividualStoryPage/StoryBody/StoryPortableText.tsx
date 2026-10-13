import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-[17px] leading-[1.8] text-[#3f3f44] last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-display text-[2rem] leading-[1.25] font-normal text-balance text-black">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 font-display text-[1.5rem] leading-[1.3] font-normal text-balance text-black">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 font-display text-[1.3rem] leading-[1.6] text-black italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-black">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-black underline decoration-gold underline-offset-4 transition-colors duration-200 hover:text-[#9b773d]"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 mb-6 pl-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-[17px] leading-[1.8] text-[#3f3f44]">
        <span
          className="mt-3 block size-1.5 shrink-0 rounded-full bg-gold"
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[17px] leading-[1.8] text-[#3f3f44]">{children}</li>
    ),
  },
};

interface StoryPortableTextProps {
  body: PortableTextBlock[];
}

export default function StoryPortableText({ body }: StoryPortableTextProps) {
  return (
    <div>
      <PortableText value={body} components={components} />
    </div>
  );
}
