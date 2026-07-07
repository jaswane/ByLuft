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
    "Personvernerklæring for ByLuft.no. Vi krever ingen innlogging og selger ikke data. Vi bruker Google Analytics til anonym trafikkstatistikk.",
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
            <li>Vi ber deg ikke om personopplysninger som navn eller e-post.</li>
            <li>
              Vi bruker Google Analytics til anonym, statistisk trafikkmåling –
              for å se hvor mange som bruker siden og hvilke sider som er
              populære.
            </li>
            <li>Vi selger ikke data, og vi bruker ikke annonsenettverk.</li>
            <li>Bysøket kjører i nettleseren din og sender ikke søket ditt til oss.</li>
          </ul>

          <h2>Data vi henter</h2>
          <p>
            For å vise luftkvalitet henter nettstedet data fra offentlige API-er,
            blant annet MET Norway. Denne hentingen skjer på serveren vår, ikke i
            nettleseren din, og innebærer ikke at det sendes personopplysninger om
            deg til disse tjenestene.
          </p>

          <h2>«Min lokasjon»</h2>
          <p>
            Hvis du selv trykker på «Min lokasjon», spør nettleseren om lov til å
            dele posisjonen din. Sier du ja, brukes koordinatene til ett oppslag:
            å hente et beregnet luftkvalitetsvarsel for området ditt fra MET.
            Koordinatene rundes av før oppslaget, lagres ikke, kobles ikke til
            deg, og deles ikke videre. Sier du nei, fungerer resten av siden som
            normalt.
          </p>

          <h2>Trafikkmåling med Google Analytics</h2>
          <p>
            For å forstå hvordan siden brukes, og for å gjøre den bedre, bruker
            ByLuft.no Google Analytics (GA4). Verktøyet samler inn statistiske,
            aggregerte opplysninger om besøket – for eksempel hvilke sider som
            åpnes, omtrentlig geografisk område, nettlesertype og hvor besøket
            kommer fra. Vi bruker ikke dette til å identifisere deg som person,
            og vi kobler det ikke til navn eller kontaktinfo.
          </p>
          <p>
            Google Analytics settes opp av Google LLC, som behandler dataene på
            våre vegne. Du kan lese mer om hvordan Google behandler data i{" "}
            <a
              href="https://policies.google.com/privacy"
              rel="noopener nofollow"
              target="_blank"
            >
              Googles personvernerklæring
            </a>
            . Ønsker du å reservere deg, kan du bruke{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              rel="noopener nofollow"
              target="_blank"
            >
              Googles avmeldingstillegg
            </a>{" "}
            eller blokkere sporing i nettleseren din.
          </p>

          <h2>Informasjonskapsler (cookies)</h2>
          <p>
            Google Analytics setter informasjonskapsler i nettleseren din for å
            skille besøk fra hverandre og telle dem statistisk. Utover dette
            setter ByLuft.no ikke informasjonskapsler for markedsføring, og vi
            deler ikke data med annonsenettverk.
          </p>

          <h2>Dine rettigheter</h2>
          <p>
            Vi ber deg ikke om personopplysninger, og den statistiske
            trafikkmålingen er ikke knyttet til deg som person. Har du spørsmål
            om personvern, kan du kontakte oss på{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
