import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Personvern",
  description:
    "Personvernerklæring for ByLuft.no. Vi krever ingen innlogging, samler ikke inn personopplysninger og bruker ikke sporing på tvers av nettsteder.",
  path: "/personvern",
});

const crumbs = [
  { name: "Hjem", path: "/" },
  { name: "Personvern", path: "/personvern" },
];

export default function PersonvernPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Personvern"
        lead="Kort og enkelt: ByLuft.no er laget for å være lett å bruke uten at du gir fra deg personopplysninger."
      />

      <Container className="py-10">
        <Prose>
          <h2>Kort oppsummert</h2>
          <ul>
            <li>Du trenger ikke å logge inn eller registrere deg.</li>
            <li>Vi ber ikke om, og lagrer ikke, personopplysninger om deg.</li>
            <li>Vi bruker ikke sporing på tvers av nettsteder eller annonsenettverk.</li>
            <li>Bysøket kjører i nettleseren din og sender ikke søket ditt til oss.</li>
          </ul>

          <h2>Data vi henter</h2>
          <p>
            For å vise luftkvalitet henter nettstedet data fra offentlige API-er,
            blant annet MET Norway. Denne henten skjer på serveren vår, ikke i
            nettleseren din, og innebærer ikke at det sendes personopplysninger om
            deg til disse tjenestene.
          </p>

          <h2>Informasjonskapsler (cookies)</h2>
          <p>
            ByLuft.no setter ikke informasjonskapsler for markedsføring eller
            sporing. Skulle vi senere ta i bruk anonym, personvernvennlig
            besøksstatistikk, vil vi oppdatere denne siden og beskrive det tydelig.
          </p>

          <h2>Dine rettigheter</h2>
          <p>
            Siden vi ikke samler inn personopplysninger, har vi heller ingen
            opplysninger om deg å utlevere eller slette. Har du spørsmål om
            personvern, kan du kontakte oss på{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
