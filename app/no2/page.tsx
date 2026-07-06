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
  title: "Nitrogendioksid (NO₂) og trafikk",
  description:
    "NO₂ forklart: hva nitrogendioksid er, hvorfor trafikk – særlig diesel – er hovedkilden, og hvorfor nivåene er høyest langs veiene i rushtiden.",
  path: "/no2",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Luftkvalitet", path: "/luftkvalitet" },
  { name: "Nitrogendioksid (NO₂)", path: "/no2" },
];

const faq: FaqItem[] = [
  {
    question: "Hva er NO₂?",
    answer:
      "Nitrogendioksid (NO₂) er en gass som dannes ved forbrenning ved høy temperatur, først og fremst i bilmotorer. Den er en av de viktigste trafikkrelaterte forurensningene i norske byer.",
  },
  {
    question: "Hvor er NO₂-nivåene høyest?",
    answer:
      "Tett på sterkt trafikkerte veier og i rushtiden. Nivåene faller raskt med avstanden fra veien, så lufta kan være markant bedre bare noen kvartaler unna.",
  },
  {
    question: "Hvorfor bidrar diesel mer enn bensin?",
    answer:
      "Dieselkjøretøy har historisk sluppet ut mer NO₂ per kjørte kilometer enn bensinbiler. Derfor henger NO₂-nivåene tett sammen med andelen dieselkjøretøy i trafikken.",
  },
];

export default function No2Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={definedTermJsonLd(
          "Nitrogendioksid (NO₂)",
          "En gass som dannes ved forbrenning ved høy temperatur, særlig i kjøretøymotorer. Nivåene er høyest langs trafikkerte veier.",
        )}
      />

      <PageHeader
        crumbs={crumbs}
        title="Nitrogendioksid (NO₂)"
        lead="NO₂ er den mest trafikknære forurensningen. Nivåene er høyest langs de store veiene og i rushtiden, og henger tett sammen med biltrafikken lokalt."
      />

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Prose>
              <h2>Hva er nitrogendioksid?</h2>
              <p>
                Nitrogendioksid (NO₂) er en gass i gruppen nitrogenoksider (NOx).
                Den dannes når noe forbrennes ved høy temperatur – framfor alt i
                bilmotorer, men også ved skipstrafikk og industri. NO₂ er en
                brunlig gass med skarp lukt i høye konsentrasjoner.
              </p>

              <h2>Hvorfor handler NO₂ om trafikk?</h2>
              <p>
                I norske byer er veitrafikk den dominerende kilden til NO₂, og
                dieselkjøretøy bidrar mest. Derfor er nivåene høyest der det er mye
                biltrafikk:
              </p>
              <ul>
                <li>Langs store innfartsårer og sterkt trafikkerte gater.</li>
                <li>I rushtiden morgen og ettermiddag.</li>
                <li>På kalde vinterdager når lufta står stille.</li>
              </ul>
              <p>
                Fordi NO₂ faller raskt med avstanden fra veien, kan lufta være
                betydelig bedre bare et lite stykke unna trafikken.
              </p>

              <h2>Helse</h2>
              <p>
                NO₂ kan irritere luftveiene og forverre astma og andre
                luftveisplager, særlig ved høye nivåer. Personer med astma og KOLS,
                samt barn og eldre, er mer følsomme. Se{" "}
                <Link href="/helse">helse og luftkvalitet</Link> for råd, og{" "}
                <a href="https://www.fhi.no" rel="noopener nofollow" target="_blank">
                  Folkehelseinstituttet
                </a>{" "}
                for grundigere informasjon.
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
                  <Link href="/ozon" className="text-accent hover:text-accent-hover">
                    Bakkenær ozon (O₃)
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
