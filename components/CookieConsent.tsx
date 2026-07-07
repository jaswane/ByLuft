"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleAnalytics } from "./GoogleAnalytics";
import {
  CONSENT_EVENT,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/consent";

/**
 * Samtykkehåndtering for statistikk-cookies.
 *
 * - Rendrer ingenting på server og ved første klient-render (unngår
 *   hydration-mismatch), leser deretter valget fra localStorage.
 * - Viser et enkelt banner hvis brukeren ikke har valgt ennå.
 * - Laster Google Analytics kun når valget er «accepted». Ved «rejected»
 *   lastes GA aldri.
 * - Lytter på CONSENT_EVENT slik at «Endre samtykke» på /personvern kan
 *   åpne banneret igjen.
 */
export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);

    const reopen = () => setConsent(null);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  const choose = useCallback((value: Consent) => {
    writeConsent(value);
    setConsent(value);
  }, []);

  // Ingen server-render av GA eller banner – hindrer at gtag havner i
  // server-HTML før samtykke, og hindrer hydration-feil.
  if (!mounted) return null;

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}

      {consent === null && (
        <section
          role="dialog"
          aria-label="Samtykke til statistikk"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-muted">
              Vi bruker Google Analytics til anonym statistikk om hvordan
              ByLuft.no brukes. Det hjelper oss å forbedre tjenesten. Du kan
              bruke siden uten å godta.{" "}
              <a
                href="/personvern"
                className="font-medium text-accent hover:text-accent-hover"
              >
                Mer i personvernerklæringen
              </a>
              .
            </p>
            <div className="flex flex-none gap-2">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="min-h-11 flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent-hover sm:flex-none"
              >
                Avvis
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="min-h-11 flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:flex-none"
              >
                Godta statistikk
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
