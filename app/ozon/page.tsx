import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { Faq } from "@/components/Faq";
import { SourceBox } from "@/components/SourceBox";
import { JsonLd } from "@/components/JsonLd";
import {
  pageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  definedTermJsonLd,
  type FaqItem,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bakkenær ozon (O₃) forklart",
  description:
    "Bakkenær ozon forklart: hvordan ozon dannes når sollys reagerer med andre forurensninger, når nivåene er høyest, og hvorfor de kan være høyere utenfor bysentrum.",
  path: "/ozon",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Luftkvalitet", path: "/luftkvalitet" },
  { name: "Bakkenær ozon (O₃)", path: "/ozon" },
];

const faq: FaqItem[] = [
  {
    question: "Hva er bakkenær ozon?",
    answer:
      "Bakkenær ozon (O₃) er ozon nede ved bakken, der vi puster. I motsetning til ozonlaget høyt oppe i atmosfæren, som beskytter mot UV-stråling, er ozon nede ved bakken en forurensning som kan irritere luftveiene.",
  },
  {
    question: "Hvorfor er ozon ofte høyest på solrike dager?",
    answer:
      "Ozon slippes ikke ut direkte, men dannes når sollys får andre forurensninger til å reagere. Derfor stiger nivåene gjerne på varme, solrike dager, særlig om våren og sommeren.",
  },
  {
    question: "Hvorfor kan ozon være høyere utenfor sentrum?",
    answer:
      "Nær trafikk brytes ozon delvis ned av frisk eksos. Litt unna de mest trafikkerte områdene, for eksempel i utkanten av byen, kan ozonnivåene derfor være høyere.",
  },
];

export default function OzonPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={definedTermJsonLd(
          "Bakkenær ozon (O₃)",
          "Ozon nede ved bakken, dannet når sollys reagerer med andre forurensninger. Kan irritere luftveiene og er ofte høyest på solrike dager.",
        )}
      />

      <PageHeader
        crumbs={crumbs}
        title="Bakkenær ozon (O₃)"
        lead="Ozon nær bakken dannes når sollys reagerer med andre forurensninger. Nivåene er ofte høyest på varme, solrike dager – og kan være høyere i utkanten av byen enn i sentrum."
      />

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Prose>
              <h2>To slags ozon</h2>
              <p>
                Det er lett å blande sammen to helt ulike ting:
              </p>
              <ul>
                <li>
                  <strong>Ozonlaget</strong> høyt oppe i atmosfæren beskytter oss
                  mot skadelig UV-stråling. Det er bra.
                </li>
                <li>
                  <strong>Bakkenær ozon</strong> nede der vi puster er en
                  forurensning som kan irritere luftveiene.
                </li>
              </ul>

              <h2>Hvordan dannes bakkenær ozon?</h2>
              <p>
                Ozon slippes ikke ut direkte fra en pipe eller et eksosrør. I
                stedet dannes det gjennom kjemiske reaksjoner der sollys spiller en
                nøkkelrolle: sollyset får nitrogenoksider og flyktige organiske
                forbindelser til å reagere, og resultatet er ozon. Derfor kalles
                det ofte fotokjemisk forurensning.
              </p>
              <p>
                Dette forklarer to typiske trekk ved ozon:
              </p>
              <ul>
                <li>
                  Nivåene er høyest på <strong>varme, solrike dager</strong>, ofte
                  om ettermiddagen.
                </li>
                <li>
                  Nivåene kan være <strong>høyere i utkanten av byen</strong> enn i
                  sentrum, fordi frisk eksos nær trafikken bryter ned noe av ozonet.
                </li>
              </ul>

              <h2>Helse</h2>
              <p>
                Bakkenær ozon kan irritere øyne og luftveier og gjøre det
                vanskeligere å puste ved hard aktivitet, særlig for personer med
                astma. På dager med høye nivåer kan det være lurt å legge hard
                trening til morgenen, når ozonnivåene ofte er lavere. Se{" "}
                <Link href="/helse">helse og luftkvalitet</Link> for mer.
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
                    Svevestøv (PM2.5 og PM10)
                  </Link>
                </li>
                <li>
                  <Link href="/no2" className="text-accent hover:text-accent-hover">
                    Nitrogendioksid (NO₂)
                  </Link>
                </li>
                <li>
                  <Link href="/helse" className="text-accent hover:text-accent-hover">
                    Helse og luftkvalitet
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
