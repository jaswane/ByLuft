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
  type FaqItem,
} from "@/lib/seo";
import type { SourceItem } from "@/components/SourceBox";

export const metadata: Metadata = pageMetadata({
  title: "Helse og luftkvalitet",
  description:
    "Hvordan påvirker luftforurensning helsa? Råd for sårbare grupper: barn, eldre, gravide og personer med astma, KOLS eller hjerte-/karsykdom.",
  path: "/helse",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Helse", path: "/helse" },
];

const groups = [
  {
    title: "Barn",
    text: "Barn puster raskere og er mer aktive ute enn voksne, og luftveiene er fortsatt under utvikling. Ved høye nivåer kan det være lurt å dempe hard lek ute og velge områder unna sterkt trafikkerte veier.",
  },
  {
    title: "Eldre",
    text: "Eldre har oftere underliggende hjerte- og luftveissykdom som kan forverres av luftforurensning. Ta det roligere ute på dager med høyt nivå.",
  },
  {
    title: "Gravide",
    text: "Gravide anbefales å begrense unødvendig eksponering for høy luftforurensning. Er du usikker, snakk med jordmor eller lege.",
  },
  {
    title: "Astma og KOLS",
    text: "Svevestøv, NO₂ og ozon kan utløse eller forverre symptomer. Ha eventuelle medisiner tilgjengelig, og vurder å legge trening innendørs når nivået er høyt.",
  },
  {
    title: "Hjerte- og karsykdom",
    text: "Luftforurensning, særlig fint svevestøv (PM2.5), er over tid knyttet til økt risiko for hjerte- og karsykdom. Personer med kjent sykdom bør være ekstra oppmerksomme ved høye nivåer.",
  },
];

const faq: FaqItem[] = [
  {
    question: "Hvem er mest følsomme for luftforurensning?",
    answer:
      "Barn, eldre, gravide og personer med astma, KOLS eller hjerte-/karsykdom er mer følsomme enn befolkningen ellers. Disse gruppene bør ta mer hensyn ved høye nivåer.",
  },
  {
    question: "Hva bør jeg gjøre når luftkvaliteten er dårlig?",
    answer:
      "Begrens langvarig, hard fysisk aktivitet utendørs, hold deg unna de mest trafikkerte veiene, og vurder å legge trening innendørs. Følsomme grupper bør ta ekstra hensyn og ha nødvendige medisiner tilgjengelig.",
  },
  {
    question: "Hjelper det å lufte boligen?",
    answer:
      "På dager med høy forurensning kan det være lurt å begrense lufting mot sterkt trafikkerte gater, og heller lufte når og der nivåene er lavere. Generelle råd finner du hos Helsenorge og Miljødirektoratet.",
  },
];

const healthSources: SourceItem[] = [
  {
    label: "Folkehelseinstituttet (FHI)",
    href: "https://www.fhi.no",
    note: "Helseeffekter og luftkvalitetskriterier.",
  },
  {
    label: "Helsenorge",
    href: "https://www.helsenorge.no",
    note: "Helseråd til befolkningen.",
  },
  {
    label: "Miljødirektoratet – Luftkvalitet i Norge",
    href: "https://luftkvalitet.miljodirektoratet.no",
    note: "Offisielle råd ved luftforurensning.",
  },
];

export default function HelsePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />

      <PageHeader
        crumbs={crumbs}
        title="Helse og luftkvalitet"
        lead="Luftforurensning påvirker ikke alle likt. Her er en oversikt over hvem som er mest følsomme, og hva du kan gjøre når lufta er dårlig."
      />

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <div className="rounded-xl border border-accent/30 bg-accent-soft/50 p-5 text-sm">
              <p className="font-semibold text-foreground">
                ByLuft.no gir ikke medisinske råd.
              </p>
              <p className="mt-1 text-muted">
                Informasjonen her er generell. Har du helseplager eller er i tvil,
                kontakt lege. Ved akutt pustebesvær, ring 113.
              </p>
            </div>

            <Prose>
              <h2>Hvordan påvirker luftforurensning helsa?</h2>
              <p>
                Luftforurensning kan irritere luftveiene, forverre astma og andre
                kroniske sykdommer, og over tid er særlig fint svevestøv (PM2.5)
                knyttet til hjerte- og karsykdom. Hvor mye det påvirker deg
                avhenger av nivået, hvor lenge du er eksponert, og din egen helse.
              </p>
            </Prose>

            <section aria-labelledby="grupper">
              <h2 id="grupper" className="text-2xl font-bold tracking-tight">
                Sårbare grupper
              </h2>
              <ul className="mt-5 space-y-3">
                {groups.map((g) => (
                  <li
                    key={g.title}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <h3 className="font-semibold">{g.title}</h3>
                    <p className="mt-1 text-sm text-muted">{g.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            <Prose>
              <h2>Praktiske tiltak ved dårlig luft</h2>
              <ul>
                <li>Begrens langvarig, hard fysisk aktivitet utendørs.</li>
                <li>Hold deg unna de mest trafikkerte veiene, særlig i rushtiden.</li>
                <li>Vurder å legge trening innendørs.</li>
                <li>
                  Følsomme grupper bør ha nødvendige medisiner tilgjengelig og
                  følge lokale råd.
                </li>
              </ul>
              <p>
                Vil du sjekke nivået der du bor?{" "}
                <Link href="/byer">Finn byen din</Link> og se dagens varsel. Se
                også den praktiske guiden{" "}
                <Link href="/kan-jeg-ga-ut">
                  kan jeg gå ut når luftkvaliteten er dårlig?
                </Link>
              </p>
              <p>
                Har du astma eller allergi, kan det være nyttig å vite hvordan{" "}
                <Link href="/pollen-og-luftkvalitet">
                  pollen og luftkvalitet
                </Link>{" "}
                henger sammen – det er to forskjellige ting som begge kan påvirke
                luftveiene.
              </p>
            </Prose>

            <Faq items={faq} />
          </div>

          <aside className="space-y-6">
            <SourceBox sources={healthSources} title="Helsekilder" />

            <section
              aria-labelledby="uv-tips"
              className="rounded-xl border border-border bg-surface p-5 text-sm"
            >
              <h2 id="uv-tips" className="font-semibold">
                Relatert: sol og UV
              </h2>
              <p className="mt-2 text-muted">
                Når lufta er god, men sola er sterk, kan UV-indeksen fortsatt
                være viktig – særlig for barn og andre med sart hud. ByLuft
                handler om luftkvalitet; for sol og UV, sjekk UV-indeksen der du
                er på{" "}
                <a
                  href="https://uvindex.no"
                  rel="noopener"
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  UVindex.no
                </a>
                .
              </p>
            </section>
          </aside>
        </div>
      </Container>
    </>
  );
}
