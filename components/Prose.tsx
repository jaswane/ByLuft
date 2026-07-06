import type { ReactNode } from "react";

/** Tekstinnhold med god lesbarhet og konsistent typografi for guidesider. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-byluft max-w-prose space-y-4 text-[1.0625rem] leading-relaxed text-foreground/90 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_a]:font-medium [&_a]:text-accent hover:[&_a]:text-accent-hover [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_strong]:text-foreground">
      {children}
    </div>
  );
}
