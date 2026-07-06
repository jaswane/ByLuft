/**
 * Den norske luftkvalitetsindeksen (LKI) har fire nivåer. Tekster og terskler
 * følger MET Norway / Miljødirektoratet sin indeks, der AQI-verdien er et tall
 * mellom 1 og ~5 og heltallsdelen angir nivået:
 *   1 = Lite,  2 = Moderat,  3 = Høy,  4 = Svært høy.
 */

export type AqiLevel = 1 | 2 | 3 | 4;

export interface AqiLevelInfo {
  level: AqiLevel;
  /** Kort etikett, f.eks. "Moderat" */
  label: string;
  /** Kort helserisiko-tekst */
  riskShort: string;
  /** Kort beskrivelse / anbefaling på norsk */
  description: string;
  /** CSS-variabel for nivåfarge (brukes sammen med tekst, aldri farge alene) */
  colorVar: string;
  softColorVar: string;
  /** Tekstsymbol som støtter fargen (tilgjengelighet) */
  symbol: string;
}

export const aqiLevels: Record<AqiLevel, AqiLevelInfo> = {
  1: {
    level: 1,
    label: "Lite",
    riskShort: "Liten helserisiko",
    description:
      "Det er lite luftforurensning. De aller fleste kan være ute som normalt.",
    colorVar: "var(--level-1)",
    softColorVar: "var(--level-1-soft)",
    symbol: "●",
  },
  2: {
    level: 2,
    label: "Moderat",
    riskShort: "Moderat helserisiko",
    description:
      "Utendørs aktivitet anbefales for de fleste. Spesielt følsomme personer kan merke lettere symptomer.",
    colorVar: "var(--level-2)",
    softColorVar: "var(--level-2-soft)",
    symbol: "◆",
  },
  3: {
    level: 3,
    label: "Høy",
    riskShort: "Betydelig helserisiko",
    description:
      "Følsomme grupper bør redusere langvarig og hard utendørs aktivitet. Vurder å legge trening innendørs.",
    colorVar: "var(--level-3)",
    softColorVar: "var(--level-3-soft)",
    symbol: "▲",
  },
  4: {
    level: 4,
    label: "Svært høy",
    riskShort: "Alvorlig helserisiko",
    description:
      "Følsomme grupper bør være mest mulig inne og unngå fysisk anstrengelse ute. Følg med på lokale råd.",
    colorVar: "var(--level-4)",
    softColorVar: "var(--level-4-soft)",
    symbol: "■",
  },
};

export const unknownLevel = {
  label: "Ukjent",
  riskShort: "Data ikke tilgjengelig",
  description:
    "Vi klarte ikke å hente et oppdatert luftkvalitetsvarsel akkurat nå. Se forklaringen og lenken til offisiell kilde nedenfor.",
  colorVar: "var(--level-unknown)",
  softColorVar: "var(--level-unknown-soft)",
  symbol: "–",
} as const;

/** Gjør en AQI-verdi (float 1–5) om til et nivå 1–4. */
export function aqiValueToLevel(value: number): AqiLevel {
  const floored = Math.floor(value);
  if (floored <= 1) return 1;
  if (floored >= 4) return 4;
  return floored as AqiLevel;
}

export function levelInfo(level: AqiLevel): AqiLevelInfo {
  return aqiLevels[level];
}
