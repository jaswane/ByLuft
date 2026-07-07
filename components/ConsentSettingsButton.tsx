"use client";

import { useState } from "react";
import { CONSENT_EVENT, clearConsent } from "@/lib/consent";

/**
 * Knapp på /personvern som nullstiller samtykkevalget og åpner banneret
 * igjen. Nullstiller localStorage og varsler CookieConsent via CONSENT_EVENT.
 */
export function ConsentSettingsButton() {
  const [done, setDone] = useState(false);

  function reset() {
    clearConsent();
    try {
      window.dispatchEvent(new Event(CONSENT_EVENT));
    } catch {
      // Ignorer – banneret dukker uansett opp ved neste sidelasting.
    }
    setDone(true);
  }

  return (
    <span className="not-prose inline-flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent-hover"
      >
        Endre samtykke for statistikk
      </button>
      {done && (
        <span aria-live="polite" className="text-sm text-muted">
          Valget er nullstilt – gjør et nytt valg i banneret.
        </span>
      )}
    </span>
  );
}
