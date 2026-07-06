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
  title: "Svevestøv (PM2.5 og PM10) – hva er det?",
  description:
    "Svevestøv forklart: forskjellen på PM2.5 og PM10, hvor partiklene kommer fra (veistøv, vedfyring, eksos), og hvorfor de påvirker helsa.",
  path: "/svevestov",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Luftkvalitet", path: "/luftkvalitet" },
  { name: "Svevestøv", path: "/svevestov" },
];

const faq: FaqItem[] = [
  {
    question: "Hva er forskjellen på PM2.5 og PM10?",
    answer:
      "Tallet viser partikkelstørrelsen i mikrometer. PM10 er partikler under 10 µm, ofte veistøv. PM2.5 er de enda mindre partiklene under 2,5 µm, som trekker dypere ned i lungene. PM2.5 regnes som mest helseskadelig.",
  },
  {
    question: "Hvor kommer svevestøvet i byer fra?",
    answer:
      "PM10 er i stor grad veistøv fra asfalt- og dekkslitasje, særlig med piggdekk. PM2.5 kommer mest fra forbrenning – vedfyring og eksos – i tillegg til langtransportert forurensning fra kontinentet.",
  },
  {
    question: "Når er svevestøv verst?",
    answer:
      "PM10 topper seg gjerne på tørre vårdager når veiene tørker opp og støv virvles opp av trafikken. PM2.5 er ofte høyest på kalde vinterdager med mye vedfyring og stillestående luft.",
  },
];

export default function SvevestovPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={definedTermJsonLd(
          "Svevestøv (PM2.5 og PM10)",
          "Små partikler i lufta, målt i mikrometer. PM2.5 er partikler under 2,5 µm, PM10 er partikler under 10 µm. Kilder er blant annet veistøv, vedfyring og eksos.",
        )}
      />

      <PageHeader
        crumbs={crumbs}
        title="Svevestøv: PM2.5 og PM10"
        lead="Svevestøv er små partikler i lufta. De minste partiklene trekker dypest ned i lungene og regnes som den viktigste helsetrusselen fra luftforurensning i norske byer."
      />

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Prose>
              <h2>Hva betyr PM2.5 og PM10?</h2>
              <p>
                «PM» står for <em>particulate matter</em>, altså partikler. Tallet
                er den øvre størrelsen i mikrometer (µm, tusendels millimeter):
              </p>
              <ul>
                <li>
                  <strong>PM10</strong> – partikler under 10 µm. En stor del er
                  grovt veistøv fra asfalt- og dekkslitasje.
                </li>
                <li>
                  <strong>PM2.5</strong> – partikler under 2,5 µm. Så små at de går
                  dypt ned i lungene og kan gå over i blodet. Kommer mest fra
                  forbrenning.
                </li>
              </ul>
              <p>
                Til sammenligning er et menneskehår rundt 50–70 µm tykt. PM2.5 er
                altså mange ganger tynnere enn et hårstrå.
              </p>

              <h2>Hvor kommer svevestøvet fra?</h2>
              <p>
                I norske byer er de tre viktigste kildene:
              </p>
              <ul>
                <li>
                  <strong>Veistøv</strong> – oppvirvlet asfalt- og dekkslitasje,
                  særlig fra piggdekk på tørre vårdager. Bidrar mest til PM10.
                </li>
                <li>
                  <strong>Vedfyring</strong> – en viktig kilde til PM2.5 på kalde
                  vinterdager.
                </li>
                <li>
                  <strong>Eksos</strong> – forbrenning i bilmotorer gir fine
                  partikler.
                </li>
              </ul>
              <p>
                I tillegg kan <strong>langtransportert forurensning</strong> fra
                andre land bidra når vinden kommer fra sør.
              </p>

              <h2>Hvorfor er svevestøv et helseproblem?</h2>
              <p>
                Fordi partiklene er små, kan de pustes langt ned i luftveiene. Det
                kan irritere luftveiene og forverre plager for personer med astma
                og KOLS, og over tid er svevestøv knyttet til hjerte- og
                karsykdom. Barn, eldre, gravide og personer med kroniske sykdommer
                er mer følsomme. Utfyllende helseinformasjon finner du hos{" "}
                <a
                  href="https://www.fhi.no"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  Folkehelseinstituttet
                </a>
                .
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
                  <Link href="/luftkvalitet" className="text-accent hover:text-accent-hover">
                    Luftkvalitet forklart
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
