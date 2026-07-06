import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CitySearch } from "@/components/CitySearch";
import { LocationAirQuality } from "@/components/LocationAirQuality";
import { JsonLd } from "@/components/JsonLd";
import { citiesAlphabetical, type City } from "@/data/cities";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Luftkvalitet i norske byer og tettsteder – oversikt",
  description:
    "Oversikt over norske byer og tettsteder med luftkvalitet forklart. Velg sted for å se dagens beregnede luftkvalitetsvarsel, komponenter og helseråd.",
  path: "/byer",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Byer", path: "/byer" },
];

/** Grupperer stedene alfabetisk på forbokstav for oversiktlig visning. */
function groupByLetter(cities: City[]): Array<[string, City[]]> {
  const groups = new Map<string, City[]>();
  for (const city of cities) {
    const letter = city.name[0].toUpperCase();
    const group = groups.get(letter);
    if (group) {
      group.push(city);
    } else {
      groups.set(letter, [city]);
    }
  }
  return [...groups.entries()];
}

export default function ByerPage() {
  const groups = groupByLetter(citiesAlphabetical);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Luftkvalitet i norske byer og tettsteder"
        lead={`Velg blant ${citiesAlphabetical.length} steder for å se dagens beregnede luftkvalitetsvarsel, de viktigste komponentene og hva du bør gjøre.`}
      />

      <Container className="py-10">
        <div className="mb-6 max-w-2xl">
          <CitySearch cities={citiesAlphabetical} />
        </div>
        <div id="min-lokasjon" className="mb-10 max-w-2xl">
          <LocationAirQuality />
        </div>

        <h2 className="sr-only">Alle steder, alfabetisk</h2>
        <div className="space-y-8">
          {groups.map(([letter, group]) => (
            <section key={letter} aria-labelledby={`bokstav-${letter}`}>
              <h3
                id={`bokstav-${letter}`}
                className="border-b border-border pb-2 text-lg font-bold text-accent"
              >
                {letter}
              </h3>
              <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/luftkvalitet/${c.slug}`}
                      className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent-soft"
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-sm text-muted">{c.county}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Savner du et sted? Vi legger til flere etter hvert. I mellomtiden
          finner du hele landet dekket hos den offisielle tjenesten{" "}
          <a
            href="https://luftkvalitet.miljodirektoratet.no"
            className="text-accent hover:text-accent-hover"
            rel="noopener nofollow"
            target="_blank"
          >
            Luftkvalitet i Norge
          </a>
          .
        </p>
      </Container>
    </>
  );
}
