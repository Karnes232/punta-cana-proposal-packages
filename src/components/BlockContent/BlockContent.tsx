// Server Component
// PortableText renderer for the legal pages' Sanity block content.
// Renders one language's content (legal documents are one per language);
// a Heading 2 takes the anchor legalSections() gave it as its id.

import { client } from "@/sanity/lib/client";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

import TextComponentParagraph from "./TextComponentParagraph";
import TextComponentHeading from "./TextComponentHeading";
import TextComponentList from "./TextComponentList";
import type { LegalBlock } from "../LegalPage/legalSections";

type ImageBlock = SanityImageSource & { alt?: string; caption?: string };

interface Props {
  content?: LegalBlock[] | null;
}

const builder = imageUrlBuilder(client);

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      // An image block whose file was never uploaded has nothing to show.
      if (!(value as { asset?: unknown } | undefined)?.asset) return null;
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
            <figcaption className="mt-3 text-center font-body text-[13px] text-[#5c5c61] italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
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
    strong: ({ children }) => (
      <strong className="font-semibold text-black">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },

  block: {
    normal: ({ children }) => (
      <TextComponentParagraph paragraph={children} ParagraphClassName="mb-5" />
    ),
    h1: ({ children }) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h1"
        HeadingClassName="mt-14 mb-4 first:mt-0"
      />
    ),
    h2: ({ children, value }) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h2"
        id={(value as LegalBlock).anchor}
        HeadingClassName="mt-14 mb-4 first:mt-0"
      />
    ),
    h3: ({ children }) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h3"
        HeadingClassName="mt-10 mb-3"
      />
    ),
    h4: ({ children }) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h4"
        HeadingClassName="mt-8 mb-3"
      />
    ),
    h5: ({ children }) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h5"
        HeadingClassName="mt-6 mb-2"
      />
    ),
    h6: ({ children }) => (
      <TextComponentHeading
        heading={children}
        headingNumber="h6"
        HeadingClassName="mt-6 mb-2"
      />
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 bg-gold/[0.08] px-6 py-5">
        <p className="font-display text-[clamp(17px,1.8vw,20px)] leading-[1.6] text-black/80 italic">
          {children}
        </p>
      </blockquote>
    ),
  },

  // TextComponentList puts each item in its own <li>; PortableText's default
  // <li> around it would nest one list item inside another.
  listItem: ({ children }) => <>{children}</>,

  list: {
    bullet: ({ children }) => (
      <TextComponentList
        items={children}
        listType="bullet"
        ListClassName="mt-2 mb-6"
      />
    ),
    number: ({ children }) => (
      <TextComponentList
        items={children}
        listType="number"
        ListClassName="mt-2 mb-6"
      />
    ),
  },
};

const BlockContent: React.FC<Props> = ({ content }) => {
  if (!content) return null;

  return (
    <div>
      <PortableText value={content} components={components} />
    </div>
  );
};

export default BlockContent;
