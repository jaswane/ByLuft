/**
 * Formateringshjelpere for norsk visning.
 * Tidssonen pinnes til Europe/Oslo slik at tidsstempler vises i norsk tid
 * uavhengig av hvilken tidssone serveren kjører i (f.eks. UTC i produksjon).
 */

const dateTimeFmt = new Intl.DateTimeFormat("nb-NO", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Oslo",
});

const dateFmt = new Intl.DateTimeFormat("nb-NO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Oslo",
});

/** "6. juli kl. 14:00" (norsk tid) – tåler null/ugyldig og returnerer da null. */
export function formatDateTime(iso: string | null): string | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return dateTimeFmt.format(new Date(t));
}

export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return dateFmt.format(new Date(t));
}

/** Tall med norsk desimalkomma. */
export function formatNumber(value: number | null, decimals = 1): string {
  if (value === null || Number.isNaN(value)) return "–";
  return value.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}
