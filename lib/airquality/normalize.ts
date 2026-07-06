import { pollutantOrder, pollutants } from "@/data/pollutants";
import { aqiValueToLevel } from "./aqi";
import type { AirQualityResult, ComponentReading } from "./types";

/** Rå MET-respons (kun de feltene vi bruker). */
export interface MetRawResponse {
  meta?: {
    reftime?: string;
    location?: { name?: string };
  };
  data?: {
    time?: Array<{
      from?: string;
      to?: string;
      variables?: Record<string, { value?: number; units?: string }>;
    }>;
  };
}

function round(value: number | undefined, decimals = 1): number | null {
  if (value === undefined || Number.isNaN(value)) return null;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Velger tidssteget i MET-svaret som ligger nærmest "nå".
 * MET oppgir absolutt tid; vi mottar `now` fra kalleren for testbarhet.
 */
function pickCurrentEntry(
  entries: NonNullable<NonNullable<MetRawResponse["data"]>["time"]>,
  now: number,
) {
  let best = entries[0];
  let bestDiff = Infinity;
  for (const entry of entries) {
    const t = entry.from ? Date.parse(entry.from) : NaN;
    if (Number.isNaN(t)) continue;
    const diff = Math.abs(t - now);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = entry;
    }
  }
  return best;
}

/**
 * Gjør en rå MET-respons om til vår normaliserte modell.
 * Returnerer alltid et gyldig objekt; ok=false hvis data mangler.
 */
export function normalizeMetResponse(
  raw: MetRawResponse | null,
  now: number,
  source: string,
): AirQualityResult {
  const empty: AirQualityResult = {
    ok: false,
    overallAqi: null,
    overallLevel: null,
    time: null,
    reftime: raw?.meta?.reftime ?? null,
    locationName: raw?.meta?.location?.name ?? null,
    components: [],
    source,
  };

  const entries = raw?.data?.time;
  if (!entries || entries.length === 0) {
    return { ...empty, error: "Ingen tidsserie i svaret" };
  }

  const entry = pickCurrentEntry(entries, now);
  const vars = entry.variables ?? {};

  const overallAqiRaw = vars.AQI?.value;
  const overallAqi = round(overallAqiRaw, 1);
  const overallLevel =
    overallAqiRaw !== undefined && !Number.isNaN(overallAqiRaw)
      ? aqiValueToLevel(overallAqiRaw)
      : null;

  const components: ComponentReading[] = pollutantOrder
    .map((id) => {
      const p = pollutants[id];
      const conc = vars[p.metKey]?.value;
      const aqiKey = `AQI_${id}`;
      const aqiVal = vars[aqiKey]?.value;
      const reading: ComponentReading = {
        id,
        label: p.label,
        unit: p.unit,
        concentration: round(conc, 1),
        aqi: round(aqiVal, 1),
        level:
          aqiVal !== undefined && !Number.isNaN(aqiVal)
            ? aqiValueToLevel(aqiVal)
            : null,
      };
      return reading;
    })
    // Behold bare komponenter der vi faktisk har en konsentrasjon.
    .filter((c) => c.concentration !== null);

  const ok = overallLevel !== null || components.length > 0;

  return {
    ok,
    overallAqi,
    overallLevel,
    time: entry.from ?? entry.to ?? null,
    reftime: raw?.meta?.reftime ?? null,
    locationName: raw?.meta?.location?.name ?? null,
    components,
    source,
    error: ok ? undefined : "Fant ingen brukbare verdier i svaret",
  };
}
