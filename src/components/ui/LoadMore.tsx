"use client";

import { FiArrowDown } from "react-icons/fi";
import { buttonClass } from "@/components/ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "@/components/HomePage/styles";

interface LoadMoreProps {
  label: string;
  onClick: () => void;
}

/** The outlined button under a listing grid that shows the next page. */
export default function LoadMore({ label, onClick }: LoadMoreProps) {
  return (
    <div className="my-16 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className={buttonClass({ ...homeButtonParts, secondary: true })}
      >
        {label}
        <FiArrowDown aria-hidden="true" className={homeButtonIcon} />
      </button>
    </div>
  );
}
