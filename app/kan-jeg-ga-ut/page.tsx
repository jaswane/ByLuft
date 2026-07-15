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
  title: "Kan jeg gå ut når luftkvaliteten er dårlig?",
  description:
    "Praktisk guide: når kan du være ute som normalt, når bør barn, eldre og personer med astma ta hensyn, og hva gjør du ved høy luftforurensning?",
  path: "/kan-jeg-ga-ut",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Luftkvalitet", path: "/luftkvalitet" },
  { name: "Kan jeg gå ut?", path: "/kan-jeg-ga-ut" },
];

const faq: FaqItem[] = [
  {
    question: "Kan jeg gå ut når luftkvaliteten er dårlig?",
    answer:
      "For de fleste er svaret ja. Selv ved nivået «høy» handler rådene først og fremst om å dempe langvarig, hard fysisk aktivitet utendørs – ikke om å holde seg inne. Følsomme grupper bør ta mer hensyn, og ved «svært høy» bør de være mest mulig inne.",
  },
  {
    question: "Er lufta trygg i dag?",
    answer:
      "Sjekk det beregnede varselet for stedet ditt. Ved «lite» og «moderat» kan de aller fleste være ute som normalt. Ved «høy» og «svært høy» bør du ta mer hensyn, særlig hvis du er i en følsom gruppe. Husk at lufta kan variere lokalt – den er ofte dårligst rett ved trafikkerte veier.",
  },
  {
    question: "Hva betyr dårlig luftkvalitet?",
    answer:
      "I den norske luftkvalitetsindeksen betyr «dårlig luft» vanligvis nivåene «høy» eller «svært høy» – altså at konsentrasjonen av svevestøv, NO₂ eller ozon er så høy at den kan gi helseeffekter, først og fremst for følsomme grupper.",
  },
  {
    question: "Bør barn holdes inne når lufta er dårlig?",
    answer:
      "Som regel ikke. Ved «høy» er rådet å dempe hard og langvarig lek og aktivitet ute, og gjerne velge områder unna sterkt trafikkerte veier. Ved «svært høy» bør barn være mest mulig inne. Vanlig utelek ved «lite» og «moderat» er uproblematisk for de aller fleste barn.",
  },
  {
    question: "Hva gjør jeg hvis jeg får pustebesvær ute?",
    answer:
      "Gå inn, ta det med ro, og bruk eventuelle medisiner du har fått av lege. Gir ikke plagene seg, kontakt lege eller legevakt (116 117). Ved akutt og alvorlig pustebesvær, ring 113. ByLuft gir ikke medisinske råd.",
  },
];

const sources: SourceItem[] = [
  {
    label: "Helsenorge",
    href: "https://www.helsenorge.no",
    note: "Helseråd til befolkningen.",
  },
  {
    label: "Folkehelseinstituttet (FHI)",
    href: "https://www.fhi.no",
    note: "Helseeffekter av luftforurensning.",
  },
  {
    label: "Miljødirektoratet – Luftkvalitet i Norge",
    href: "https://luftkvalitet.miljodirektoratet.no",
    note: "Offisielle råd ved luftforurensning.",
  },
];

export default function KanJegGaUtPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />

      <PageHeader
        crumbs={crumbs}
        title="Kan jeg gå ut når luftkvaliteten er dårlig?"
        lead="Som regel ja. Her er en praktisk guide til når du kan være ute som normalt, når du bør ta mer hensyn, og hva du kan gjøre når luftforurensningen er høy."
      />

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Prose>
              <h2>Når kan de fleste være ute som normalt?</h2>
              <p>
                Ved nivåene <strong>«lite»</strong> og <strong>«moderat»</strong>{" "}
                i den norske luftkvalitetsindeksen kan de aller fleste – også
                barn – være ute og aktive som normalt. Dette er de klart
                vanligste nivåene i norske byer gjennom året.
              </p>
              <p>
                Sjekk det beregnede varselet for{" "}
                <Link href="/byer">stedet ditt</Link> hvis du er usikker på
                dagens nivå.
              </p>

              <h2>Når bør du ta mer hensyn?</h2>
              <p>
                Ved nivået <strong>«høy»</strong> bør barn, eldre, gravide og
                personer med astma, KOLS eller hjerte-/karsykdom dempe
                langvarig og hard fysisk aktivitet utendørs. Det betyr ikke at
                man må holde seg inne – en rolig tur går som regel fint, helst
                unna de mest trafikkerte veiene.
              </p>
              <p>
                Ved <strong>«svært høy»</strong> bør følsomme grupper være mest
                mulig inne og unngå anstrengelse ute, og alle bør vurdere å
                begrense hard utendørs trening. Slike nivåer er sjeldne i Norge
                og varer som regel kort.
              </p>

              <h2>Praktiske råd ved høy luftforurensning</h2>
              <ul>
                <li>Velg ruter og områder unna sterkt trafikkerte veier.</li>
                <li>Legg hard trening innendørs, eller utsett den.</li>
                <li>
                  Har du astma eller annen lungesykdom: ha medisinene
                  tilgjengelig, og følg behandlingsplanen din.
                </li>
                <li>Begrens lufting mot trafikkert gate mens nivået er høyt.</li>
                <li>Følg med på varselet – nivået endrer seg gjennom døgnet.</li>
              </ul>

              <h2>Ubehag, risiko eller akutt?</h2>
              <p>
                Det er nyttig å skille mellom tre ting. <strong>Ubehag</strong> –
                som lett irritasjon i øyne eller hals på en dag med mye støv –
                er vanlig og går som regel over av seg selv.{" "}
                <strong>Risiko</strong> handler om gjentatt eksponering over
                tid, og er grunnen til at følsomme grupper anbefales å ta hensyn
                ved høye nivåer. <strong>Akutte plager</strong> – som tydelig
                pustebesvær eller brystsmerter – skal du ikke vente ut: gå inn,
                bruk eventuelle medisiner, og kontakt lege eller legevakt (116
                117). Ring 113 ved alvorlig pustebesvær.
              </p>
              <p>
                ByLuft gir generell informasjon, ikke medisinske råd. Gode
                helseråd finner du hos{" "}
                <a
                  href="https://www.helsenorge.no"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  Helsenorge
                </a>{" "}
                og{" "}
                <a
                  href="https://www.fhi.no"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  FHI
                </a>
                . Les også mer om{" "}
                <Link href="/helse">helse og luftkvalitet</Link>.
              </p>
            </Prose>

            <Faq items={faq} />
          </div>

          <aside className="space-y-6">
            <SourceBox sources={sources} title="Helsekilder" />
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
                  <Link href="/luftkvalitet" className="text-accent hover:text-accent-hover">
                    Luftkvalitet forklart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pollen-og-luftkvalitet"
                    className="text-accent hover:text-accent-hover"
                  >
                    Pollen og luftkvalitet
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
