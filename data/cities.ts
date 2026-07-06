/**
 * Intern bydatabase for ByLuft.no.
 * Koordinater brukes til oppslag mot MET Norway sitt luftkvalitetsvarsel.
 * Koordinatene er avrundet til 4 desimaler i tråd med MET sine retningslinjer.
 */

export interface City {
  slug: string;
  name: string;
  /** Kommune byen ligger i (kan være lik navnet) */
  municipality: string;
  /** Fylke (per 2024-inndeling) */
  county: string;
  lat: number;
  lon: number;
  /** Kort, faktabasert beskrivelse av lokale luftkilder og forhold */
  intro: string;
  /** Typiske lokale kilder til luftforurensning */
  localSources: string[];
  /** Er byen prioritert på forsiden? */
  featured?: boolean;
}

export const cities: City[] = [
  {
    slug: "oslo",
    name: "Oslo",
    municipality: "Oslo",
    county: "Oslo",
    lat: 59.9139,
    lon: 10.7522,
    intro:
      "Oslo har mye biltrafikk og perioder med kald, stillestående luft om vinteren. Da kan svevestøv og nitrogendioksid bygge seg opp, særlig i lavtliggende områder og langs de store innfartsårene.",
    localSources: ["Veitrafikk", "Vedfyring", "Veistøv om våren"],
    featured: true,
  },
  {
    slug: "bergen",
    name: "Bergen",
    municipality: "Bergen",
    county: "Vestland",
    lat: 60.3913,
    lon: 5.3221,
    intro:
      "Bergen er kjent for inversjon om vinteren: kald luft blir liggende fast i dalsøkket mellom fjellene, og forurensning fra trafikk og vedfyring samler seg. På slike dager kan luftkvaliteten bli merkbart dårligere i sentrum.",
    localSources: ["Inversjon vinterstid", "Veitrafikk", "Vedfyring", "Skipstrafikk i havna"],
    featured: true,
  },
  {
    slug: "trondheim",
    name: "Trondheim",
    municipality: "Trondheim",
    county: "Trøndelag",
    lat: 63.4305,
    lon: 10.3951,
    intro:
      "I Trondheim er veistøv (PM10) en typisk utfordring på tørre vårdager, mens trafikk bidrar til nitrogendioksid langs de mest trafikkerte veiene. Kystklimaet gir ofte god gjennomlufting.",
    localSources: ["Veistøv om våren", "Veitrafikk", "Vedfyring"],
    featured: true,
  },
  {
    slug: "stavanger",
    name: "Stavanger",
    municipality: "Stavanger",
    county: "Rogaland",
    lat: 58.97,
    lon: 5.7331,
    intro:
      "Stavanger har et mildt og vindfullt kystklima som ofte gir god luftutskiftning. Trafikk er den viktigste lokale kilden, og nivåene er vanligvis lave utenom perioder med veistøv.",
    localSources: ["Veitrafikk", "Veistøv om våren", "Skipstrafikk"],
    featured: true,
  },
  {
    slug: "drammen",
    name: "Drammen",
    municipality: "Drammen",
    county: "Buskerud",
    lat: 59.7439,
    lon: 10.2045,
    intro:
      "Drammen ligger i en dal ved elva, og kald luft kan bli liggende om vinteren. Trafikk langs hovedveiene og vedfyring er de typiske lokale kildene.",
    localSources: ["Veitrafikk", "Vedfyring", "Inversjon vinterstid"],
    featured: true,
  },
  {
    slug: "kristiansand",
    name: "Kristiansand",
    municipality: "Kristiansand",
    county: "Agder",
    lat: 58.1467,
    lon: 7.9956,
    intro:
      "Kristiansand har kystklima med god gjennomlufting store deler av året. Trafikk og veistøv er de mest aktuelle lokale kildene.",
    localSources: ["Veitrafikk", "Veistøv om våren", "Skipstrafikk"],
  },
  {
    slug: "tromso",
    name: "Tromsø",
    municipality: "Tromsø",
    county: "Troms",
    lat: 69.6492,
    lon: 18.9553,
    intro:
      "Tromsø kan oppleve kalde, stille vinterdager der forurensning fra trafikk og vedfyring blir liggende. Veistøv kan også bli merkbart når snø og is smelter bort om våren.",
    localSources: ["Vedfyring", "Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "bodo",
    name: "Bodø",
    municipality: "Bodø",
    county: "Nordland",
    lat: 67.2804,
    lon: 14.4049,
    intro:
      "Bodø har et værhardt kystklima som ofte gir god luftutskiftning. Trafikk er den viktigste lokale kilden, og nivåene er vanligvis lave.",
    localSources: ["Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "fredrikstad",
    name: "Fredrikstad",
    municipality: "Fredrikstad",
    county: "Østfold",
    lat: 59.2181,
    lon: 10.9298,
    intro:
      "Fredrikstad ligger ved kysten i Østfold. Trafikk og vedfyring er de typiske lokale kildene, og langtransportert forurensning fra kontinentet kan tidvis bidra.",
    localSources: ["Veitrafikk", "Vedfyring", "Langtransportert forurensning"],
  },
  {
    slug: "sarpsborg",
    name: "Sarpsborg",
    municipality: "Sarpsborg",
    county: "Østfold",
    lat: 59.2839,
    lon: 11.1096,
    intro:
      "Sarpsborg i Østfold har både trafikk og industri i nærområdet. Vedfyring bidrar om vinteren, og langtransportert forurensning kan tidvis merkes.",
    localSources: ["Veitrafikk", "Industri", "Vedfyring"],
  },
  {
    slug: "porsgrunn",
    name: "Porsgrunn",
    municipality: "Porsgrunn",
    county: "Telemark",
    lat: 59.1408,
    lon: 9.6561,
    intro:
      "Porsgrunn ligger i Grenland, et område med industri i tillegg til trafikk. Lokale utslipp og vedfyring er aktuelle kilder å følge med på.",
    localSources: ["Industri", "Veitrafikk", "Vedfyring"],
  },
  {
    slug: "skien",
    name: "Skien",
    municipality: "Skien",
    county: "Telemark",
    lat: 59.2096,
    lon: 9.609,
    intro:
      "Skien i Grenland kan ha perioder med stillestående luft i innlandsklimaet. Trafikk, vedfyring og industri i regionen er de typiske kildene.",
    localSources: ["Veitrafikk", "Vedfyring", "Industri"],
  },
  {
    slug: "alesund",
    name: "Ålesund",
    municipality: "Ålesund",
    county: "Møre og Romsdal",
    lat: 62.4722,
    lon: 6.1495,
    intro:
      "Ålesund har et vindfullt kystklima som stort sett gir god gjennomlufting. Trafikk og skipstrafikk i havna er de mest aktuelle lokale kildene.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Veistøv om våren"],
  },
  {
    slug: "lillehammer",
    name: "Lillehammer",
    municipality: "Lillehammer",
    county: "Innlandet",
    lat: 61.1153,
    lon: 10.4662,
    intro:
      "Lillehammer ligger i innlandet med kaldt vinterklima. Vedfyring er en viktig kilde på kalde dager, og kald, stillestående luft kan gi opphopning av svevestøv.",
    localSources: ["Vedfyring", "Veitrafikk", "Inversjon vinterstid"],
  },
  {
    slug: "hamar",
    name: "Hamar",
    municipality: "Hamar",
    county: "Innlandet",
    lat: 61.1145,
    lon: 11.0674,
    intro:
      "Hamar ved Mjøsa har innlandsklima med kalde vinterdager. Vedfyring og trafikk er de typiske lokale kildene, og veistøv kan bli merkbart om våren.",
    localSources: ["Vedfyring", "Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "sandnes",
    name: "Sandnes",
    municipality: "Sandnes",
    county: "Rogaland",
    lat: 58.8524,
    lon: 5.7352,
    intro:
      "Sandnes ligger tett på Stavanger i et område med mye trafikk. Kystklimaet gir ofte god luftutskiftning, men trafikk og veistøv er aktuelle kilder.",
    localSources: ["Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "tonsberg",
    name: "Tønsberg",
    municipality: "Tønsberg",
    county: "Vestfold",
    lat: 59.2674,
    lon: 10.4076,
    intro:
      "Tønsberg i Vestfold har kystnært klima. Trafikk er den viktigste lokale kilden, med bidrag fra vedfyring om vinteren.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "moss",
    name: "Moss",
    municipality: "Moss",
    county: "Østfold",
    lat: 59.459,
    lon: 10.7003,
    intro:
      "Moss har både trafikk, ferjehavn og industri i nærområdet. Langtransportert forurensning fra kontinentet kan tidvis bidra til nivåene.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Industri", "Langtransportert forurensning"],
  },
  {
    slug: "larvik",
    name: "Larvik",
    municipality: "Larvik",
    county: "Vestfold",
    lat: 59.0537,
    lon: 10.0357,
    intro:
      "Larvik ved kysten i Vestfold har vanligvis god luftutskiftning. Trafikk og havnevirksomhet er de mest aktuelle lokale kildene.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Vedfyring"],
  },
  {
    slug: "arendal",
    name: "Arendal",
    municipality: "Arendal",
    county: "Agder",
    lat: 58.461,
    lon: 8.7724,
    intro:
      "Arendal på Sørlandet har mildt kystklima og stort sett god luftkvalitet. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Veistøv om våren"],
  },
];

export const citySlugs = cities.map((c) => c.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const featuredCities = cities.filter((c) => c.featured);

/** Byer sortert alfabetisk på norsk. */
export const citiesAlphabetical = [...cities].sort((a, b) =>
  a.name.localeCompare(b.name, "nb"),
);
