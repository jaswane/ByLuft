import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CitySearch } from "@/components/CitySearch";
import { JsonLd } from "@/components/JsonLd";
import { citiesAlphabetical } from "@/data/cities";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Luftkvalitet i norske byer – oversikt",
  description:
    "Oversikt over norske byer med luftkvalitet forklart. Velg by for å se dagens beregnede luftkvalitetsvarsel, komponenter og helseråd.",
  path: "/byer",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Byer", path: "/byer" },
];

export default function ByerPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Luftkvalitet i norske byer"
        lead="Velg byen din for å se dagens beregnede luftkvalitetsvarsel, de viktigste komponentene og hva du bør gjøre. Listen utvides over tid."
      />

      <Container className="py-10">
        <div className="mb-10 max-w-2xl">
          <CitySearch cities={citiesAlphabetical} />
        </div>

        <h2 className="sr-only">Alle byer</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {citiesAlphabetical.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/luftkvalitet/${c.slug}`}
                className="flex h-full items-center justify-between gap-3 rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-accent hover:bg-accent-soft/40"
              >
                <span>
                  <span className="block font-semibold">{c.name}</span>
                  <span className="block text-sm text-muted">{c.county}</span>
                </span>
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          Savner du en by? Vi legger til flere steder etter hvert. I mellomtiden
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
