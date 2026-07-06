import { site } from "@/lib/site";
import type { City } from "@/data/cities";
import { normalizeMetResponse, type MetRawResponse } from "./normalize";
import type { AirQualityResult } from "./types";

const MET_BASE =
  "https://api.met.no/weatherapi/airqualityforecast/0.1/";

/** Hvor lenge et svar caches (sekunder). MET oppdaterer time for time. */
const REVALIDATE_SECONDS = 1800; // 30 min

export const MET_SOURCE_LABEL = "MET Norway – Luftkvalitetsvarsel";

function buildUrl(lat: number, lon: number): string {
  const params = new URLSearchParams({
    lat: lat.toFixed(4),
    lon: lon.toFixed(4),
    areaclass: "grunnkrets",
  });
  return `${MET_BASE}?${params.toString()}`;
}

/** Antall forsøk totalt (1 + ett retry ved transiente feil). */
const MAX_ATTEMPTS = 2;
/** Pause før retry. Kort nok til ikke å forsinke build merkbart. */
const RETRY_DELAY_MS = 750;
/** Timeout per forsøk. */
const TIMEOUT_MS = 8000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Statuskoder der et nytt forsøk kan hjelpe (throttling/serverfeil). */
function isRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

/**
 * Henter og normaliserer luftkvalitetsvarsel for et koordinat fra MET Norway.
 * Kaster aldri – returnerer alltid et AirQualityResult, med ok=false ved feil.
 * Kjøres kun på server (bruker identifiserende User-Agent mot MET).
 *
 * Brukes både av bysidene (via getAirQualityForCity) og av
 * «Min lokasjon»-verktøyet (via route handler), slik at normalisering og
 * AQI-tolkning bare finnes ett sted.
 *
 * Robusthet: når mange bysider genereres samtidig under build/ISR kan
 * enkeltkall feile transient (nettverk, timeout, throttling). Ett retry med
 * kort pause reduserer risikoen for at en side bygges med fallback uten
 * grunn. Ved varig feil beholdes den ærlige fallbacken – vi viser aldri
 * gjettede tall.
 */
export async function getAirQualityForCoords(
  lat: number,
  lon: number,
): Promise<AirQualityResult> {
  const url = buildUrl(lat, lon);
  const fallback: AirQualityResult = {
    ok: false,
    overallAqi: null,
    overallLevel: null,
    time: null,
    reftime: null,
    locationName: null,
    locationPath: null,
    components: [],
    source: MET_SOURCE_LABEL,
  };

  let lastError = "Ukjent feil ved henting";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (attempt > 1) await delay(RETRY_DELAY_MS);

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": site.metUserAgent,
          Accept: "application/json",
        },
        next: { revalidate: REVALIDATE_SECONDS },
        // Ikke la en hengende MET-forespørsel blokkere sidevisningen.
        // Sidene har uansett ISR (revalidate på side-nivå), så et avbrutt
        // forsøk gir bare ærlig fallback til neste regenerering.
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (!res.ok) {
        lastError = `MET svarte med status ${res.status}`;
        // 4xx (utenom 429) er konfigurasjonsfeil – retry hjelper ikke.
        if (!isRetryableStatus(res.status)) break;
        continue;
      }

      const raw = (await res.json()) as MetRawResponse;
      return normalizeMetResponse(raw, Date.now(), MET_SOURCE_LABEL);
    } catch (err) {
      // Nettverksfeil/timeout – prøv igjen én gang.
      lastError = err instanceof Error ? err.message : "Ukjent feil ved henting";
    }
  }

  return { ...fallback, error: lastError };
}

/** Henter luftkvalitetsvarsel for en by fra den interne bydatabasen. */
export async function getAirQualityForCity(
  city: City,
): Promise<AirQualityResult> {
  return getAirQualityForCoords(city.lat, city.lon);
}
