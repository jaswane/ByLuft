/**
 * Dato- og klokkeslettdeler beregnet i norsk tid (Europe/Oslo), uavhengig av
 * hvilken tidssone serveren kjører i. Brukes av spotlight-logikken for
 * sesong- og dagfaseberegning.
 */

export interface NorwayDateParts {
  year: number;
  month: number; // 1–12
  day: number; // 1–31
  hour: number; // 0–23
}

const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Oslo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hourCycle: "h23",
});

export function getNorwayDateParts(date: Date = new Date()): NorwayDateParts {
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes): number =>
    Number(parts.find((p) => p.type === type)?.value ?? Number.NaN);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
  };
}
