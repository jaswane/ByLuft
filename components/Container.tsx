import type { ReactNode } from "react";

/** Sentrert innholdsbredde med responsiv padding. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
