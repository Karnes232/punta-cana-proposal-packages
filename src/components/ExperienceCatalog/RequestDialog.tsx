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
      className="ec-request-dialog"
      aria-label={title}
      onCancel={onClose}
    >
      <button
        type="button"
        className="ec-dialog-close"
        aria-label={closeLabel}
        onClick={onClose}
      >
        <FiX />
      </button>
      <h2>{title}</h2>
      {children}
    </dialog>
  );
}
