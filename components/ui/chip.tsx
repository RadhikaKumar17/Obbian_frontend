import type { ReactNode } from "react";

export type ChipTone = "brand" | "success" | "neutral" | "danger" | "warn";

const tones: Record<ChipTone, string> = {
  brand: "",
  success: "!bg-success/10 !text-success",
  neutral: "!bg-wash !text-muted ring-1 ring-inset ring-line",
  danger: "!bg-danger-tint !text-danger",
  warn: "!bg-warn-tint !text-warn",
};

export default function Chip({ children, tone = "brand" }: { children: ReactNode; tone?: ChipTone }) {
  return <span className={`chip ${tones[tone]}`}>{children}</span>;
}
