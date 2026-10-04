"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { FiX } from "react-icons/fi";
export default function RequestDialog({
  title,
  closeLabel,
  onClose,
  children,
}: {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal?.();
    return () => {
      dialog?.close?.();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="m-auto max-h-[90svh] w-[min(760px,94vw)] overflow-y-auto border border-gold bg-[#141416] p-8 text-ivory backdrop:bg-[#000b] upto700:p-6 [&_form_:is(input,textarea)]:text-black"
      aria-label={title}
      onCancel={onClose}
    >
      <button
        type="button"
        className="ml-auto grid h-11 w-11 cursor-pointer place-items-center text-gold"
        aria-label={closeLabel}
        onClick={onClose}
      >
        <FiX />
      </button>
      <h2 className="text-[2rem] leading-[1.15] font-normal not-italic">
        {title}
      </h2>
      {children}
    </dialog>
  );
}
