import { LuFacebook, LuInstagram, LuX } from "react-icons/lu";
import { LiaFacebookMessenger, LiaWhatsapp } from "react-icons/lia";

type SocialLinksObj = {
  facebook: string;
  instagram: string;
  xURL: string;
  MessengerURL: string;
};

type SocialItem =
  | { type: "social"; platform: keyof SocialLinksObj; url: string }
  | { type: "telephone"; value: string };

type FooterSocialProps = {
  links: SocialLinksObj;
  telephone: string;
};

const iconMap = {
  facebook: LuFacebook,
  instagram: LuInstagram,
  xURL: LuX,
  MessengerURL: LiaFacebookMessenger,
} as const;

function buildSocialItems(
  links: SocialLinksObj,
  telephone: string,
): SocialItem[] {
  const socialItems: SocialItem[] = (
    Object.entries(links) as [keyof SocialLinksObj, string][]
  )
    .filter(([, url]) => Boolean(url))
    .map(([platform, url]) => ({ type: "social" as const, platform, url }));

  if (telephone) {
    socialItems.push({ type: "telephone", value: telephone });
  }

  return socialItems;
}

const linkClass =
  "w-9 h-9 flex items-center justify-center border border-gold/25 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10";

export default function FooterSocial({ links, telephone }: FooterSocialProps) {
  const items = buildSocialItems(links, telephone);

  return (
    <div className="flex gap-3 mt-6">
      {items.map((item, index) =>
        item.type === "social" ? (
          <a
            key={`${item.platform}-${index}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.platform}
            className={linkClass}
          >
            {(() => {
              const Icon = iconMap[item.platform];
              return <Icon className="size-5" aria-hidden />;
            })()}
          </a>
        ) : (
          <a
            key={`whatsapp-${index}`}
            href={`https://wa.me/${item.value.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp"
            className={linkClass}
          >
            <LiaWhatsapp className="size-5" aria-hidden />
          </a>
        ),
      )}
    </div>
  );
}
