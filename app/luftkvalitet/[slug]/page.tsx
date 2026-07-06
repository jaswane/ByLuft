import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AirQualityCard } from "@/components/AirQualityCard";
import { HealthAdvice } from "@/components/HealthAdvice";
import { SourceBox } from "@/components/SourceBox";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { cities, citySlugs, getCity } from "@/data/cities";
import { getAirQualityForCity } from "@/lib/airquality/met";
import { formatDateTime } from "@/lib/format";
import {
  pageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  type FaqItem,
} from "@/lib/seo";

// Forny sidene periodisk (ISR). MET oppdaterer time for time.
export const revalidate = 1800;

export function generateStaticParams() {
  return citySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) {
    return pageMetadata({
      title: "Byen finnes ikke",
      description: "Fant ikke denne byen.",
      path: `/luftkvalitet/${slug}`,
      index: false,
    });
  }
  return pageMetadata({
    title: `Luftkvalitet i ${city.name} i dag`,
    description: `Dagens beregnede luftkvalitet i ${city.name} (${city.county}): svevestøv, NO₂ og ozon forklart, med helseråd og kilde. Basert på MET Norway.`,
    path: `/luftkvalitet/${city.slug}`,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const result = await getAirQualityForCity(city);
  const updated = formatDateTime(result.reftime);

  const crumbs = [
    { name: "Hjem", path: "/" },
    { name: "Byer", path: "/byer" },
    { name: city.name, path: `/luftkvalitet/${city.slug}` },
  ];

  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 6);

  const faq: FaqItem[] = [
    {
      question: `Hvordan er luftkvaliteten i ${city.name} akkurat nå?`,
      answer:
        `Statuskortet øverst viser det nyeste beregnede luftkvalitetsvarselet for ${city.name} fra MET Norway, med samlet nivå og de viktigste komponentene. ` +
        `Er data utilgjengelig, sier vi tydelig fra i stedet for å vise gjettede tall.`,
    },
    {
      question: `Hva er de vanligste kildene til dårlig luft i ${city.name}?`,
      answer: `De mest aktuelle lokale kildene er ${city.localSources
        .join(", ")
        .toLowerCase()}. Hvor mye hver kilde bidrar varierer med vær og årstid.`,
    },
    {
      question: "Er varselet det samme som lufta akkurat der jeg er?",
      answer:
        "Nei. Varselet er en beregning for et område og fanger ikke opp alle lokale forskjeller. Rett ved en sterkt trafikkert vei kan lufta være dårligere enn varselet tilsier, mens den kan være bedre i en park eller i høyden.",
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />

      <div className="border-b border-border bg-surface">
        <Container className="py-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Luftkvalitet i {city.name}
          </h1>
          <p className="mt-2 text-muted">
            {city.municipality} kommune · {city.county}
          </p>
        </Container>
      </div>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <AirQualityCard city={city} result={result} />

            <section aria-labelledby="om-byen" className="max-w-prose">
              <h2 id="om-byen" className="text-xl font-bold tracking-tight">
                Om lufta i {city.name}
              </h2>
              <p className="mt-3 leading-relaxed text-foreground/90">
                {city.intro}
              </p>

              <h3 className="mt-6 font-semibold">Typiske lokale kilder</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {city.localSources.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 font-semibold">Sesongvariasjon</h3>
              <p className="mt-2 leading-relaxed text-foreground/90">
                Luftkvaliteten svinger gjennom året. Om vinteren bidrar vedfyring
                og eksos, og kald, stillestående luft kan gi opphopning av
                svevestøv og NO₂. Om våren kommer veistøv (PM10) når veiene tørker
                opp. Om sommeren er nivåene ofte lave, men bakkenær ozon kan stige
                på varme, solrike dager.
              </p>
            </section>

            <HealthAdvice level={result.overallLevel} />

            <Faq items={faq} />
          </div>

          <aside className="space-y-6">
            <SourceBox updated={updated} />

            <section
              aria-labelledby="andre-byer"
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h2 id="andre-byer" className="font-semibold">
                Andre byer
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {otherCities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/luftkvalitet/${c.slug}`}
                      className="text-accent hover:text-accent-hover"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm">
                <Link
                  href="/byer"
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  Se alle byer →
                </Link>
              </p>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5 text-sm">
              <h2 className="font-semibold">Offisiell kilde</h2>
              <p className="mt-2 text-muted">
                Vil du se faktiske målinger fra stasjoner? Miljødirektoratets
                tjeneste dekker hele landet.
              </p>
              <a
                href="https://luftkvalitet.miljodirektoratet.no"
                className="mt-2 inline-block font-medium text-accent hover:text-accent-hover"
                rel="noopener nofollow"
                target="_blank"
              >
                Luftkvalitet i Norge →
              </a>
            </section>
          </aside>
        </div>
      </Container>
    </>
  );
}
