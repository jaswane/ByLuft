import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { Faq } from "@/components/Faq";
import { SourceBox } from "@/components/SourceBox";
import { JsonLd } from "@/components/JsonLd";
import { aqiLevels } from "@/lib/airquality/aqi";
import { pollutantList } from "@/data/pollutants";
import {
  pageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  type FaqItem,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Luftkvalitet i Norge – enkel guide",
  description:
    "Hva betyr luftkvalitet, og hvordan leser du nivåene? Guide til svevestøv, NO₂ og ozon, den norske luftkvalitetsindeksen og forskjellen på varsel og måling.",
  path: "/luftkvalitet",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Luftkvalitet", path: "/luftkvalitet" },
];

const faq: FaqItem[] = [
  {
    question: "Hva er luftkvalitet?",
    answer:
      "Luftkvalitet beskriver hvor mye forurensning det er i lufta vi puster inn. I byer måles og beregnes særlig svevestøv (PM2.5 og PM10), nitrogendioksid (NO₂) og bakkenær ozon (O₃), fordi disse påvirker helsa mest.",
  },
  {
    question: "Hva er forskjellen på varsel, måling og beregnet luftkvalitet?",
    answer:
      "En måling er en faktisk registrering fra en målestasjon. Et varsel er en modellberegning av hvordan lufta ventes å bli framover. Beregnet luftkvalitet bruker modeller til å anslå nivåer også der det ikke står en stasjon. ByLuft.no viser i dag beregnet varsel fra MET Norway.",
  },
  {
    question: "Hva betyr de fire nivåene?",
    answer:
      "Den norske luftkvalitetsindeksen har fire nivåer: lite, moderat, høy og svært høy. «Lite» betyr liten helserisiko, mens «svært høy» betyr at følsomme grupper bør være mest mulig inne. Nivået sier noe om hvor mye hensyn du bør ta.",
  },
  {
    question: "Kan lufta være dårligere enn varselet viser?",
    answer:
      "Ja. Luftkvalitet varierer lokalt. Rett ved en trafikkert vei kan nivåene være høyere enn et områdevarsel tilsier, mens de kan være lavere i en park. Varselet er et godt utgangspunkt, men ikke en måling på ditt eksakte sted.",
  },
];

export default function LuftkvalitetGuidePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />

      <PageHeader
        crumbs={crumbs}
        title="Luftkvalitet i Norge, forklart enkelt"
        lead="En kort guide til hva luftkvalitet er, hvilke komponenter som følges med på, hvordan du leser nivåene, og hva forskjellen er på varsel og måling."
      />

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <Prose>
              <p>
                Luftkvalitet handler om hvor rein eller forurenset lufta er der du
                bor og ferdes. I norske byer er de viktigste kildene veitrafikk,
                vedfyring og – på tørre vårdager – veistøv. I tillegg kan
                forurensning fra kontinentet transporteres hit med vinden.
              </p>

              <h2>Komponentene du bør kjenne</h2>
              <p>
                Fire komponenter går igjen når luftkvalitet omtales i Norge. Klikk
                deg videre for en grundigere forklaring av hver enkelt.
              </p>
            </Prose>

            <ul className="grid gap-3 sm:grid-cols-2">
              {pollutantList.map((p) => (
                <li key={p.id}>
                  {p.href ? (
                    <Link
                      href={p.href}
                      className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent hover:bg-accent-soft/40"
                    >
                      <span className="font-semibold">
                        {p.label} – {p.fullName}
                      </span>
                      <span className="mt-1 text-sm text-muted">{p.short}</span>
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-5">
                      <span className="font-semibold">
                        {p.label} – {p.fullName}
                      </span>
                      <span className="mt-1 text-sm text-muted">{p.short}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <section aria-labelledby="nivaer">
              <h2 id="nivaer" className="text-2xl font-bold tracking-tight">
                De fire nivåene
              </h2>
              <p className="mt-3 max-w-prose text-foreground/90">
                Den norske luftkvalitetsindeksen deler lufta inn i fire nivåer.
                Fargen støttes alltid av tekst, slik at nivået er tydelig
                uavhengig av fargesyn.
              </p>
              <ul className="mt-5 space-y-3">
                {Object.values(aqiLevels).map((lvl) => (
                  <li
                    key={lvl.level}
                    className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: lvl.softColorVar,
                        color: lvl.colorVar,
                        border: `1px solid ${lvl.colorVar}`,
                      }}
                    >
                      {lvl.symbol}
                    </span>
                    <div>
                      <p className="font-semibold">
                        {lvl.label}{" "}
                        <span className="font-normal text-muted">
                          – {lvl.riskShort}
                        </span>
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {lvl.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <Prose>
              <h2>Varsel eller måling?</h2>
              <p>
                Det er lett å blande sammen tre ord som brukes om luftkvalitet:
              </p>
              <ul>
                <li>
                  <strong>Måling</strong> er en faktisk registrering fra en fysisk
                  målestasjon.
                </li>
                <li>
                  <strong>Varsel</strong> er en beregning av hvordan lufta ventes å
                  bli framover.
                </li>
                <li>
                  <strong>Beregnet luftkvalitet</strong> bruker modeller til å
                  anslå nivåer også der det ikke står en stasjon.
                </li>
              </ul>
              <p>
                ByLuft.no viser i dag <strong>beregnet varsel</strong> fra MET
                Norway på bysidene. Faktiske målinger fra stasjoner finner du hos{" "}
                <a
                  href="https://luftkvalitet.miljodirektoratet.no"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  Miljødirektoratet
                </a>
                .
              </p>

              <h2>Hvorfor er lufta ofte dårligst om vinteren?</h2>
              <p>
                På kalde, vindstille dager kan et lokk av varmere luft legge seg
                over den kalde lufta ved bakken. Da blir forurensning fra eksos og
                vedfyring liggende i stedet for å blåse vekk. Dette kalles
                inversjon og rammer særlig byer i dalfører. Om våren tar veistøv
                over som den typiske utfordringen.
              </p>
            </Prose>

            <Faq items={faq} />
          </div>

          <aside className="space-y-6">
            <SourceBox />
            <nav
              aria-label="Relaterte sider"
              className="rounded-xl border border-border bg-surface p-5 text-sm"
            >
              <h2 className="font-semibold">Les mer</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/svevestov" className="text-accent hover:text-accent-hover">
                    Svevestøv: PM2.5 og PM10
                  </Link>
                </li>
                <li>
                  <Link href="/no2" className="text-accent hover:text-accent-hover">
                    Nitrogendioksid (NO₂)
                  </Link>
                </li>
                <li>
                  <Link href="/ozon" className="text-accent hover:text-accent-hover">
                    Bakkenær ozon (O₃)
                  </Link>
                </li>
                <li>
                  <Link href="/helse" className="text-accent hover:text-accent-hover">
                    Helse og luftkvalitet
                  </Link>
                </li>
                <li>
                  <Link href="/byer" className="text-accent hover:text-accent-hover">
                    Luftkvalitet i byer
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </Container>
    </>
  );
}
