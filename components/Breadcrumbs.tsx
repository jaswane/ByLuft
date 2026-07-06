import Link from "next/link";
import type { Crumb } from "@/lib/seo";

/** Synlige brødsmuler. Bruk sammen med breadcrumbJsonLd for strukturert data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brødsmulesti" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-accent-hover">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="px-0.5">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
