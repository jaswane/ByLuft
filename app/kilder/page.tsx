import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kilder og data",
  description:
    "Kildene ByLuft.no bygger på: MET Norway (luftkvalitetsvarsel), Miljødirektoratet (målinger), FHI og Helsenorge. Slik bruker vi dataene, og hva som er begrensningene.",
  path: "/kilder",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Kilder", path: "/kilder" },
];

const sources = [
  {
    name: "MET Norway – Luftkvalitetsvarsel",
    href: "https://api.met.no/weatherapi/airqualityforecast/0.1/documentation",
    use: "Primærkilde for bysidene. Gir beregnet luftkvalitetsvarsel (AQI og komponenter som PM2.5, PM10, NO₂, O₃) for steder i Norge.",
  },
  {
    name: "Miljødirektoratet – Luftkvalitet i Norge",
    href: "https://luftkvalitet.miljodirektoratet.no",
    use: "Offisiell tjeneste for luftkvalitet i Norge, med faktiske målinger fra stasjoner. Vi lenker hit for offisielle oppslag og utdyping.",
  },
  {
    name: "Miljødirektoratet – måle-API",
    href: "https://api-luftmalinger.miljodirektoratet.no",
    use: "API for faktiske stasjonsmålinger. Referansekilde for videreutvikling; brukes ikke ved sidevisning i denne versjonen.",
  },
  {
    name: "Folkehelseinstituttet (FHI)",
    href: "https://www.fhi.no",
    use: "Kilde for helseeffekter av luftforurensning og luftkvalitetskriterier.",
  },
  {
    name: "Helsenorge",
    href: "https://www.helsenorge.no",
    use: "Kilde for helseråd til befolkningen.",
  },
];

export default function KilderPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Kilder og data"
        lead="ByLuft.no bygger på offentlige kilder. Her er hva vi bruker, og hvordan."
      />

      <Container className="py-10">
        <div className="max-w-3xl space-y-8">
          <ul className="space-y-4">
            {sources.map((s) => (
              <li
                key={s.href}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <h2 className="font-semibold">
                  <a
                    href={s.href}
                    className="text-accent hover:text-accent-hover"
                    rel="noopener nofollow"
                    target="_blank"
                  >
                    {s.name}
                  </a>
                </h2>
                <p className="mt-1 text-sm text-muted">{s.use}</p>
              </li>
            ))}
          </ul>

          <Prose>
            <h2>Slik bruker vi dataene</h2>
            <p>
              Det eneste vi henter automatisk, er det beregnede
              luftkvalitetsvarselet fra MET Norway som vises på bysidene. Vi henter
              dataene på serveren vår med en identifiserende User-Agent, i tråd med
              MET sine retningslinjer, og mellomlagrer svarene en periode slik at vi
              ikke belaster de offentlige tjenestene unødig.
            </p>
            <p>
              Fra Miljødirektoratet henter vi i denne versjonen ingen data – vi
              lenker til tjenesten deres for faktiske målinger og offisielle råd.
              Helseinnholdet på ByLuft.no er vår egen forklarende tekst, skrevet med
              FHI og Helsenorge som kilder. Det er generell informasjon, ikke
              medisinske råd.
            </p>

            <h2>Begrensninger</h2>
            <ul>
              <li>
                Varsel er beregninger for et område, ikke målinger på ditt eksakte
                sted. Luftkvalitet varierer lokalt.
              </li>
              <li>
                Når vi ikke får ferske data, viser vi det tydelig i stedet for å
                gjette. Vi hardkoder aldri «live»-tall.
              </li>
              <li>
                Vi bruker ikke kommersielle tredjepartskilder som primærkilde.
              </li>
            </ul>
            <p>
              Se også <Link href="/om">om ByLuft.no</Link> og{" "}
              <Link href="/luftkvalitet">guiden til luftkvalitet</Link>.
            </p>
          </Prose>
        </div>
      </Container>
    </>
  );
}
