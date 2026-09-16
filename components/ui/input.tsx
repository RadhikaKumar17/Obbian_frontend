import type { ComponentPropsWithRef } from "react";

export type InputProps = ComponentPropsWithRef<"input">;

export default function Input({ className = "", type = "text", ...props }: InputProps) {
  const baseClass = type === "checkbox" || type === "radio" ? "size-4 accent-brand" : "field";
  return <input {...props} type={type} className={`${baseClass} ${className}`} />;
}
