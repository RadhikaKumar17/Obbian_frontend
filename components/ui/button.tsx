"use client";

import type { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  secondary = false,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${secondary ? "btn-secondary" : ""}`}
    >
      {children}
    </button>
  );
}
