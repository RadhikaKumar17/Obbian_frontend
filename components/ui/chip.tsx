import type { ReactNode } from "react";

export default function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}
