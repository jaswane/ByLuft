import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Om ByLuft.no",
  description:
    "Hva ByLuft.no er og ikke er. Vi samler og forklarer offentlige luftkvalitetsdata for norske byer i et enklere språk. Ingen medisinske råd.",
  path: "/om",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Om", path: "/om" },
];

export default function OmPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Om ByLuft.no"
        lead="ByLuft.no gjør luftkvalitet i norske byer enklere å forstå, basert på offentlige kilder."
      />

      <Container className="py-10">
        <Prose>
          <h2>Hva ByLuft.no er</h2>
          <p>
            ByLuft.no er et uavhengig nettsted som samler og forklarer offentlig
            tilgjengelige luftkvalitetsdata for norske byer. Målet er å svare
            raskt på det folk lurer på: Hvordan er lufta i byen min i dag, hva
            betyr tallene, og hva bør jeg gjøre?
          </p>
          <p>
            Vi henter beregnet luftkvalitetsvarsel fra MET Norway og forklarer
            komponenter som svevestøv, NO₂ og ozon i et enklere språk enn de
            offisielle sidene.
          </p>

          <h2>Hva ByLuft.no ikke er</h2>
          <ul>
            <li>
              <strong>Ikke en offentlig tjeneste.</strong> Vi er et uavhengig
              prosjekt som bygger på offentlige kilder.
            </li>
            <li>
              <strong>Ikke en medisinsk tjeneste.</strong> Innholdet er generell
              informasjon og erstatter ikke råd fra helsepersonell.
            </li>
            <li>
              <strong>Ikke en erstatning for lokale målinger.</strong> Varsel er
              beregninger for et område og fanger ikke opp alle lokale forskjeller.
            </li>
          </ul>

          <h2>Begrensninger</h2>
          <p>
            Dataene vi viser er beregnede varsler, ikke målinger på ditt eksakte
            sted. Luftkvalitet varierer lokalt – rett ved en trafikkert vei kan
            lufta være dårligere enn varselet tilsier. Når vi ikke får ferske
            data, sier vi tydelig fra i stedet for å vise gjettede tall. Se{" "}
            <Link href="/kilder">kilder og data</Link> for detaljer.
          </p>

          <h2>Hvem står bak?</h2>
          <p>
            ByLuft.no er et prosjekt fra{" "}
            <a href={site.publisherUrl} rel="noopener" target="_blank">
              Swane Creative
            </a>
            . Har du innspill eller ser noe som er feil, hører vi gjerne fra deg på{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
