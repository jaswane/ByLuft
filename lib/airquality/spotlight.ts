import type { City } from "@/data/cities";
import type { PollutantId } from "@/data/pollutants";
import type { AqiLevel } from "./aqi";
import type { AirQualityResult, ComponentReading } from "./types";
import { getNorwayDateParts } from "@/lib/norwayTime";

/**
 * Ren, testbar logikk for den dynamiske spotlighten på bysidene.
 *
 * Prinsipper (i prioritert rekkefølge):
 *   1. Datakvalitet (utilgjengelig/utdatert) foran alt annet.
 *   2. Faktisk varselnivå foran sesong – god luft skal aldri overstyres av
 *      en generell sesongadvarsel.
 *   3. Dominerende komponent forklares ved moderat/høy/svært høy.
 *   4. Sesong er kun bakgrunnsfallback når nivå mangler.
 *
 * Alt bygger på det allerede hentede AirQualityResult – ingen nye API-kall.
 */

export type PollutantKey = PollutantId | "unknown";

export type Freshness = "fresh" | "stale" | "unavailable";

export type DayPhase = "night" | "morning" | "day" | "evening";

export type AirSeason =
  | "winter"
  | "spring-road-dust"
  | "early-summer"
  | "summer-ozone"
  | "autumn"
  | "heating-season";

export type SpotlightKey =
  | "data-unavailable"
  | "data-stale"
  | "level-1"
  | "level-2"
  | "level-3"
  | "level-4"
  | "pollutant-pm25"
  | "pollutant-pm10"
  | "pollutant-no2"
  | "pollutant-o3"
  | `season-${AirSeason}`;

export interface SpotlightContext {
  level: AqiLevel | null;
  dominant: PollutantKey;
  freshness: Freshness;
  season: AirSeason;
  dayPhase: DayPhase;
  placeName: string;
  placeSlug: string;
  /** Timen varselet gjelder for (ISO), fra MET. */
  forecastTime: string | null;
  /** MET-modellens kjøretid (ISO). */
  reftime: string | null;
}

/** Prioritet ved lik delindeks (helsemessig viktigst først). */
const DOMINANT_PRIORITY: PollutantId[] = ["pm25", "pm10", "no2", "o3", "so2"];

/**
 * Komponenten med høyest AQI-delindeks. METs samlede AQI er maks av
 * delindeksene, så dette er faglig korrekt som «bidrar mest til nivået».
 */
export function getDominantPollutant(
  components: ComponentReading[],
): PollutantKey {
  let best: ComponentReading | null = null;
  for (const c of components) {
    if (c.aqi === null) continue;
    if (
      best === null ||
      c.aqi > (best.aqi as number) ||
      (c.aqi === best.aqi &&
        DOMINANT_PRIORITY.indexOf(c.id) < DOMINANT_PRIORITY.indexOf(best.id))
    ) {
      best = c;
    }
  }
  return best?.id ?? "unknown";
}

/**
 * Ferskhet basert på METs modellkjøretid (reftime). Modellen oppdateres
 * minst daglig, så et varsel er rutinemessig flere timer «gammelt» uten å
 * være utdatert. Grense: 24 timer.
 */
export const STALE_AFTER_MINUTES = 24 * 60;

export function getFreshness(
  result: Pick<AirQualityResult, "ok" | "reftime">,
  now: Date = new Date(),
): Freshness {
  if (!result.ok) return "unavailable";
  if (!result.reftime) return "stale";
  const t = Date.parse(result.reftime);
  if (Number.isNaN(t)) return "stale";
  const ageMinutes = (now.getTime() - t) / 60_000;
  return ageMinutes > STALE_AFTER_MINUTES ? "stale" : "fresh";
}

/** Dagfase – kun sekundær kontekst, velger aldri spotlight alene. */
export function getDayPhase(hour: number): DayPhase {
  if (hour < 6 || hour >= 23) return "night";
  if (hour < 10) return "morning";
  if (hour < 18) return "day";
  return "evening";
}

/**
 * Redaksjonelle sesongperioder (ikke meteorologiske definisjoner).
 * Vinter dekker hele januar og februar – inkludert 29. februar i skuddår.
 */
export function getAirSeason(month: number, day: number): AirSeason {
  if (month <= 2) return "winter";
  if (month <= 4) return "spring-road-dust";
  if (month === 5 || (month === 6 && day <= 15)) return "early-summer";
  if (month <= 8) return "summer-ozone";
  if (month === 9 || (month === 10 && day <= 15)) return "autumn";
  return "heating-season";
}

export function buildSpotlightContext(input: {
  result: AirQualityResult;
  city: City;
  now?: Date;
}): SpotlightContext {
  const now = input.now ?? new Date();
  const { month, day, hour } = getNorwayDateParts(now);

  return {
    level: input.result.overallLevel,
    dominant: getDominantPollutant(input.result.components),
    freshness: getFreshness(input.result, now),
    season: getAirSeason(month, day),
    dayPhase: getDayPhase(hour),
    placeName: input.city.name,
    placeSlug: input.city.slug,
    forecastTime: input.result.time,
    reftime: input.result.reftime,
  };
}

/** Komponenter med egen guideside/spotlight-variant. SO₂ har ingen egen side. */
const SPOTLIGHT_POLLUTANTS = new Set<PollutantKey>(["pm25", "pm10", "no2", "o3"]);

/**
 * Velger spotlight-variant etter fast prioritering:
 * datakvalitet → nivå (med dominant komponent ved nivå 2–4) → sesong.
 */
export function getSpotlightKey(context: SpotlightContext): SpotlightKey {
  if (context.freshness === "unavailable") return "data-unavailable";
  if (context.freshness === "stale") return "data-stale";

  const dominant = SPOTLIGHT_POLLUTANTS.has(context.dominant)
    ? (context.dominant as "pm25" | "pm10" | "no2" | "o3")
    : null;

  if (context.level === 3 || context.level === 4) {
    return dominant ? `pollutant-${dominant}` : `level-${context.level}`;
  }
  if (context.level === 2) {
    return dominant ? `pollutant-${dominant}` : "level-2";
  }
  if (context.level === 1) {
    // God luft skal aldri overstyres av sesongadvarsel.
    return "level-1";
  }

  return `season-${context.season}`;
}

const ALL_SPOTLIGHT_KEYS: ReadonlySet<SpotlightKey> = new Set<SpotlightKey>([
  "data-unavailable",
  "data-stale",
  "level-1",
  "level-2",
  "level-3",
  "level-4",
  "pollutant-pm25",
  "pollutant-pm10",
  "pollutant-no2",
  "pollutant-o3",
  "season-winter",
  "season-spring-road-dust",
  "season-early-summer",
  "season-summer-ozone",
  "season-autumn",
  "season-heating-season",
]);

export function isSpotlightKey(value: string): value is SpotlightKey {
  return ALL_SPOTLIGHT_KEYS.has(value as SpotlightKey);
}

export const spotlightKeys: readonly SpotlightKey[] = [...ALL_SPOTLIGHT_KEYS];

/**
 * Manuell forhåndsvisning via server-env FORCE_AIR_SPOTLIGHT.
 * Kun for lokal utvikling/preview – skal aldri være satt i produksjon.
 */
export function getForcedSpotlightKey(): SpotlightKey | undefined {
  const value = process.env.FORCE_AIR_SPOTLIGHT;
  if (!value || !isSpotlightKey(value)) return undefined;
  console.warn(
    `[byluft] FORCE_AIR_SPOTLIGHT er aktiv (${value}) – kun for lokal preview.`,
  );
  return value;
}
