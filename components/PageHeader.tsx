import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "@/lib/seo";

/** Felles topp for innholdssider: brødsmuler, tittel og ingress. */
export function PageHeader({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs?: Crumb[];
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {crumbs && crumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {lead && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>
        )}
        {children}
      </div>
    </header>
  );
}
