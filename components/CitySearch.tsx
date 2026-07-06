"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { City } from "@/data/cities";

/**
 * Enkelt bysøk for rask navigasjon. Dette er et navigasjonshjelpemiddel –
 * selve byinnholdet ligger som statiske, indekserbare sider under /luftkvalitet/[slug].
 * Alle byene er også lenket i ren HTML på /byer for søkemotorer.
 */
export function CitySearch({ cities }: { cities: City[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities.slice(0, 8);
    return cities
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.municipality.toLowerCase().includes(q) ||
          c.county.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [cities, query]);

  return (
    <div className="w-full">
      <label htmlFor="bysok" className="sr-only">
        Søk etter by
      </label>
      <input
        id="bysok"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Søk etter by, f.eks. Oslo, Bergen, Trondheim …"
        autoComplete="off"
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base shadow-sm outline-none focus:border-accent"
      />

      {results.length > 0 ? (
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {results.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/luftkvalitet/${c.slug}`}
                className="block rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent-hover"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">
          Fant ingen by som passer «{query}». Se{" "}
          <Link href="/byer" className="text-accent hover:text-accent-hover">
            oversikten over byer
          </Link>
          .
        </p>
      )}
    </div>
  );
}
