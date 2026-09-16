"use client";

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
      className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-2xl border border-line bg-white p-6 text-ink shadow-2xl backdrop:bg-ink/30"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          aria-label="Close dialog"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-xl"
        >
          ×
        </button>
      </div>
      {children}
    </dialog>
  );
}
