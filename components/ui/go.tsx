import Link from "next/link";
import type { ReactNode } from "react";

export default function Go({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`btn ${secondary ? "btn-secondary" : ""}`} href={href}>
      {children}
    </Link>
  );
}
