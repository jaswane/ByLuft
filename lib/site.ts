/**
 * Sentral konfigurasjon for ByLuft.no.
 * Én kilde til sannhet for domene, navn og kontaktinfo (bl.a. User-Agent mot MET).
 */

export const site = {
  name: "ByLuft.no",
  shortName: "ByLuft",
  domain: "byluft.no",
  url: "https://byluft.no",
  description:
    "Luftkvalitet i norske byer – forklart enkelt. ByLuft.no samler og forklarer offentlige luftkvalitetsdata for byer i Norge.",
  locale: "nb_NO",
  lang: "no",
  publisher: "Swane Creative",
  publisherUrl: "https://swanecreative.no",
  /** Kontaktadresse som vises på /om og /personvern og brukes i User-Agent mot MET. */
  contactEmail: "kontakt@swanecreative.no",
  /**
   * User-Agent som sendes til api.met.no. MET krever en identifiserbar UA med
   * applikasjons-/domenenavn og kontaktinfo, ellers svarer de med 403.
   * Formen følger MET sine eksempler: "App/versjon domene (kontakt)".
   */
  metUserAgent: "ByLuft/1.0 byluft.no (kontakt@swanecreative.no)",
} as const;

export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "" : clean}`;
}
