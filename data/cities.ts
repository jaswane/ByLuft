/**
 * Intern stedsdatabase for ByLuft.no.
 * Koordinater brukes til oppslag mot MET Norway sitt luftkvalitetsvarsel og
 * skal peke på sentrum/tettstedskjernen. Koordinatene er avrundet til
 * 4 desimaler i tråd med MET sine retningslinjer.
 */

export interface City {
  slug: string;
  name: string;
  /** Kommune stedet ligger i (kan være lik navnet) */
  municipality: string;
  /** Fylke (per 2024-inndeling) */
  county: string;
  lat: number;
  lon: number;
  /** Kort, faktabasert beskrivelse av lokale luftkilder og forhold */
  intro: string;
  /** Typiske lokale kilder til luftforurensning */
  localSources: string[];
  /** Er stedet prioritert på forsiden? */
  featured?: boolean;
  /**
   * Populære steder forhåndsgenereres ved build; resten genereres ved første
   * besøk (ISR) for å ikke slå MET-API-et hardt under build.
   */
  popular?: boolean;
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
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
  },
  {
    slug: "bodo",
    name: "Bodø",
    municipality: "Bodø",
    county: "Nordland",
    lat: 67.2827,
    lon: 14.3836,
    intro:
      "Bodø har et værhardt kystklima som ofte gir god luftutskiftning. Trafikk er den viktigste lokale kilden, og nivåene er vanligvis lave.",
    localSources: ["Veitrafikk", "Veistøv om våren"],
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
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
    popular: true,
  },
  {
    slug: "hamar",
    name: "Hamar",
    municipality: "Hamar",
    county: "Innlandet",
    lat: 60.7945,
    lon: 11.068,
    intro:
      "Hamar ved Mjøsa har innlandsklima med kalde vinterdager. Vedfyring og trafikk er de typiske lokale kildene, og veistøv kan bli merkbart om våren.",
    localSources: ["Vedfyring", "Veitrafikk", "Veistøv om våren"],
    popular: true,
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
    popular: true,
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
    popular: true,
  },
  {
    slug: "moss",
    name: "Moss",
    municipality: "Moss",
    county: "Østfold",
    lat: 59.4344,
    lon: 10.6574,
    intro:
      "Moss har både trafikk, ferjehavn og industri i nærområdet. Langtransportert forurensning fra kontinentet kan tidvis bidra til nivåene.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Industri", "Langtransportert forurensning"],
    popular: true,
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
    popular: true,
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
    popular: true,
  },

  // ---- Utvidet stedsdekning (genereres ved første besøk, ISR) ----
  {
    slug: "alta",
    name: "Alta",
    municipality: "Alta",
    county: "Finnmark",
    lat: 69.9689,
    lon: 23.2717,
    intro:
      "Alta har kalde, stille vinterdager der vedfyring og trafikk kan gi merkbart svevestøv i tettstedet.",
    localSources: ["Vedfyring", "Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "askim",
    name: "Askim",
    municipality: "Indre Østfold",
    county: "Østfold",
    lat: 59.5867,
    lon: 11.1633,
    intro:
      "Askim i Indre Østfold har trafikk langs E18-korridoren og vedfyring som de mest aktuelle lokale kildene.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "asker",
    name: "Asker",
    municipality: "Asker",
    county: "Akershus",
    lat: 59.8332,
    lon: 10.4392,
    intro:
      "Asker ligger langs E18 vest for Oslo, og trafikken på hovedveiene er den klart viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Veistøv om våren", "Vedfyring"],
  },
  {
    slug: "sandvika",
    name: "Sandvika",
    municipality: "Bærum",
    county: "Akershus",
    lat: 59.8905,
    lon: 10.5264,
    intro:
      "Sandvika i Bærum ligger der E18 og E16 møtes, og biltrafikk preger luftkvaliteten mer enn i de fleste tettsteder.",
    localSources: ["Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "brevik",
    name: "Brevik",
    municipality: "Porsgrunn",
    county: "Telemark",
    lat: 59.0575,
    lon: 9.7047,
    intro:
      "Brevik i Grenland har både industri og skipstrafikk i nærområdet, i tillegg til trafikk gjennom tettstedet.",
    localSources: ["Industri", "Skipstrafikk", "Veitrafikk"],
  },
  {
    slug: "bryne",
    name: "Bryne",
    municipality: "Time",
    county: "Rogaland",
    lat: 58.7353,
    lon: 5.6478,
    intro:
      "Bryne på Jæren har åpent, vindutsatt landskap som oftest gir god luftutskiftning. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "elverum",
    name: "Elverum",
    municipality: "Elverum",
    county: "Innlandet",
    lat: 60.8819,
    lon: 11.5623,
    intro:
      "Elverum har kaldt innlandsklima der vedfyring på stille vinterdager er den typiske kilden til svevestøv.",
    localSources: ["Vedfyring", "Veitrafikk", "Inversjon vinterstid"],
  },
  {
    slug: "egersund",
    name: "Egersund",
    municipality: "Eigersund",
    county: "Rogaland",
    lat: 58.4517,
    lon: 5.9997,
    intro:
      "Egersund har værhardt kystklima og havnevirksomhet. Lufta er som regel god, med trafikk som viktigste lokale kilde.",
    localSources: ["Veitrafikk", "Skipstrafikk"],
  },
  {
    slug: "fauske",
    name: "Fauske",
    municipality: "Fauske",
    county: "Nordland",
    lat: 67.2588,
    lon: 15.3919,
    intro:
      "Fauske ved Skjerstadfjorden har vedfyring og gjennomgangstrafikk på E6 som de mest aktuelle lokale kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "flekkefjord",
    name: "Flekkefjord",
    municipality: "Flekkefjord",
    county: "Agder",
    lat: 58.2971,
    lon: 6.6598,
    intro:
      "Flekkefjord lengst vest i Agder har mildt kystklima og vanligvis god luft. Trafikk og vedfyring er de typiske kildene.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "forde",
    name: "Førde",
    municipality: "Sunnfjord",
    county: "Vestland",
    lat: 61.4522,
    lon: 5.8544,
    intro:
      "Førde ligger i et dalføre der kald luft kan bli liggende på stille vinterdager. Trafikk og vedfyring er de viktigste kildene.",
    localSources: ["Veitrafikk", "Vedfyring", "Inversjon vinterstid"],
  },
  {
    slug: "gjovik",
    name: "Gjøvik",
    municipality: "Gjøvik",
    county: "Innlandet",
    lat: 60.7957,
    lon: 10.6915,
    intro:
      "Gjøvik ved Mjøsa har innlandsklima med kalde vinterdager der vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "grimstad",
    name: "Grimstad",
    municipality: "Grimstad",
    county: "Agder",
    lat: 58.3405,
    lon: 8.5934,
    intro:
      "Grimstad på Sørlandet har mildt kystklima og som regel god luftkvalitet. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "halden",
    name: "Halden",
    municipality: "Halden",
    county: "Østfold",
    lat: 59.1249,
    lon: 11.3875,
    intro:
      "Halden ved Iddefjorden har trafikk, vedfyring og noe industri som lokale kilder, og kan tidvis merke langtransportert forurensning sørfra.",
    localSources: ["Veitrafikk", "Vedfyring", "Industri", "Langtransportert forurensning"],
  },
  {
    slug: "harstad",
    name: "Harstad",
    municipality: "Harstad",
    county: "Troms",
    lat: 68.7983,
    lon: 16.5416,
    intro:
      "Harstad har kystklima som oftest gir god luftutskiftning. Vedfyring på kalde dager og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk", "Skipstrafikk"],
  },
  {
    slug: "haugesund",
    name: "Haugesund",
    municipality: "Haugesund",
    county: "Rogaland",
    lat: 59.4136,
    lon: 5.268,
    intro:
      "Haugesund har vindfullt kystklima og havneaktivitet. Lufta er som regel god, med trafikk som viktigste lokale kilde.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Veistøv om våren"],
  },
  {
    slug: "holmestrand",
    name: "Holmestrand",
    municipality: "Holmestrand",
    county: "Vestfold",
    lat: 59.4894,
    lon: 10.3129,
    intro:
      "Holmestrand ved Oslofjorden har kystnært klima og vanligvis god luft. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "horten",
    name: "Horten",
    municipality: "Horten",
    county: "Vestfold",
    lat: 59.4172,
    lon: 10.4832,
    intro:
      "Horten ved Oslofjorden har ferjetrafikk og biltrafikk som de mest aktuelle lokale kildene.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Vedfyring"],
  },
  {
    slug: "jessheim",
    name: "Jessheim",
    municipality: "Ullensaker",
    county: "Akershus",
    lat: 60.1416,
    lon: 11.1755,
    intro:
      "Jessheim ligger nær E6 og Gardermoen, og trafikk er den dominerende lokale kilden. Kalde vinterdager kan gi bidrag fra vedfyring.",
    localSources: ["Veitrafikk", "Vedfyring", "Veistøv om våren"],
  },
  {
    slug: "kongsberg",
    name: "Kongsberg",
    municipality: "Kongsberg",
    county: "Buskerud",
    lat: 59.6683,
    lon: 9.6503,
    intro:
      "Kongsberg ligger i Numedalslågens dalføre, der kald luft kan bli liggende på stille vinterdager. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk", "Inversjon vinterstid"],
  },
  {
    slug: "kongsvinger",
    name: "Kongsvinger",
    municipality: "Kongsvinger",
    county: "Innlandet",
    lat: 60.1912,
    lon: 12.0035,
    intro:
      "Kongsvinger ved Glomma har kaldt innlandsklima der vedfyring på stille dager er den typiske kilden til svevestøv.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "kopervik",
    name: "Kopervik",
    municipality: "Karmøy",
    county: "Rogaland",
    lat: 59.2839,
    lon: 5.3069,
    intro:
      "Kopervik på Karmøy har vindfullt kystklima som oftest gir god luftutskiftning. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Skipstrafikk"],
  },
  {
    slug: "kragero",
    name: "Kragerø",
    municipality: "Kragerø",
    county: "Telemark",
    lat: 58.8694,
    lon: 9.4103,
    intro:
      "Kragerø ved Telemarkskysten har mildt kystklima og som regel god luft. Trafikk og vedfyring er de typiske kildene.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "kristiansund",
    name: "Kristiansund",
    municipality: "Kristiansund",
    county: "Møre og Romsdal",
    lat: 63.1105,
    lon: 7.7279,
    intro:
      "Kristiansund har værhardt kystklima med god gjennomlufting. Trafikk og havneaktivitet er de mest aktuelle lokale kildene.",
    localSources: ["Veitrafikk", "Skipstrafikk"],
  },
  {
    slug: "levanger",
    name: "Levanger",
    municipality: "Levanger",
    county: "Trøndelag",
    lat: 63.7464,
    lon: 11.2996,
    intro:
      "Levanger ved Trondheimsfjorden har trafikk og vedfyring som de typiske lokale kildene, med veistøv på tørre vårdager.",
    localSources: ["Veitrafikk", "Vedfyring", "Veistøv om våren"],
  },
  {
    slug: "lillesand",
    name: "Lillesand",
    municipality: "Lillesand",
    county: "Agder",
    lat: 58.2492,
    lon: 8.3776,
    intro:
      "Lillesand på Sørlandet har mildt kystklima og vanligvis god luftkvalitet. Trafikk på E18 og lokalveiene er viktigste kilde.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "lillestrom",
    name: "Lillestrøm",
    municipality: "Lillestrøm",
    county: "Akershus",
    lat: 59.956,
    lon: 11.0504,
    intro:
      "Lillestrøm ligger lavt ved Nitelva øst for Oslo. Trafikk er den viktigste kilden, og kalde, stille vinterdager kan gi opphopning av svevestøv.",
    localSources: ["Veitrafikk", "Vedfyring", "Inversjon vinterstid"],
  },
  {
    slug: "mandal",
    name: "Mandal",
    municipality: "Lindesnes",
    county: "Agder",
    lat: 58.0294,
    lon: 7.4609,
    intro:
      "Mandal lengst sør i landet har mildt kystklima og som regel god luft. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "mo-i-rana",
    name: "Mo i Rana",
    municipality: "Rana",
    county: "Nordland",
    lat: 66.3128,
    lon: 14.1428,
    intro:
      "Mo i Rana har industripark i tillegg til trafikk og vedfyring, og innlandspreget klima der kald luft kan bli liggende i dalen.",
    localSources: ["Industri", "Vedfyring", "Veitrafikk"],
  },
  {
    slug: "molde",
    name: "Molde",
    municipality: "Molde",
    county: "Møre og Romsdal",
    lat: 62.7375,
    lon: 7.1591,
    intro:
      "Molde ved Romsdalsfjorden har kystklima som oftest gir god luftutskiftning. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Vedfyring"],
  },
  {
    slug: "mosjoen",
    name: "Mosjøen",
    municipality: "Vefsn",
    county: "Nordland",
    lat: 65.8369,
    lon: 13.1913,
    intro:
      "Mosjøen ligger i et dalføre med industri i nærområdet. På kalde, stille dager kan vedfyring og industri gi merkbare bidrag.",
    localSources: ["Industri", "Vedfyring", "Veitrafikk"],
  },
  {
    slug: "mysen",
    name: "Mysen",
    municipality: "Indre Østfold",
    county: "Østfold",
    lat: 59.5533,
    lon: 11.3253,
    intro:
      "Mysen i Indre Østfold har trafikk og vedfyring som de mest aktuelle lokale kildene.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "namsos",
    name: "Namsos",
    municipality: "Namsos",
    county: "Trøndelag",
    lat: 64.4665,
    lon: 11.4957,
    intro:
      "Namsos ved Namsenfjorden har kystnært klima og vanligvis god luft. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "narvik",
    name: "Narvik",
    municipality: "Narvik",
    county: "Nordland",
    lat: 68.4385,
    lon: 17.4272,
    intro:
      "Narvik har malmhavn og godstrafikk i tillegg til biltrafikk. Fjellandskapet rundt kan gi stillestående luft på kalde dager.",
    localSources: ["Skipstrafikk", "Veitrafikk", "Vedfyring"],
  },
  {
    slug: "notodden",
    name: "Notodden",
    municipality: "Notodden",
    county: "Telemark",
    lat: 59.5594,
    lon: 9.2585,
    intro:
      "Notodden ved Heddalsvatnet har innlandspreget klima der vedfyring på kalde, stille dager er den typiske kilden.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "odda",
    name: "Odda",
    municipality: "Ullensvang",
    county: "Vestland",
    lat: 60.0693,
    lon: 6.5462,
    intro:
      "Odda ligger trangt til innerst i Sørfjorden med industri i nærområdet. Fjellsidene rundt kan gi stillestående luft på kalde dager.",
    localSources: ["Industri", "Vedfyring", "Veitrafikk"],
  },
  {
    slug: "orkanger",
    name: "Orkanger",
    municipality: "Orkland",
    county: "Trøndelag",
    lat: 63.3099,
    lon: 9.8468,
    intro:
      "Orkanger ved Orkdalsfjorden har industri og havn i tillegg til trafikk og vedfyring som lokale kilder.",
    localSources: ["Industri", "Veitrafikk", "Vedfyring"],
  },
  {
    slug: "raufoss",
    name: "Raufoss",
    municipality: "Vestre Toten",
    county: "Innlandet",
    lat: 60.7259,
    lon: 10.6133,
    intro:
      "Raufoss på Toten har industripark i tillegg til trafikk og vedfyring, i et innlandsklima med kalde vinterdager.",
    localSources: ["Industri", "Vedfyring", "Veitrafikk"],
  },
  {
    slug: "risor",
    name: "Risør",
    municipality: "Risør",
    county: "Agder",
    lat: 58.7204,
    lon: 9.2335,
    intro:
      "Risør ved Sørlandskysten har mildt kystklima og som regel god luft. Trafikk og vedfyring er de typiske kildene.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "sandefjord",
    name: "Sandefjord",
    municipality: "Sandefjord",
    county: "Vestfold",
    lat: 59.1313,
    lon: 10.2166,
    intro:
      "Sandefjord har ferjehavn og mye trafikk langs E18-korridoren. Kystklimaet gir likevel som regel god luftutskiftning.",
    localSources: ["Veitrafikk", "Skipstrafikk", "Veistøv om våren"],
  },
  {
    slug: "ski",
    name: "Ski",
    municipality: "Nordre Follo",
    county: "Akershus",
    lat: 59.7195,
    lon: 10.8357,
    intro:
      "Ski sør for Oslo har biltrafikk som den klart viktigste lokale kilden, med bidrag fra vedfyring om vinteren.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "sogndal",
    name: "Sogndal",
    municipality: "Sogndal",
    county: "Vestland",
    lat: 61.2296,
    lon: 7.1006,
    intro:
      "Sogndal ved Sognefjorden ligger i et dalføre der kald luft kan bli liggende på stille vinterdager. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "sortland",
    name: "Sortland",
    municipality: "Sortland",
    county: "Nordland",
    lat: 68.6944,
    lon: 15.4131,
    intro:
      "Sortland i Vesterålen har kystklima som oftest gir god luftutskiftning. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "stjordal",
    name: "Stjørdal",
    municipality: "Stjørdal",
    county: "Trøndelag",
    lat: 63.4682,
    lon: 10.9263,
    intro:
      "Stjørdal ved Trondheimsfjorden har E6-trafikk og nærhet til Værnes. Trafikk og vedfyring er de mest aktuelle kildene.",
    localSources: ["Veitrafikk", "Vedfyring", "Veistøv om våren"],
  },
  {
    slug: "steinkjer",
    name: "Steinkjer",
    municipality: "Steinkjer",
    county: "Trøndelag",
    lat: 64.0148,
    lon: 11.4954,
    intro:
      "Steinkjer innerst i Trondheimsfjorden har vedfyring og trafikk som de typiske lokale kildene.",
    localSources: ["Vedfyring", "Veitrafikk", "Veistøv om våren"],
  },
  {
    slug: "stord",
    name: "Stord",
    municipality: "Stord",
    county: "Vestland",
    lat: 59.7797,
    lon: 5.5005,
    intro:
      "Leirvik på Stord har kystklima og industri knyttet til verftsvirksomhet. Lufta er som regel god, med trafikk som viktigste kilde.",
    localSources: ["Veitrafikk", "Industri", "Skipstrafikk"],
  },
  {
    slug: "svolvaer",
    name: "Svolvær",
    municipality: "Vågan",
    county: "Nordland",
    lat: 68.2343,
    lon: 14.5683,
    intro:
      "Svolvær i Lofoten har værhardt kystklima som oftest gir god luftutskiftning. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk", "Skipstrafikk"],
  },
  {
    slug: "tvedestrand",
    name: "Tvedestrand",
    municipality: "Tvedestrand",
    county: "Agder",
    lat: 58.622,
    lon: 8.9319,
    intro:
      "Tvedestrand ved Sørlandskysten har mildt kystklima og som regel god luft. Trafikk er den viktigste lokale kilden.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "vadso",
    name: "Vadsø",
    municipality: "Vadsø",
    county: "Finnmark",
    lat: 70.0744,
    lon: 29.7487,
    intro:
      "Vadsø ved Varangerfjorden har arktisk kystklima. Vedfyring på kalde dager og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "vennesla",
    name: "Vennesla",
    municipality: "Vennesla",
    county: "Agder",
    lat: 58.2698,
    lon: 7.9738,
    intro:
      "Vennesla ligger i Otradalen nord for Kristiansand, der kald luft kan bli liggende på stille vinterdager. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "verdal",
    name: "Verdal",
    municipality: "Verdal",
    county: "Trøndelag",
    lat: 63.792,
    lon: 11.482,
    intro:
      "Verdal ved Trondheimsfjorden har industripark i tillegg til trafikk og vedfyring som lokale kilder.",
    localSources: ["Industri", "Veitrafikk", "Vedfyring"],
  },
  {
    slug: "volda",
    name: "Volda",
    municipality: "Volda",
    county: "Møre og Romsdal",
    lat: 62.1479,
    lon: 6.0707,
    intro:
      "Volda ved Voldsfjorden har kystnært klima og vanligvis god luft. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "voss",
    name: "Voss",
    municipality: "Voss",
    county: "Vestland",
    lat: 60.6289,
    lon: 6.4419,
    intro:
      "Voss ligger i et innlandsdalføre der kald luft kan bli liggende på stille vinterdager. Vedfyring er den typiske kilden til svevestøv.",
    localSources: ["Vedfyring", "Veitrafikk", "Inversjon vinterstid"],
  },
  {
    slug: "algard",
    name: "Ålgård",
    municipality: "Gjesdal",
    county: "Rogaland",
    lat: 58.7646,
    lon: 5.8508,
    intro:
      "Ålgård sør for Sandnes har E39-trafikk som den viktigste lokale kilden, i et ellers vindutsatt jærlandskap.",
    localSources: ["Veitrafikk", "Vedfyring"],
  },
  {
    slug: "andalsnes",
    name: "Åndalsnes",
    municipality: "Rauma",
    county: "Møre og Romsdal",
    lat: 62.5675,
    lon: 7.687,
    intro:
      "Åndalsnes ligger trangt til i Romsdalen, der kald luft kan bli liggende mellom fjellene på stille vinterdager. Vedfyring og trafikk er de typiske kildene.",
    localSources: ["Vedfyring", "Veitrafikk"],
  },
  {
    slug: "honefoss",
    name: "Hønefoss",
    municipality: "Ringerike",
    county: "Buskerud",
    lat: 60.1699,
    lon: 10.2557,
    intro:
      "Hønefoss har innlandspreget klima og mye gjennomgangstrafikk. Vedfyring bidrar på kalde, stille vinterdager.",
    localSources: ["Veitrafikk", "Vedfyring", "Veistøv om våren"],
  },
  {
    slug: "hammerfest",
    name: "Hammerfest",
    municipality: "Hammerfest",
    county: "Finnmark",
    lat: 70.6634,
    lon: 23.6821,
    intro:
      "Hammerfest har arktisk kystklima og energianlegg i nærområdet. Vedfyring og trafikk er de typiske lokale kildene.",
    localSources: ["Vedfyring", "Veitrafikk", "Industri"],
  },
  {
    slug: "kirkenes",
    name: "Kirkenes",
    municipality: "Sør-Varanger",
    county: "Finnmark",
    lat: 69.7269,
    lon: 30.0451,
    intro:
      "Kirkenes lengst nordøst i landet har kalde vinterdager der vedfyring er den typiske kilden. Havn og trafikk bidrar også.",
    localSources: ["Vedfyring", "Veitrafikk", "Skipstrafikk"],
  },
];

export const citySlugs = cities.map((c) => c.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const featuredCities = cities.filter((c) => c.featured);

/** Populære steder forhåndsgenereres ved build. */
export const popularCities = cities.filter((c) => c.popular);

/**
 * De viktigste/største byene i prioritert rekkefølge (ikke alfabetisk).
 * Brukes til hurtigvalg i heroen på forsiden.
 */
const majorCitySlugs = [
  "oslo",
  "bergen",
  "trondheim",
  "stavanger",
  "drammen",
  "kristiansand",
  "tromso",
  "bodo",
  "fredrikstad",
  "sandnes",
  "alesund",
  "tonsberg",
] as const;

export const majorCities: City[] = majorCitySlugs
  .map((slug) => getCity(slug))
  .filter((c): c is City => c !== undefined);

/** Steder sortert alfabetisk på norsk. */
export const citiesAlphabetical = [...cities].sort((a, b) =>
  a.name.localeCompare(b.name, "nb"),
);
