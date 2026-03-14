// Server Component
// PortableText renderer for Sanity block content.
// Supports bilingual content via { en: [], es: [] } shape.

import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

import TextComponentParagraph from "./TextComponentParagraph";
import TextComponentHeading from "./TextComponentHeading";
import TextComponentList from "./TextComponentList";

interface LocaleBlockContent {
  _type: string;
  en: any[];
  es: any[];
}

interface Props {
  content: LocaleBlockContent;
  language?: "en" | "es";
}

const builder = imageUrlBuilder(client);

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = builder.image(value).url();
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden border border-gold/15">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              width={1200}
              height={800}
              className="w-full object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-body text-[12px] font-light tracking-[0.08em] text-black/40 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        rel="noopener noreferrer"
        className="
          text-black underline decoration-gold/50 underline-offset-4
          transition-colors duration-300
          hover:decoration-gold
        "
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-medium text-black">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="font-display italic text-black/70 not-italic">
        {children}
      </em>
    ),
  },

  block: {
    normal: ({ children }: any) => (
      <TextComponentParagraph paragraph={children} ParagraphClassName="mb-6" />
    ),
    h1: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h1"
        HeadingClassName="mt-12 mb-2"
      />
    ),
    h2: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h2"
        HeadingClassName="mt-10 mb-2"
      />
    ),
    h3: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h3"
        HeadingClassName="mt-8 mb-2"
      />
    ),
    h4: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h4"
        HeadingClassName="mt-6 mb-2"
      />
    ),
    h5: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h5"
        HeadingClassName="mt-6 mb-2"
      />
    ),
    h6: ({ children }: any) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h6"
        HeadingClassName="mt-4 mb-2"
      />
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="relative my-8 pl-6 border-l border-gold/40">
        <span
          className="absolute -top-3 -left-1 font-display text-5xl leading-none text-gold/15 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="font-display italic text-black/60 text-[clamp(16px,1.8vw,20px)] leading-[1.7]">
          {children}
        </p>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <TextComponentList
        items={children}
        listType="bullet"
        ListClassName="my-6"
      />
    ),
    number: ({ children }: any) => (
      <TextComponentList
        items={children}
        listType="number"
        ListClassName="my-6"
      />
    ),
  },
};

const BlockContent: React.FC<Props> = ({ content, language = "en" }) => {
  if (!content || !content[language]) return null;

  return (
    <div className="max-w-[720px] mx-auto">
      <PortableText value={content[language]} components={components} />
    </div>
  );
};

export default BlockContent;
