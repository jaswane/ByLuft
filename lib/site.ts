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
  /**
   * Kontaktadresse som vises på /om og /personvern og brukes i User-Agent
   * mot MET. NB: Postkassen post@byluft.no må opprettes/videresendes før
   * lansering – ikke publiser siden uten at adressen faktisk mottar e-post.
   */
  contactEmail: "post@byluft.no",
  /**
   * User-Agent som sendes til api.met.no. MET krever en identifiserbar UA med
   * domene og kontaktinfo, ellers svarer de med 403.
   */
  metUserAgent: "byluft.no (post@byluft.no)",
} as const;

export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "" : clean}`;
}
