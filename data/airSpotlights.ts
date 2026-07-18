import type { SpotlightKey } from "@/lib/airquality/spotlight";

/**
 * Innhold for den dynamiske spotlighten på bysidene.
 *
 * Språkregler (håndheves av tester):
 * - Varsel-språk: dataene er et beregnet varsel fra MET, aldri «måling»,
 *   «live» eller «sanntid».
 * - Årsaksforsiktighet: «typiske kilder er», «kan henge sammen med» – aldri
 *   «skyldes X» uten datagrunnlag.
 * - Ingen garantier («trygt å gå ut») og ingen medisinske råd.
 * - Manglende/utdaterte data er ikke god luft.
 */

export interface AirSpotlightLink {
  label: string;
  href: string;
}

export interface AirSpotlightContent {
  eyebrow: string;
  title: string;
  description: string;
  links: AirSpotlightLink[];
  notice?: string;
}

export const airSpotlights: Record<SpotlightKey, AirSpotlightContent> = {
  "data-unavailable": {
    eyebrow: "Varsel utilgjengelig",
    title: "Vi mangler et ferskt varsel",
    description:
      "Vi klarte ikke å hente et beregnet luftkvalitetsvarsel nå, og viser ingen gjettede tall. Prøv igjen senere – forklaringene på siden gjelder uansett.",
    links: [
      { label: "Se andre steder", href: "/byer" },
      { label: "Slik fungerer varselet", href: "/luftkvalitet" },
    ],
  },

  "data-stale": {
    eyebrow: "Eldre varsel",
    title: "Varselet er eldre enn normalt",
    description:
      "Det er en stund siden MET sist oppdaterte beregningen, så situasjonen kan ha endret seg. Tolk nivået med litt ekstra forsiktighet.",
    links: [
      { label: "Se andre steder", href: "/byer" },
      { label: "Om datagrunnlaget", href: "/luftkvalitet" },
    ],
  },

  "level-1": {
    eyebrow: "God luftkvalitet",
    title: "Varselet viser god luftkvalitet",
    description:
      "De aller fleste kan være ute som normalt. Forholdene kan endre seg gjennom døgnet – særlig på kalde, vindstille dager.",
    links: [
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Hva betyr nivåene?", href: "/luftkvalitet" },
    ],
  },

  "level-2": {
    eyebrow: "Moderat luftkvalitet",
    title: "Varselet viser moderat luftkvalitet",
    description:
      "Utendørs aktivitet anbefales for de fleste. Spesielt følsomme personer kan merke lette symptomer.",
    links: [
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
    ],
  },

  "level-3": {
    eyebrow: "Høy luftforurensning",
    title: "Varselet viser høy luftforurensning",
    description:
      "Følsomme grupper bør redusere langvarig, hard aktivitet ute. Se hva nivået betyr, og vurder tidspunkt og sted for aktivitet.",
    links: [
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
      { label: "Forstå nivåene", href: "/luftkvalitet" },
    ],
  },

  "level-4": {
    eyebrow: "Svært høy luftforurensning",
    title: "Varselet viser svært høy luftforurensning",
    description:
      "Følsomme grupper bør være mest mulig inne, og de fleste bør begrense hard aktivitet ute. Se rådene for dagens nivå.",
    links: [
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
      { label: "Forstå nivåene", href: "/luftkvalitet" },
    ],
    notice:
      "ByLuft gir generell informasjon og erstatter ikke råd fra helsepersonell.",
  },

  "pollutant-pm25": {
    eyebrow: "Fint svevestøv · PM2.5",
    title: "Fint svevestøv bidrar mest til nivået i varselet",
    description:
      "Typiske kilder er vedfyring, eksos og langtransportert forurensning. Nivåene kan variere mye lokalt, også innenfor samme by.",
    links: [
      { label: "Hva er svevestøv?", href: "/svevestov" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
    ],
  },

  "pollutant-pm10": {
    eyebrow: "Svevestøv · PM10",
    title: "Grovt svevestøv bidrar mest til nivået i varselet",
    description:
      "Typiske kilder er veistøv og annet oppvirvlet støv fra trafikk, særlig på tørre dager. Nivåene er ofte høyest langs trafikkerte veier.",
    links: [
      { label: "Hva er svevestøv?", href: "/svevestov" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
    ],
  },

  "pollutant-no2": {
    eyebrow: "Nitrogendioksid · NO₂",
    title: "Nitrogendioksid bidrar mest til nivået i varselet",
    description:
      "Typiske kilder er veitrafikk. Nivåene er ofte høyest langs trafikkerte veier og i rushtiden, og kan variere gjennom dagen.",
    links: [
      { label: "Hva er NO₂?", href: "/no2" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
    ],
  },

  "pollutant-o3": {
    eyebrow: "Ozon · O₃",
    title: "Bakkenær ozon bidrar mest til nivået i varselet",
    description:
      "Ozon kan øke på solrike dager og variere gjennom ettermiddagen – ofte med høyere nivåer i utkanten av byen enn i sentrum.",
    links: [
      { label: "Hva er bakkenær ozon?", href: "/ozon" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
    ],
  },

  "season-winter": {
    eyebrow: "Vinter",
    title: "Følg varselet på kalde og stille dager",
    description:
      "Kald, stillestående luft kan holde forurensning nær bakken. Typiske kilder om vinteren er vedfyring og trafikk.",
    links: [
      { label: "Hva er svevestøv?", href: "/svevestov" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
    ],
  },

  "season-spring-road-dust": {
    eyebrow: "Vår",
    title: "Tørre vårdager kan gi mer veistøv",
    description:
      "Når veiene tørker opp, kan svevestøvnivåene øke. Følg med på varselet før lengre turer og trening ute.",
    links: [
      { label: "Hva er svevestøv?", href: "/svevestov" },
      { label: "Pollen og luftkvalitet", href: "/pollen-og-luftkvalitet" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
    ],
    notice: "ByLuft viser luftkvalitet, ikke pollenvarsel.",
  },

  "season-early-summer": {
    eyebrow: "Forsommer",
    title: "Sjekk varselet før aktivitet ute",
    description:
      "Se dagens nivå og hvilken komponent som påvirker lufta mest der du er.",
    links: [
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Pollen og luftkvalitet", href: "/pollen-og-luftkvalitet" },
      { label: "Luftkvalitet og helse", href: "/helse" },
    ],
    notice: "ByLuft viser luftkvalitet, ikke pollenvarsel.",
  },

  "season-summer-ozone": {
    eyebrow: "Sommer",
    title: "Luftkvaliteten kan variere gjennom dagen",
    description:
      "På varme, solrike dager kan bakkenær ozon øke utover ettermiddagen. Følg med på varselet hvis du skal være lenge ute.",
    links: [
      { label: "Hva er bakkenær ozon?", href: "/ozon" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
    ],
  },

  "season-autumn": {
    eyebrow: "Høst",
    title: "Følg varselet når været skifter",
    description:
      "Trafikk, vær og lokale kilder kan påvirke luftkvaliteten gjennom høsten.",
    links: [
      { label: "Forstå luftkvaliteten", href: "/luftkvalitet" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
    ],
  },

  "season-heating-season": {
    eyebrow: "Fyringssesong",
    title: "Følg varselet på kalde kvelder",
    description:
      "Kalde, stille kvelder kan gi høyere nivåer av svevestøv. Typiske kilder er vedfyring og trafikk.",
    links: [
      { label: "Hva er svevestøv?", href: "/svevestov" },
      { label: "Kan jeg gå ut?", href: "/kan-jeg-ga-ut" },
      { label: "Luftkvalitet og helse", href: "/helse" },
    ],
  },
};
