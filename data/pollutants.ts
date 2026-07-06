/**
 * Luftkomponenter (forurensningskomponenter) med forklaringer på norsk bokmål.
 * Terskler og enheter er basert på Miljødirektoratet / MET Norway sin
 * luftkvalitetsindeks og norske luftkvalitetskriterier.
 */

export type PollutantId = "pm25" | "pm10" | "no2" | "o3" | "so2";

export interface Pollutant {
  id: PollutantId;
  /** Vist navn, f.eks. "PM2.5" */
  label: string;
  /** Lengre navn på norsk */
  fullName: string;
  unit: string;
  /** Kort forklaring (1–2 setninger) */
  short: string;
  /** Lengre forklaring til guidesider */
  description: string;
  /** Typiske kilder i norske byer */
  sources: string[];
  /** Nøkkel i MET-responsen for konsentrasjon, f.eks. pm25_concentration */
  metKey: string;
  /** Intern lenke til utdypende guideside, hvis den finnes */
  href?: string;
}

export const pollutants: Record<PollutantId, Pollutant> = {
  pm25: {
    id: "pm25",
    label: "PM2.5",
    fullName: "Fint svevestøv (partikler under 2,5 µm)",
    unit: "µg/m³",
    short:
      "Svært små partikler som pustes langt ned i lungene. Regnes som den helsemessig viktigste komponenten.",
    description:
      "PM2.5 er svevestøv med diameter under 2,5 mikrometer. Fordi partiklene er så små, trekkes de dypt ned i lungene og kan gå over i blodet. De stammer særlig fra forbrenning – vedfyring og eksos – i tillegg til langtransportert forurensning fra kontinentet.",
    sources: ["Vedfyring", "Eksos fra biler", "Langtransportert forurensning", "Skipstrafikk"],
    metKey: "pm25_concentration",
    href: "/svevestov",
  },
  pm10: {
    id: "pm10",
    label: "PM10",
    fullName: "Grovt svevestøv (partikler under 10 µm)",
    unit: "µg/m³",
    short:
      "Litt større partikler, ofte veistøv som virvles opp av trafikk. Dominerer gjerne på tørre vår­dager.",
    description:
      "PM10 er svevestøv med diameter under 10 mikrometer. En stor del er veistøv – asfalt- og dekkslitasje, spesielt fra piggdekk – som virvles opp når veiene tørker opp om våren. PM10 irriterer luftveiene og kan gi problemer for følsomme grupper.",
    sources: ["Veistøv (asfalt- og dekkslitasje)", "Piggdekkbruk", "Vedfyring", "Sand og grus"],
    metKey: "pm10_concentration",
    href: "/svevestov",
  },
  no2: {
    id: "no2",
    label: "NO₂",
    fullName: "Nitrogendioksid",
    unit: "µg/m³",
    short:
      "Gass som først og fremst kommer fra trafikk, særlig dieselkjøretøy. Høyest langs trafikkerte veier.",
    description:
      "Nitrogendioksid (NO₂) er en gass som dannes ved forbrenning ved høy temperatur, framfor alt i bilmotorer. Nivåene er høyest langs sterkt trafikkerte veier og i rushtiden, og henger tett sammen med hvor mye biltrafikk det er lokalt.",
    sources: ["Veitrafikk (særlig diesel)", "Skipstrafikk", "Industri"],
    metKey: "no2_concentration",
    href: "/no2",
  },
  o3: {
    id: "o3",
    label: "O₃",
    fullName: "Bakkenær ozon",
    unit: "µg/m³",
    short:
      "Dannes når sollys reagerer med andre forurensninger. Ofte høyest på solrike dager, gjerne utenfor bysentrum.",
    description:
      "Bakkenær ozon (O₃) er ikke sluppet ut direkte, men dannes når sollys reagerer med andre forurensningsstoffer i lufta. Nivåene er ofte høyest på varme, solrike dager – og kan paradoksalt nok være høyere i utkanten av byene enn i sentrum.",
    sources: ["Fotokjemiske reaksjoner i sollys", "Langtransportert ozon"],
    metKey: "o3_concentration",
    href: "/ozon",
  },
  so2: {
    id: "so2",
    label: "SO₂",
    fullName: "Svoveldioksid",
    unit: "µg/m³",
    short:
      "Gass fra svovelholdig forbrenning. Nivåene er stort sett lave i norske byer, men kan være aktuelle nær industri.",
    description:
      "Svoveldioksid (SO₂) dannes ved forbrenning av svovelholdig brensel. I norske byer er nivåene som regel lave, men komponenten kan være relevant nær industri og enkelte havneområder.",
    sources: ["Industri", "Skipstrafikk", "Forbrenning av svovelholdig brensel"],
    metKey: "so2_concentration",
  },
};

/** Rekkefølge når komponenter listes opp. */
export const pollutantOrder: PollutantId[] = ["pm25", "pm10", "no2", "o3", "so2"];

export const pollutantList: Pollutant[] = pollutantOrder.map((id) => pollutants[id]);
