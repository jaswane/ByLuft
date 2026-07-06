/**
 * Miljødirektoratet – Luftkvalitet i Norge (målinger).
 *
 * Måledata (faktiske målinger fra bakkestasjoner) er tilgjengelig via
 * api-luftmalinger.miljodirektoratet.no. I denne MVP-en bruker vi MET Norway
 * sitt beregnede luftkvalitetsvarsel som primærkilde for bysidene, fordi det
 * dekker hele landet og har et stabilt, godt dokumentert grensesnitt.
 *
 * Miljødirektoratets måle-API er dokumentert som referanse- og videreutviklings-
 * kilde her, slik at et senere steg kan legge til faktiske stasjonsmålinger ved
 * siden av varselet. Vi henter det ikke ved sidevisning i MVP-en, for å holde
 * bysidene raske og robuste.
 */

export const MEASUREMENTS_SOURCE = {
  label: "Miljødirektoratet – Luftkvalitet i Norge (målinger)",
  apiBase: "https://api-luftmalinger.miljodirektoratet.no",
  officialSite: "https://luftkvalitet.miljodirektoratet.no",
  note:
    "Faktiske målinger fra bakkestasjoner. Brukes i dag som kilde for forklaringer og offisielle oppslag, og er aktuell for stasjonsmålinger i en senere versjon.",
} as const;
