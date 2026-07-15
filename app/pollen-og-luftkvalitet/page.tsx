import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { Faq } from "@/components/Faq";
import { SourceBox, type SourceItem } from "@/components/SourceBox";
import { JsonLd } from "@/components/JsonLd";
import {
  pageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  type FaqItem,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pollen og luftkvalitet – hva er forskjellen?",
  description:
    "Pollen og luftforurensning er to ulike ting som begge kan gi luftveisplager. Slik henger de sammen, og hvor du finner pollenvarsel hvis du har allergi eller astma.",
  path: "/pollen-og-luftkvalitet",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Luftkvalitet", path: "/luftkvalitet" },
  { name: "Pollen og luftkvalitet", path: "/pollen-og-luftkvalitet" },
];

const faq: FaqItem[] = [
  {
    question: "Er pollen det samme som luftforurensning?",
    answer:
      "Nei. Pollen er små korn fra planter, trær og gress, mens luftforurensning er partikler og gasser som svevestøv (PM2.5 og PM10), NO₂ og ozon. Begge finnes i lufta og kan gi luftveisplager, men det er ulike ting med ulike kilder og ulikt varsel.",
  },
  {
    question: "Kan dårlig luft gjøre pollenplager verre?",
    answer:
      "For mange oppleves det slik. Både pollen og luftforurensning kan irritere luftveiene, og på dager med både mye pollen og høy luftforurensning kan følsomme personer merke mer plager. Hvor mye avhenger av person og situasjon.",
  },
  {
    question: "Hvor finner jeg pollenvarsel?",
    answer:
      "Det offisielle pollenvarselet for Norge lages av Norges Astma- og Allergiforbund (NAAF). Du finner det på naaf.no. ByLuft lager ikke pollenvarsel selv.",
  },
  {
    question: "Viser ByLuft pollenvarsel?",
    answer:
      "Nei. ByLuft viser beregnet luftkvalitetsvarsel fra MET Norway – altså svevestøv, NO₂ og ozon – ikke pollen. For pollen bør du bruke NAAF sitt pollenvarsel.",
  },
  {
    question: "Bør jeg sjekke både luftkvalitet og pollen?",
    answer:
      "Har du astma eller allergi, kan det være nyttig å følge begge deler, siden de påvirker luftveiene på hver sin måte. Luftkvalitet finner du her på ByLuft, og pollenvarsel hos NAAF.",
  },
];

const sources: SourceItem[] = [
  {
    label: "NAAF – Pollenvarsel",
    href: "https://www.naaf.no/pollenvarsel",
    note: "Offisielt pollenvarsel for Norge.",
  },
  {
    label: "NAAF – Pollenkalender",
    href: "https://www.naaf.no/allergi/pollenallergi/pollenkalender",
    note: "Når de ulike pollentypene er aktuelle gjennom året.",
  },
  {
    label: "Helsenorge",
    href: "https://www.helsenorge.no",
    note: "Helseråd til befolkningen.",
  },
];

export default function PollenPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />

      <PageHeader
        crumbs={crumbs}
        title="Pollen og luftkvalitet"
        lead="Pollen og luftforurensning er to forskjellige ting som begge kan gi luftveisplager. Her forklarer vi forskjellen – og hvor du finner pollenvarsel hvis du har allergi eller astma."
      />

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Prose>
              <h2>Pollen eller luftforurensning – hva er forskjellen?</h2>
              <p>
                Det er lett å blande sammen to ting som begge svever i lufta og
                kan gjøre det tyngre å puste:
              </p>
              <ul>
                <li>
                  <strong>Pollen</strong> er små korn fra trær, gress og planter.
                  Mengden svinger med årstid og vær, og gir typisk plager i{" "}
                  <strong>øyne, nese og luftveier</strong> hos personer med
                  pollenallergi (høysnue).
                </li>
                <li>
                  <strong>Luftforurensning</strong> er partikler og gasser –{" "}
                  <strong>svevestøv (PM2.5 og PM10), NO₂ og ozon</strong> – fra
                  blant annet trafikk og vedfyring. Det er dette ByLuft viser et
                  beregnet varsel for.
                </li>
              </ul>
              <p>
                Med andre ord: pollen kommer fra naturen og handler om allergi,
                mens luftforurensning handler om utslipp og partikler. De har
                ulike kilder og ulike varsler.
              </p>

              <h2>Hvorfor kan begge gi luftveisplager?</h2>
              <p>
                Både pollen og luftforurensning kan irritere slimhinner og
                luftveier. For personer med <strong>astma eller allergi</strong>{" "}
                kan begge deler utløse eller forverre symptomer, og på dager med
                både mye pollen og høy luftforurensning kan noen merke mer plager
                enn hver av delene skulle tilsi. Hvordan det oppleves varierer fra
                person til person.
              </p>
              <p>
                Derfor kan det være nyttig å følge med på begge deler: du finner{" "}
                <Link href="/byer">luftkvaliteten der du bor</Link> her på ByLuft,
                og pollenvarsel hos NAAF (se nedenfor).
              </p>

              <h2>ByLuft viser luftkvalitet, ikke pollen</h2>
              <p>
                For å være tydelig: <strong>ByLuft lager ikke pollenvarsel.</strong>{" "}
                Statuskortene på bysidene er et beregnet luftkvalitetsvarsel fra
                MET Norway, og dekker svevestøv, NO₂ og ozon – ikke pollen.
                Trenger du pollenvarsel, bruk den offisielle kilden.
              </p>

              <h2>Hvor finner jeg pollenvarsel?</h2>
              <p>
                Det offisielle pollenvarselet for Norge lages av{" "}
                <strong>Norges Astma- og Allergiforbund (NAAF)</strong>. Der finner
                du både{" "}
                <a
                  href="https://www.naaf.no/pollenvarsel"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  dagens pollenvarsel
                </a>{" "}
                og en{" "}
                <a
                  href="https://www.naaf.no/allergi/pollenallergi/pollenkalender"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  pollenkalender
                </a>{" "}
                som viser når de ulike pollentypene er aktuelle gjennom året.
              </p>

              <h2>Når bør du søke hjelp?</h2>
              <p>
                Denne siden er generell informasjon, ikke medisinske råd. Har du
                sterke eller vedvarende plager fra pollen eller luft, bør du
                snakke med lege eller apotek om hva som passer for deg. Ved akutte
                pustevansker eller brystsmerter skal du ikke vente – ring{" "}
                <strong>113</strong>. Gode helseråd finner du også hos{" "}
                <a
                  href="https://www.helsenorge.no"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  Helsenorge
                </a>
                .
              </p>
            </Prose>

            <Faq items={faq} />
          </div>

          <aside className="space-y-6">
            <SourceBox sources={sources} title="Kilder" />
            <nav
              aria-label="Relaterte sider"
              className="rounded-xl border border-border bg-surface p-5 text-sm"
            >
              <h2 className="font-semibold">Les mer</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/helse" className="text-accent hover:text-accent-hover">
                    Helse og luftkvalitet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kan-jeg-ga-ut"
                    className="text-accent hover:text-accent-hover"
                  >
                    Kan jeg gå ut når lufta er dårlig?
                  </Link>
                </li>
                <li>
                  <Link href="/svevestov" className="text-accent hover:text-accent-hover">
                    Svevestøv (PM2.5 og PM10)
                  </Link>
                </li>
                <li>
                  <Link href="/byer" className="text-accent hover:text-accent-hover">
                    Sjekk luftkvaliteten der du bor
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
