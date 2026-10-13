"use client";

import { FiArrowDown, FiLoader } from "react-icons/fi";
import { buttonClass } from "@/components/ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "@/components/HomePage/styles";

interface LoadMoreProps {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
}

/** The outlined button under a listing grid that shows the next page. */
export default function LoadMore({
  label,
  onClick,
  isLoading = false,
}: LoadMoreProps) {
  return (
    <div className="my-16 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        className={buttonClass({ ...homeButtonParts, secondary: true })}
      >
        {label}
        {isLoading ? (
          <FiLoader
            aria-hidden="true"
            className={`${homeButtonIcon} animate-spin motion-reduce:animate-none`}
          />
        ) : (
          <FiArrowDown aria-hidden="true" className={homeButtonIcon} />
        )}
      </button>
    </div>
  );
}
