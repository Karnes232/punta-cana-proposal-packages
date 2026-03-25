interface CategoryIntroDescriptionProps {
  text: string;
}

export default function CategoryIntroDescription({
  text,
}: CategoryIntroDescriptionProps) {
  return (
    <p
      className="
          text-center font-light text-gray leading-[1.85]
          text-[clamp(14px,1.5vw,17px)]
          max-w-[580px] mx-auto
        "
    >
      {text}
    </p>
  );
}
