/**
 * Delte konstanter for samtykke til statistikk-cookies (Google Analytics).
 * Vi lagrer kun selve valget – ingen annen sporing før samtykke er gitt.
 */

export const CONSENT_STORAGE_KEY = "byluft:analytics-consent";

/** Window-event som ber samtykkebanneret om å vise seg igjen. */
export const CONSENT_EVENT = "byluft:open-consent";

export type Consent = "accepted" | "rejected";

/** Leser lagret valg. Tåler at localStorage er utilgjengelig (privat modus e.l.). */
export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // localStorage utilgjengelig – valget gjelder da kun for denne økten.
  }
}

export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Ignorer – ingenting å rydde.
  }
}
