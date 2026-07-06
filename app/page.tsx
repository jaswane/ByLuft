import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CitySearch } from "@/components/CitySearch";
import { SourceBox } from "@/components/SourceBox";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { citiesAlphabetical, featuredCities } from "@/data/cities";
import { pollutantList } from "@/data/pollutants";
import { pageMetadata, faqJsonLd, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Luftkvalitet i norske byer",
  description:
    "Se hvordan lufta er i norske byer i dag, forklart enkelt. ByLuft.no bygger på offentlige kilder og forklarer svevestøv, NO₂ og ozon – og hva du bør gjøre.",
  path: "/",
});

const faq: FaqItem[] = [
  {
    question: "Hvordan er lufta i byen min i dag?",
    answer:
      "Søk opp byen din øverst på siden, eller velg den i bylisten. På bysiden viser vi et beregnet luftkvalitetsvarsel fra MET Norway med samlet nivå og de viktigste komponentene, sammen med tidspunktet varselet gjelder for. Det er et varsel, ikke en direktemåling.",
  },
  {
    question: "Hva er forskjellen på varsel og måling?",
    answer:
      "Et varsel er en modellberegning av hvordan lufta ventes å bli, mens en måling er en faktisk registrering fra en målestasjon. ByLuft.no viser i dag beregnet varsel fra MET Norway. Faktiske målinger finnes hos Miljødirektoratet.",
  },
  {
    question: "Er dårlig luft farlig for barn og folk med astma?",
    answer:
      "Barn, eldre, gravide og personer med astma, KOLS eller hjerte-/karsykdom er mer følsomme for luftforurensning. Ved høye nivåer bør disse gruppene ta det roligere ute. Se siden om helse for mer utfyllende råd.",
  },
  {
    question: "Bruker ByLuft.no offisielle kilder?",
    answer:
      "Ja. Vi bygger på MET Norway og Miljødirektoratet, og forklarer dataene i et enklere språk. ByLuft.no er ikke en offentlig tjeneste og gir ikke medisinske råd.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />

      {/* Hero + søk */}
      <section className="border-b border-border bg-gradient-to-b from-accent-soft/60 to-background">
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Luftkvalitet i Norge
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Hvordan er lufta i byen din i dag?
            </h1>
            <p className="mt-4 text-lg text-muted">
              ByLuft.no samler offentlige luftkvalitetsdata for norske byer og
              forklarer hva tallene betyr – og hva du bør gjøre når lufta er
              dårlig.
            </p>
          </div>
          <div className="mt-8 max-w-2xl">
            <CitySearch cities={citiesAlphabetical} />
          </div>
        </Container>
      </section>

      {/* Luftkvalitet forklart på 10 sekunder */}
      <Container className="py-14">
        <section
          aria-labelledby="tisekunder"
          className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
        >
          <h2 id="tisekunder" className="text-2xl font-bold tracking-tight">
            Luftkvalitet forklart på 10 sekunder
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold">Hva måles?</h3>
              <p className="mt-1 text-sm text-muted">
                Mest svevestøv (PM2.5 og PM10), nitrogendioksid (NO₂) og ozon
                (O₃). Det er disse som påvirker helsa mest i norske byer.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold">Fire nivåer</h3>
              <p className="mt-1 text-sm text-muted">
                Norsk luftkvalitet deles inn i fire nivåer: lite, moderat, høy og
                svært høy. Jo høyere nivå, jo større grunn til å ta hensyn.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold">Hvem bør passe på?</h3>
              <p className="mt-1 text-sm text-muted">
                Barn, eldre, gravide og folk med luftveis- eller hjertesykdom er
                mer følsomme og bør ta det roligere ute ved høye nivåer.
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm">
            <Link
              href="/luftkvalitet"
              className="font-medium text-accent hover:text-accent-hover"
            >
              Les hele guiden til luftkvalitet →
            </Link>
          </p>
        </section>
      </Container>

      {/* Prioriterte byer */}
      <Container className="pb-14">
        <section aria-labelledby="byer-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="byer-heading" className="text-2xl font-bold tracking-tight">
              Populære byer
            </h2>
            <Link
              href="/byer"
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              Alle byer →
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/luftkvalitet/${c.slug}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent hover:bg-accent-soft/40"
                >
                  <span className="text-lg font-semibold">{c.name}</span>
                  <span className="mt-1 text-sm text-muted">{c.county}</span>
                  <span className="mt-3 text-sm text-accent">
                    Se luftkvalitet →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold text-muted">
            Flere byer
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {citiesAlphabetical
              .filter((c) => !c.featured)
              .map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/luftkvalitet/${c.slug}`}
                    className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent-hover"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </Container>

      {/* Når bør du følge ekstra med */}
      <Container className="pb-14">
        <section
          aria-labelledby="folgmed"
          className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
        >
          <h2 id="folgmed" className="text-2xl font-bold tracking-tight">
            Når bør du følge ekstra med?
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            <li className="rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold">Kalde, vindstille vinterdager</h3>
              <p className="mt-1 text-sm text-muted">
                Kald luft kan bli liggende (inversjon) og samle opp eksos og røyk
                fra vedfyring. Typisk i innlandsbyer og dalfører.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold">Tørre vårdager</h3>
              <p className="mt-1 text-sm text-muted">
                Når veiene tørker opp, virvles veistøv (PM10) opp av trafikken.
                Piggdekk bidrar ekstra.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold">Rushtid langs store veier</h3>
              <p className="mt-1 text-sm text-muted">
                NO₂ fra trafikk er høyest tett på de mest trafikkerte veiene i
                rushtiden.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold">Hvis du er i en følsom gruppe</h3>
              <p className="mt-1 text-sm text-muted">
                Har du astma eller KOLS, er gravid, eldre eller har små barn,
                lønner det seg å sjekke nivået før hard aktivitet ute.
              </p>
            </li>
          </ul>
        </section>
      </Container>

      {/* Komponenter kort */}
      <Container className="pb-14">
        <section aria-labelledby="komponenter-heading">
          <h2
            id="komponenter-heading"
            className="text-2xl font-bold tracking-tight"
          >
            Forstå komponentene
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {pollutantList
              .filter((p) => p.href)
              .map((p) => (
                <li key={p.id}>
                  <Link
                    href={p.href!}
                    className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent hover:bg-accent-soft/40"
                  >
                    <span className="font-semibold">
                      {p.label} – {p.fullName}
                    </span>
                    <span className="mt-1 text-sm text-muted">{p.short}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </Container>

      {/* FAQ + kilder */}
      <Container className="pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <Faq items={faq} />
          <div className="lg:pt-14">
            <SourceBox />
          </div>
        </div>
      </Container>
    </>
  );
}
