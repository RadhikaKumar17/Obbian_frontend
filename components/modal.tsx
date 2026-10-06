"use client";

import { CloseIcon } from "@/components/ui/icons";
import { useEffect, useRef, type ReactNode } from "react";

export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    el?.showModal();
    return () => el?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-32px)] max-w-lg overflow-y-auto animate-fade-up rounded-3xl border border-line bg-white p-6 text-ink shadow-lift backdrop:bg-ink/40 backdrop:backdrop-blur-[2px] sm:p-7"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          aria-label="Close dialog"
          onClick={onClose}
          className="grid size-9 place-items-center rounded-lg text-muted transition hover:bg-tint hover:text-brand"
        >
          <CloseIcon size={18} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
